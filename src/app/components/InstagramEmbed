"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

export function InstagramEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load script once
    const existing = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    ) as HTMLScriptElement | null;

    const process = () => {
      // Ask Instagram to process new embeds
      window.instgrm?.Embeds?.process?.();
    };

    if (existing) {
      process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => process();
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // Re-process whenever url changes (e.g. newly submitted projects)
    window.instgrm?.Embeds?.process?.();
  }, [url]);

  return (
    <div ref={containerRef} className="w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%" }}
      />
    </div>
  );
}
