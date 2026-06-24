import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px 96px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-left accent blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "88px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}
        >
          Ayan Pathak
          <span style={{ color: "#3b82f6" }}>.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#3b82f6",
            letterSpacing: "0.02em",
            marginBottom: "24px",
          }}
        >
          AI / ML Engineer
        </div>

        {/* Divider */}
        <div
          style={{
            width: "64px",
            height: "3px",
            backgroundColor: "#3b82f6",
            borderRadius: "9999px",
            marginBottom: "28px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "20px",
            color: "#a3a3a3",
            fontWeight: 400,
            letterSpacing: "0.05em",
          }}
        >
          Deep Learning · NLP · Full-Stack
        </div>

        {/* Bottom-right URL watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "96px",
            fontSize: "15px",
            color: "#404040",
            fontWeight: 500,
          }}
        >
          {(process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}