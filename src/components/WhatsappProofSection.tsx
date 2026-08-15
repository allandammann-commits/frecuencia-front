type Proof = { src: string; alt: string };

const PROOFS: Proof[] = [
  { src: "/dep1.jpg", alt: "Captura de WhatsApp: alumna cuenta que su ex la había bloqueado y volvió a escribirle" },
  { src: "/dep2.jpg", alt: "Captura de WhatsApp: alumna cuenta que su ex le dijo que quiere volver" },
  { src: "/dep3.jpg", alt: "Captura de WhatsApp: alumna cuenta que volvió con su ex" },
];

export const WhatsappProofSection = () => {
  return (
    <section id="pruebas" className="w-full px-4 pt-2 pb-8 sm:pt-4 sm:pb-10 bg-gradient-to-b from-[#F3EEFF] to-[#FDF2F4] animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D1B4E] leading-tight">
            Mira la historia de las mujeres que ya activaron la frecuencia
          </h2>
          <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-pink-400 to-violet-400" />
        </div>

        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {PROOFS.map((proof, index) => (
            <div
              key={proof.src}
              className="p-[1.5px] rounded-2xl bg-gradient-to-r from-pink-300 via-fuchsia-300 to-violet-300 shadow-[0_16px_45px_-24px_rgba(45,27,78,0.5)] animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <img
                src={proof.src}
                alt={proof.alt}
                className="block w-full h-auto rounded-[calc(1rem-1px)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] sm:text-xs italic text-gray-500">
          Capturas reales compartidas con autorización. Nombres y rostros protegidos por privacidad.
        </p>
      </div>
    </section>
  );
};

export default WhatsappProofSection;
