import { ImageResponse } from "next/og";

export const alt = "sheffield.rocks — Coming this spring.";
export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          color: "#eef2ff",
          backgroundColor: "#0a1024",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(66, 95, 255, 0.35), transparent 55%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.18), transparent 55%), radial-gradient(circle at 40% 80%, rgba(29, 45, 120, 0.7), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
            }}
          >
            sheffield.rocks
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 300,
              color: "rgba(238, 242, 255, 0.85)",
            }}
          >
            Coming this spring
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
