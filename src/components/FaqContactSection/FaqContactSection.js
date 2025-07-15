import { useState } from "react";
import Link from "next/link";




export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false); // 👈 nuevo estado loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👉 empieza loading

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setNotification({ show: true, message: "Consulta enviada correctamente ✅", type: "success" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setNotification({ show: true, message: "Error al enviar la consulta ⚠️", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setNotification({ show: true, message: "Hubo un error al enviar ⚠️", type: "error" });
    }

    setLoading(false); // 👉 termina loading
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  return (
    <div
      data-aos="fade-left"
      data-aos-delay="400"
      className="h-auto relative bg-black rounded-lg p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black to-transparent opacity-70 animate-gradient" />

      <form onSubmit={handleSubmit} className="relative space-y-6 text-white z-10 flex flex-col">
        {/* Notificación */}
        {notification.show && (
          <div
            className={`mb-4 px-4 py-2 rounded-md border text-sm font-medium backdrop-blur-sm
              ${notification.type === "success" ? "border-green-400 text-green-400" : "border-red-400 text-red-400"}`}
          >
            {notification.message}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full px-4 py-2 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            className="w-full px-4 py-2 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="¿En qué podemos ayudarte?"
            className="w-full px-4 py-2 bg-black bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-auto inline-flex items-center justify-center gap-2 text-white font-bold uppercase underline underline-offset-4 decoration-2 decoration-white transition-transform duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:text-yellow-500 hover:decoration-yellow-500"
          }`}
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Enviar Consulta"
          )}
        </button>
      </form>
    </div>
  );
}


export function FAQContactSection({ faqs = [{ question: "¿Cuánto tarda un proyecto audiovisual?", answer: "El tiempo varía según la complejidad, pero generalmente entregamos en 2 a 4 semanas." },
  { question: "¿Ofrecen servicios para redes sociales?", answer: "Sí, creamos contenido específico para diferentes plataformas como Instagram, TikTok y YouTube." },
  { question: "¿Cómo es el proceso de contratación?", answer: "Nos contactás, definimos objetivos, hacemos un presupuesto y comenzamos la producción una vez aprobado." },
] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 text-white">
      <div className="mx-auto grid md:grid-cols-2 gap-5 px-2 md:px-5">
        {/* FAQs */}
        <div className="w-full mx-auto md:mx-0 text-center">
          <h2 className="text-4xl font-extrabold uppercase text-center md:text-left leading-[0.9] mb-4">Preguntas Frecuentes</h2>
          <div className="">
            {faqs.map((faq, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden w-full">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative flex justify-between items-center px-6 py-6 w-full bg-black rounded-lg focus:outline-none transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                >
                  <span className="flex items-center text-lg font-semibold leading-[1]">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black bg-black bg-opacity-50 to-transparent opacity-60 animate-gradient rounded-lg pointer-events-none" />
                </button>
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  className={`px-6 pb-4 text-gray-300 transition-all duration-300 overflow-hidden leading-[1] ${
                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
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
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
