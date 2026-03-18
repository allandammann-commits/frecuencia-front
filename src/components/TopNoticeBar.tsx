import { useEffect, useState } from "react";

export const TopNoticeBar = () => {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const tryFetchCity = async () => {
      const sources = [
        async () => {
          const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
          if (!res.ok) return null;
          const data = await res.json();
          return (data && data.city) ? (data.city as string) : null;
        },
        async () => {
          const res = await fetch("https://ipwho.is/", { signal: controller.signal });
          if (!res.ok) return null;
          const data = await res.json();
          return (data && data.city) ? (data.city as string) : null;
        },
      ];

      for (const getCity of sources) {
        try {
          const found = await getCity();
          if (active && found) {
            setCity(found);
            break;
          }
        } catch {
          // Ignora e tenta próxima fonte
        }
      }
    };

    tryFetchCity();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const text = `Ya ayudamos a mujeres de ${city ?? "tu ciudad"}`;

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-[#ff2d9b] text-white shadow-[0_4px_15px_rgba(255,45,155,0.3)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs sm:text-sm font-black uppercase tracking-widest">
        {text}
      </div>
    </div>
  );
};

export default TopNoticeBar;