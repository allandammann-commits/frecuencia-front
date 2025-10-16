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
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8 px-2 animate-fade-in">
          ELLAS RECONQUISTARON A SU EX EN MENOS DE 7 DÍAS
        </h2>
        
        
        
        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          {testimonialImages.map((image, index) => (
            <div 
              key={index} 
              className="w-full max-w-4xl animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img 
                src={image} 
                alt={`Testimonio ${index + 1}`}
                className="w-full h-auto rounded-lg border-4 border-pink-500 shadow-card hover-lift"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};