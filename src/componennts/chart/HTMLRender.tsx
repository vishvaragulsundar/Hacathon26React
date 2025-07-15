import React, { useEffect, useRef, useState } from "react";

interface HtmlRendererProps {
  htmlContent: string;
}

export default function HtmlRenderer({ htmlContent }: HtmlRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const completeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Chart</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              background: white;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            canvas {
              width: 800px !important;
              height: 400px !important;
              max-width: 800px;
              max-height: 400px;
              border: 1px solid #ccc;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    const blob = new Blob([completeHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [htmlContent]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title="Chart Preview"
        style={{
          width: "850px", // fixed width
          height: "450px", // fixed height
          border: "none",
          borderRadius: "6px",
        }}
        sandbox="allow-scripts"
      />
    </div>
  );
}
