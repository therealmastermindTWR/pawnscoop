import { ImageResponse } from "next/og";

export const alt = "Paw N Scoop: pet waste removal. Less poop, more play.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFCC24", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 900, color: "#111" }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFCC24", fontSize: 36, fontWeight: 900 }}>P</div>
          PAW N SCOOP
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 900, lineHeight: 0.9, letterSpacing: -5, color: "#111" }}>
          <span>Less poop.</span>
          <span>More play.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ background: "#FF9900", border: "5px solid #111", borderRadius: 999, padding: "14px 32px", fontSize: 34, fontWeight: 800, color: "#111" }}>Get your FREE first cleanup</div>
          <div style={{ fontSize: 30, color: "#111" }}>Pet waste removal · Turf cleaning · El Paso, TX</div>
        </div>
      </div>
    ),
    size,
  );
}
