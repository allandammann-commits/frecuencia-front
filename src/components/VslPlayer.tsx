import { useEffect, useRef } from "react";

const PLAYER_ID = "vid-69cdcab8c9ac45984af704ad";
const PLAYER_SCRIPT =
  "https://scripts.converteai.net/eace989b-db46-41fb-9133-2b70e27ad3d6/players/69cdcab8c9ac45984af704ad/v4/player.js";

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
