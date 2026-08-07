"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6f0",
          color: "#2c2420",
          fontFamily: "system-ui, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#a0522d",
            }}
          >
            Kernels &amp; Bloom
          </p>
          <h1 style={{ marginTop: "16px", fontSize: "2rem", color: "#6b3a2a" }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: "12px", lineHeight: 1.6, opacity: 0.75 }}>
            The site hit an unexpected error. Refresh to try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "24px",
              border: "none",
              borderRadius: "2px",
              background: "#6b3a2a",
              color: "#faf6f0",
              padding: "12px 24px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
