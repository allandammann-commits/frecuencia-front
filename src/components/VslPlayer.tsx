import { useEffect, useRef } from "react";

const PLAYER_ID = "vid-6a89d02b3cd5e20f22c6cfd4";
const PLAYER_SCRIPT =
  "https://scripts.converteai.net/daf43a38-02c8-4b59-9a05-e60fab1e2ab9/players/6a89d02b3cd5e20f22c6cfd4/v4/player.js";

const loadVturbScript = () => {
  document.querySelectorAll(`script[src="${PLAYER_SCRIPT}"]`).forEach((node) => node.remove());

  const script = document.createElement("script");
  script.src = PLAYER_SCRIPT;
  script.async = true;
  document.head.appendChild(script);
};

type VslPlayerProps = {
  className?: string;
  maxWidth?: number;
};

export const VslPlayer = ({ className, maxWidth = 400 }: VslPlayerProps) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = `
      <vturb-smartplayer
        id="${PLAYER_ID}"
        style="display: block; margin: 0 auto; width: 100%; max-width: ${maxWidth}px;"
      >
        <div
          class="vturb-player-placeholder"
          style="position: relative; width: 100%; padding: 177.77777777777777% 0 0; z-index: 0; background-color: black;"
        ></div>
      </vturb-smartplayer>
    `;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (document.getElementById(PLAYER_ID)) {
          loadVturbScript();
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      host.innerHTML = "";
    };
  }, [maxWidth]);

  return <div ref={hostRef} className={className} />;
};

export default VslPlayer;
