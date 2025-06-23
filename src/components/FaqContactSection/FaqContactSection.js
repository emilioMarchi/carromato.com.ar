import { useState } from "react";
import Link from "next/link";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div data-aos="fade-left" data-aos-delay="400" className="h-[450px] relative bg-gray-900 rounded-lg p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-800 to-transparent opacity-70 animate-gradient" />
      <form onSubmit={handleSubmit} className="relative space-y-6 text-white z-10">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@correo.com"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
          <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
            placeholder="¿En qué podemos ayudarte?"
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <button type="submit"
          className="inline-block text-white font-bold uppercase underline underline-offset-4 decoration-2 decoration-white transition-transform duration-300 hover:scale-105 hover:text-yellow-500 hover:decoration-yellow-500">
          Enviar Consulta
        </button>
      </form>
    </div>
  );
}

export function FAQContactSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "¿Cuánto tarda un proyecto audiovisual?", answer: "El tiempo varía según la complejidad, pero generalmente entregamos en 2 a 4 semanas." },
    { question: "¿Ofrecen servicios para redes sociales?", answer: "Sí, creamos contenido específico para diferentes plataformas como Instagram, TikTok y YouTube." },
    { question: "¿Cómo es el proceso de contratación?", answer: "Nos contactás, definimos objetivos, hacemos un presupuesto y comenzamos la producción una vez aprobado." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* FAQs */}
        <div className="space-y-4 max-w-xl w-full mx-auto md:mx-0">
          <h2 className="text-4xl font-extrabold uppercase text-center md:text-left mb-8">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden w-full">
                <button onClick={() => toggleFAQ(index)}
                  className="relative flex justify-between items-center px-6 py-4 w-full bg-gray-900 rounded-lg focus:outline-none transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}>
                  <span className="flex items-center text-lg font-semibold">{faq.question}</span>
                  <svg className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? "rotate-90" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-800 to-transparent opacity-60 animate-gradient rounded-lg pointer-events-none" />
                </button>
                <div id={`faq-content-${index}`} role="region" aria-labelledby={`faq-header-${index}`}
                  className={`px-6 pb-4 text-gray-300 transition-all duration-300 overflow-hidden ${
                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`} style={{ transitionProperty: "max-height, opacity" }}>
                  <p className="pt-2">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Animación de fondo gradient */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
