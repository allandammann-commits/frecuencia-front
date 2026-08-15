type DoctorSocialProofProps = {
  className?: string;
};

export const DoctorSocialProof = ({ className = "" }: DoctorSocialProofProps) => {
  return (
    <figure className={["-mx-4 sm:mx-0", className].join(" ")}>
      <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-yellow-300 via-pink-400 to-violet-400 shadow-[0_14px_40px_-24px_rgba(45,27,78,0.45)]">
        <div className="rounded-[calc(1rem-1px)] bg-white overflow-hidden">
          <img
            src="/perfil-dra-paola.jpg"
            alt="Perfil verificado de la Dra. Paola en Instagram: 25,6 mil seguidores"
            className="block w-full h-auto"
            width={1024}
            height={371}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </figure>
  );
};

export default DoctorSocialProof;
