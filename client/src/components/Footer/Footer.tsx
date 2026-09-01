import { useState, type FormEvent } from "react";
import "./Footer.css";

const quickLinks = [
  { label: "Winteg Technologies Home", href: "#home" },
  { label: "About Winteg Technologies", href: "#about" },
  { label: "Winteg Services", href: "#services" },
  { label: "Winteg Process", href: "#portfolio" },
  { label: "Contact Winteg Technologies", href: "#contact" },
];

const serviceLinks = [
  "Telemetrics & IoT",
  "AI Solutions",
  "GPS & Tracking",
  "AI Camera & Vision",
  "ERP & CRM",
  "Healthcare Systems",
  "Fintech & Payments",
  "Website Development",
  "Software Development",
  "Social Media",
  "Web Applications",
  "Mobile Apps",
];

interface FooterProps {
  onOpenLegal?: (type: "privacy" | "terms") => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const apiUrl = import.meta.env.PROD
        ? "https://api.wintegtechnologies.com/api/newsletter"
        : "/api/newsletter";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = "Subscription failed. Please try again.";
        if (result.detail) {
          if (Array.isArray(result.detail)) {
            errorMessage = result.detail
              .map((err: any) => {
                const field = err.loc && err.loc.length > 1 ? err.loc[1] : "";
                return field
                  ? `${field.charAt(0).toUpperCase() + field.slice(1)}: ${err.msg}`
                  : err.msg;
              })
              .join(", ");
          } else if (typeof result.detail === "string") {
            errorMessage = result.detail;
          } else {
            errorMessage = JSON.stringify(result.detail);
          }
        }
        throw new Error(errorMessage);
      }

      setStatus("success");
      setMessage(result.message || "Successfully subscribed!");
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (err: any) {
      console.error("Newsletter error:", err);
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="footer" id="footer">
      {/* Top Divider with gradient */}
      <div className="footer__divider"></div>

      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src="/favicon.svg"
                alt="Winteg Technologies Logo"
                width="32"
                height="32"
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
              <span className="footer__logo-text">
                Winteg<span className="gradient-text">Tech</span>
              </span>
            </div>
            <p className="footer__tagline">
              Winteg Technologies — transforming ideas into powerful digital
              solutions. Web development, software engineering, AI solutions,
              mobile apps & social media — all under one roof. Search for
              winteg, winteg technologies, or wintegtechnologies and find your
              tech partner.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="footer__link">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__col">
            <h4 className="footer__col-title">Stay Updated</h4>
            <p className="footer__newsletter-text">
              Subscribe for the latest tech insights and company updates.
            </p>
            <form className="footer__newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "..."
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </form>
            {message && (
              <p
                className={`footer__newsletter-status ${status === "success" ? "footer__newsletter-status--success" : "footer__newsletter-status--error"}`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Winteg Technologies
            (wintegtechnologies.com). All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="https://wintegtechnologies.com/">Winteg Technologies</a>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenLegal) onOpenLegal("privacy");
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenLegal) onOpenLegal("terms");
              }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
