import { ImageResponse } from "next/og";

export const alt = "Paw N Scoop: Cleaner Yards. Happier Homes. Outdoor cleaning and yard care in El Paso, TX.";
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
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4, color: "#111" }}>
          <span>Cleaner Yards.</span>
          <span>Happier Homes.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#111" }}>Complete Outdoor Cleaning &amp; Yard Care in El Paso, TX</div>
          <div style={{ fontSize: 26, color: "#111" }}>Poop Scooping · Artificial Turf Cleaning · Lawn Care · Yard Cleanups · Deodorizing</div>
        </div>
      </div>
    ),
    size,
  );
}
