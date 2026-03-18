import testimonial1 from "@/assets/testimonial-1-new.png";
import testimonial2 from "@/assets/testimonial-2-new.png";
import testimonial3 from "@/assets/testimonial-3-new.png";
import testimonial4 from "@/assets/testimonial-4-new.png";
import testimonial5 from "@/assets/testimonial-5-new.png";

export const TestimonialsSection = () => {
  const testimonialImages = [
    testimonial1,
    testimonial2,
    testimonial3,
    testimonial4,
    testimonial5
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white mb-12 sm:mb-16 px-2 animate-fade-in uppercase tracking-tighter italic">
          ELLAS RECONQUISTARON A SU EX EN MENOS DE 7 DÍAS
        </h2>
        
        <div className="flex flex-col gap-10 sm:gap-12 items-center">
          {testimonialImages.map((image, index) => (
            <div 
              key={index} 
              className="w-full max-w-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative p-1 bg-gradient-to-br from-primary to-accent rounded-3xl shadow-card hover-lift transition-all">
                <img 
                  src={image} 
                  alt={`Testimonio ${index + 1}`}
                  className="w-full h-auto rounded-[1.4rem] border-2 border-white/10"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};