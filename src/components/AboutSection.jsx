import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { MdStorefront, MdInfoOutline } from "react-icons/md";

const WS_URL = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? "525500000000"}`;
const MESSENGER_URL = `https://m.me/${import.meta.env.VITE_MESSENGER_PAGE ?? "elbaulviejo"}`;

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #F5F1E8 0%, #EDE7D9 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(194,161,90,0.15)", color: "#8C6A3B" }}
          >
            <MdInfoOutline size={14} />
            Sobre nosotros
          </span>
          <h2
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#3E2F23" }}
          >
            ¿Cómo funciona El Baúl Viejo?
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#7A6A5A" }}
          >
            Somos un catálogo en línea de antigüedades y piezas de colección únicas.
            Aquí puedes explorar y descubrir piezas con historia.
          </p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Card 1 */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-3 shadow-sm"
            style={{ background: "#FDFAF4", border: "1px solid #DDD0BB" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "rgba(194,161,90,0.15)", color: "#C2A15A" }}
            >
              <MdStorefront />
            </div>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "#3E2F23" }}
            >
              Solo catálogo
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#7A6A5A" }}>
              Este sitio es únicamente un catálogo visual. No realizamos ventas
              directas desde aquí; funciona como escaparate de las piezas disponibles.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-3 shadow-sm"
            style={{ background: "#FDFAF4", border: "1px solid #DDD0BB" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "rgba(37,211,102,0.12)", color: "#25D366" }}
            >
              <FaWhatsapp />
            </div>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "#3E2F23" }}
            >
              Contacta por WhatsApp
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#7A6A5A" }}>
              ¿Te interesa una pieza? Escríbenos directo por WhatsApp. Es la forma
              más rápida de consultar disponibilidad, precio y coordinar la compra.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-3 shadow-sm"
            style={{ background: "#FDFAF4", border: "1px solid #DDD0BB" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: "rgba(0,132,255,0.12)", color: "#0084FF" }}
            >
              <FaFacebookMessenger />
            </div>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "#3E2F23" }}
            >
              Contacta por Messenger
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#7A6A5A" }}>
              También puedes escribirnos por Facebook Messenger para hacer
              consultas, negociar y coordinar el envío o entrega de tu pieza.
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="about-whatsapp-cta"
            href={WS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg,#25D366,#1ebe5d)",
              boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaWhatsapp size={18} />
            Contactar por WhatsApp
          </a>

          <a
            id="about-messenger-cta"
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg,#0084FF,#0066cc)",
              boxShadow: "0 4px 16px rgba(0,132,255,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <FaFacebookMessenger size={18} />
            Contactar por Messenger
          </a>
        </div>
      </div>
    </section>
  );
}
