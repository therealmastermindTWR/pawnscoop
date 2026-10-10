"use client";

import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { submitForm } from "@/lib/quote";
import { cn } from "@/lib/utils";

export type FormField = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea"; required?: boolean; autoComplete?: string; half?: boolean };

/** Lightweight validated form. Submission is stubbed in lib/quote.ts (TODO: backend). */
export function SimpleForm({ kind, fields, submitLabel, success }: { kind: "contact" | "referral"; fields: FormField[]; submitLabel: string; success: string }) {
  const toast = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) e[f.name] = `${f.label} is required.`;
      else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = "Please enter a valid email.";
      else if (v && f.type === "tel" && v.replace(/\D/g, "").length < 10) e[f.name] = "Please enter a valid phone number.";
    }
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setSending(true);
    const res = await submitForm(kind, values);
    setSending(false);
    if (res.ok) {
      toast(success);
      setValues({});
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="border-hard grid gap-5 rounded-[2rem] bg-white p-6 text-ink shadow-hard-lg sm:grid-cols-2 sm:p-10">
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const err = errors[f.name];
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          autoComplete: f.autoComplete,
          "aria-invalid": !!err,
          "aria-describedby": err ? `${id}-err` : undefined,
          onChange: (e: { target: { value: string } }) => {
            setValues((v) => ({ ...v, [f.name]: e.target.value }));
            setErrors((x) => ({ ...x, [f.name]: "" }));
          },
          className: cn(
            "w-full rounded-2xl border-[2.5px] bg-white px-4 text-lg outline-none transition-shadow focus:shadow-hard-sm focus-visible:outline-none",
            err ? "border-tangerine-600 bg-tangerine-100" : "border-ink",
          ),
        };
        return (
          <div key={f.name} className={cn("flex flex-col gap-2", !f.half && "sm:col-span-2")}>
            <label htmlFor={id} className="font-semibold">
              {f.label} {f.required && <span aria-hidden>*</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea rows={5} {...common} className={cn(common.className, "py-3")} />
            ) : (
              <input type={f.type ?? "text"} {...common} className={cn(common.className, "h-14")} />
            )}
            {err && (
              <p id={`${id}-err`} role="alert" className="text-sm font-semibold">
                <span className="mr-1 inline-block rounded bg-tangerine px-1.5 text-xs">!</span>
                {err}
              </p>
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="border-hard flex h-14 items-center gap-2 rounded-full bg-tangerine px-7 font-display text-lg font-bold shadow-hard-sm transition-transform hover:-translate-y-0.5 disabled:opacity-70"
        >
          {sending ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-5" aria-hidden />}
          {sending ? "Sending…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
