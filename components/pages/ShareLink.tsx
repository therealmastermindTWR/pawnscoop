"use client";

import { Link2 } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { site } from "@/lib/content";

/** Copies the website link so customers can share it with friends. */
export function ShareLink() {
  const toast = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.url);
      toast("Link copied! Send it to a friend.");
    } catch {
      toast(`Share this link: ${site.url}`);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="border-hard inline-flex h-14 items-center gap-2 rounded-full bg-white px-6 font-display text-lg font-bold text-ink transition-transform hover:-translate-y-0.5"
    >
      <Link2 className="size-5" aria-hidden /> Copy our website link
    </button>
  );
}
