import { useEffect, useRef } from 'react';

const AWAY_MESSAGES = [
  "👋 Come back! — Harish.dev",
  "🚀 Still here! — Harish.dev",
  "💡 Miss me? — Harish.dev",
  "⚡ Don't forget me! — Harish.dev",
];

const ORIGINAL_TITLE = "Harish M | Software Developer";
const ORIGINAL_FAVICON = "/favicon.svg";

// Generates a pulsing favicon by drawing on a canvas
function buildPulsingFavicon(color = "#6C63FF") {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  // Outer glow ring
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = color + "33"; // 20% opacity
  ctx.fill();

  // Inner filled circle
  ctx.beginPath();
  ctx.arc(16, 16, 9, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // "H" letter
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("H", 16, 17);

  return canvas.toDataURL("image/png");
}

export default function useTabTitle() {
  const awayIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const faviconRef = useRef(null);

  const getFaviconEl = () => {
    let el = document.querySelector("link[rel~='icon']");
    if (!el) {
      el = document.createElement("link");
      el.rel = "icon";
      document.head.appendChild(el);
    }
    return el;
  };

  useEffect(() => {
    const favicon = getFaviconEl();
    faviconRef.current = favicon;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden — start cycling away messages
        awayIndexRef.current = 0;
        document.title = AWAY_MESSAGES[0];

        // Swap to pulsing favicon
        favicon.href = buildPulsingFavicon("#FF6B9D");

        // Cycle through messages every 3s
        intervalRef.current = setInterval(() => {
          awayIndexRef.current =
            (awayIndexRef.current + 1) % AWAY_MESSAGES.length;
          document.title = AWAY_MESSAGES[awayIndexRef.current];
        }, 3000);
      } else {
        // Tab is visible again — restore everything
        clearInterval(intervalRef.current);
        document.title = ORIGINAL_TITLE;
        favicon.href = ORIGINAL_FAVICON;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalRef.current);
      document.title = ORIGINAL_TITLE;
      if (faviconRef.current) faviconRef.current.href = ORIGINAL_FAVICON;
    };
  }, []);
}
