import { useState } from "react";
import { FaFacebook, FaInstagram, FaPaperPlane } from "react-icons/fa";
import { sendEmail } from "../connection/email.js";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100044156269092";
const INSTAGRAM_URL = "https://www.instagram.com/elbaulviejo";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(form);
      const res = await sendEmail(form);
      if(res.status === 200) {
        console.log(res.data.message)
      }
      setSent(true);
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main className="flex-1 bg-ivory">
      {/* Hero banner */}
      <section
        className="relative py-20 px-6 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3E2F23 0%, #5C4535 50%, #3E2F23 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #C2A15A 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C2A15A 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Estamos aquí para ti
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ivory font-bold leading-tight mb-4">
            Contáctanos
          </h1>
          <p className="text-ivory/70 text-base md:text-lg leading-relaxed">
            ¿Tienes alguna pregunta o interés en alguna pieza? Escríbenos y
            con gusto te atendemos.
          </p>
        </div>
      </section>

      {/* Main content — form (left) + social (right) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* ── LEFT: Contact form ── */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8 md:p-10 shadow-xl"
              style={{ background: "#FDFAF4", border: "1px solid #DDD0BB" }}
            >
              <h2
                className="font-display text-2xl font-semibold mb-1"
                style={{ color: "#3E2F23" }}
              >
                Envíanos un mensaje
              </h2>
              <p className="text-sm mb-8" style={{ color: "#7A6A5A" }}>
                Completa el formulario y nos pondremos en contacto contigo lo
                antes posible.
              </p>

              {sent ? (
                <div
                  className="flex flex-col items-center justify-center py-12 text-center gap-4 rounded-xl"
                  style={{ background: "#F5F1E8" }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "#C2A15A", color: "#fff" }}
                  >
                    ✓
                  </div>
                  <p
                    className="font-display text-xl font-semibold"
                    style={{ color: "#3E2F23" }}
                  >
                    ¡Mensaje enviado!
                  </p>
                  <p className="text-sm" style={{ color: "#7A6A5A" }}>
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-sm font-medium mt-2 transition-colors duration-200"
                    style={{ color: "#C2A15A" }}
                    onMouseEnter={(e) => (e.target.style.color = "#A0803A")}
                    onMouseLeave={(e) => (e.target.style.color = "#C2A15A")}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "#3E2F23" }}
                    >
                      Nombre completo
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "#F5F1E8",
                        border: "1.5px solid #DDD0BB",
                        color: "#1A1A1A",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#C2A15A")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "#DDD0BB")
                      }
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "#3E2F23" }}
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "#F5F1E8",
                        border: "1.5px solid #DDD0BB",
                        color: "#1A1A1A",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#C2A15A")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "#DDD0BB")
                      }
                    />
                  </div>

                  {/* Description / Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "#3E2F23" }}
                    >
                      Descripción de tu consulta
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Cuéntanos en qué podemos ayudarte, qué pieza te interesa, etc."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                      style={{
                        background: "#F5F1E8",
                        border: "1.5px solid #DDD0BB",
                        color: "#1A1A1A",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "#C2A15A")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "#DDD0BB")
                      }
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: loading
                        ? "#A0803A"
                        : "linear-gradient(135deg, #C2A15A, #A0803A)",
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(194,161,90,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={14} />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT: Contact info + social ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Info card */}
            <div
              className="rounded-2xl p-7 shadow-md"
              style={{
                background: "linear-gradient(135deg, #3E2F23, #5C4535)",
              }}
            >
              <h3
                className="font-display text-xl font-semibold mb-1"
                style={{ color: "#C2A15A" }}
              >
                El Baúl Viejo
              </h3>
              <p className="text-sm mb-4" style={{ color: "rgba(245,241,232,0.7)" }}>
                Antigüedades &amp; Piezas de colección
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,241,232,0.85)" }}>
                Somos un catálogo especializado en piezas únicas con historia.
                Si tienes dudas, estamos disponibles a través de nuestras redes
                o directamente por mensaje.
              </p>
            </div>

            {/* Social media */}
            <div
              className="rounded-2xl p-7 shadow-md"
              style={{ background: "#FDFAF4", border: "1px solid #DDD0BB" }}
            >
              <h3
                className="font-display text-lg font-semibold mb-5"
                style={{ color: "#3E2F23" }}
              >
                Síguenos en redes
              </h3>

              <div className="flex flex-col gap-4">
                {/* Facebook */}
                <a
                  id="contact-facebook-link"
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 group"
                  style={{
                    background: "#F5F1E8",
                    border: "1.5px solid #DDD0BB",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1877F2";
                    e.currentTarget.style.borderColor = "#1877F2";
                    e.currentTarget.querySelectorAll("span").forEach(
                      (s) => (s.style.color = "#fff")
                    );
                    e.currentTarget.querySelector("svg").style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#F5F1E8";
                    e.currentTarget.style.borderColor = "#DDD0BB";
                    e.currentTarget.querySelectorAll("span").forEach(
                      (s, i) =>
                        (s.style.color = i === 0 ? "#3E2F23" : "#7A6A5A")
                    );
                    e.currentTarget.querySelector("svg").style.color =
                      "#1877F2";
                  }}
                >
                  <FaFacebook
                    size={26}
                    style={{ color: "#1877F2", flexShrink: 0, transition: "color 0.2s" }}
                  />
                  <div>
                    <span
                      className="block text-sm font-semibold transition-colors duration-200"
                      style={{ color: "#3E2F23" }}
                    >
                      Facebook
                    </span>
                    <span
                      className="text-xs transition-colors duration-200"
                      style={{ color: "#7A6A5A" }}
                    >
                      El Baúl Viejo
                    </span>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  id="contact-instagram-link"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200"
                  style={{
                    background: "#F5F1E8",
                    border: "1.5px solid #DDD0BB",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.querySelectorAll("span").forEach(
                      (s) => (s.style.color = "#fff")
                    );
                    e.currentTarget.querySelector("svg").style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#F5F1E8";
                    e.currentTarget.style.borderColor = "#DDD0BB";
                    e.currentTarget.querySelectorAll("span").forEach(
                      (s, i) =>
                        (s.style.color = i === 0 ? "#3E2F23" : "#7A6A5A")
                    );
                    e.currentTarget.querySelector("svg").style.color =
                      "#E1306C";
                  }}
                >
                  <FaInstagram
                    size={26}
                    style={{ color: "#E1306C", flexShrink: 0, transition: "color 0.2s" }}
                  />
                  <div>
                    <span
                      className="block text-sm font-semibold transition-colors duration-200"
                      style={{ color: "#3E2F23" }}
                    >
                      Instagram
                    </span>
                    <span
                      className="text-xs transition-colors duration-200"
                      style={{ color: "#7A6A5A" }}
                    >
                      @elbaulviejo
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
