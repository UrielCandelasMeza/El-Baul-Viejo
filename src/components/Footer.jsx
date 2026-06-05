import { FaFacebook, FaInstagram, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { useNavigate } from "react-router";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100044156269092";
const INSTAGRAM_URL = "https://www.instagram.com/elbaulviejo";
const WS_URL = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? "525500000000"}`;
const MESSENGER_URL = `https://m.me/${import.meta.env.VITE_MESSENGER_PAGE ?? "elbaulviejo"}`;

function SocialChip({ href, icon, label, id }) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
      style={{
        background: "rgba(245,241,232,0.07)",
        border: "1px solid rgba(245,241,232,0.15)",
        color: "rgba(245,241,232,0.75)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(194,161,90,0.2)";
        e.currentTarget.style.borderColor = "rgba(194,161,90,0.5)";
        e.currentTarget.style.color = "#C2A15A";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(245,241,232,0.07)";
        e.currentTarget.style.borderColor = "rgba(245,241,232,0.15)";
        e.currentTarget.style.color = "rgba(245,241,232,0.75)";
      }}
    >
      {icon}
      {label}
    </a>
  );
}

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      id="contacto"
      style={{ background: "#3E2F23" }}
    >
      {/* ── Top section ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <p
            className="font-display text-2xl font-semibold"
            style={{ color: "#C2A15A" }}
          >
            El Baúl Viejo
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(245,241,232,0.6)" }}>
            Antigüedades &amp; Piezas de colección únicas con historia.
            Explora, descubre y contáctanos para adquirir tu pieza favorita.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <SocialChip
              id="footer-facebook"
              href={FACEBOOK_URL}
              icon={<FaFacebook size={14} />}
              label="Facebook"
            />
            <SocialChip
              id="footer-instagram"
              href={INSTAGRAM_URL}
              icon={<FaInstagram size={14} />}
              label="Instagram"
            />
            <SocialChip
              id="footer-whatsapp"
              href={WS_URL}
              icon={<FaWhatsapp size={14} />}
              label="WhatsApp"
            />
            <SocialChip
              id="footer-messenger"
              href={MESSENGER_URL}
              icon={<FaFacebookMessenger size={14} />}
              label="Messenger"
            />
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p
            className="text-xs font-semibold tracking-[0.14em] uppercase mb-5"
            style={{ color: "#C2A15A" }}
          >
            Navegación
          </p>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Catálogo", action: () => navigate("/") },
              { label: "Contáctanos", action: () => navigate("/contact") },
              { label: "Nosotros", action: () => navigate("/about") },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="text-sm text-left transition-colors duration-200 bg-transparent border-none cursor-pointer w-fit"
                style={{ color: "rgba(245,241,232,0.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C2A15A")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(245,241,232,0.65)")
                }
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Contact info */}
        <div>
          <p
            className="text-xs font-semibold tracking-[0.14em] uppercase mb-5"
            style={{ color: "#C2A15A" }}
          >
            Contacto directo
          </p>
          <div className="flex flex-col gap-3">
            <a
              id="footer-ws-direct"
              href={WS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors duration-200"
              style={{ color: "rgba(245,241,232,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,241,232,0.65)")
              }
            >
              <FaWhatsapp size={16} style={{ color: "#25D366", flexShrink: 0 }} />
              WhatsApp — Consultas y compras
            </a>
            <a
              id="footer-fb-direct"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors duration-200"
              style={{ color: "rgba(245,241,232,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1877F2")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,241,232,0.65)")
              }
            >
              <FaFacebook size={16} style={{ color: "#1877F2", flexShrink: 0 }} />
              Facebook — El Baúl Viejo
            </a>
            <a
              id="footer-ig-direct"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors duration-200"
              style={{ color: "rgba(245,241,232,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1306C")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,241,232,0.65)")
              }
            >
              <FaInstagram size={16} style={{ color: "#E1306C", flexShrink: 0 }} />
              Instagram — @elbaulviejo
            </a>
            <a
              id="footer-messenger-direct"
              href={MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors duration-200"
              style={{ color: "rgba(245,241,232,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0084FF")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,241,232,0.65)")
              }
            >
              <FaFacebookMessenger size={16} style={{ color: "#0084FF", flexShrink: 0 }} />
              Messenger — Consultas rápidas
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{ borderTop: "1px solid rgba(245,241,232,0.1)" }}
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
      >
        <p className="text-xs" style={{ color: "rgba(245,241,232,0.35)" }}>
          © {new Date().getFullYear()} El Baúl Viejo — Todos los derechos reservados.
        </p>
        <p className="text-xs" style={{ color: "rgba(245,241,232,0.35)" }}>
          Sitio de catálogo · Las ventas se realizan por contacto directo
        </p>
      </div>
    </footer>
  );
}

export default Footer;
