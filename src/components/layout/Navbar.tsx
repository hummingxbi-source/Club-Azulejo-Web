import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoIcon from "@/assets/images/logo-icon.png";

/* ────────────────────────────────────────────────
   Navbar — pastilla flotante centrada
   - Transparente sobre el hero
   - backdrop-blur + canvas/80 al hacer scroll
   - Mobile: menú de pantalla completa en serif
   ──────────────────────────────────────────────── */

const NAV_LINKS = [
  { to: "/#metodo", id: "metodo", label: "Método" },
  { to: "/#programas", id: "programas", label: "Programas" },
  { to: "/#instructores", id: "instructores", label: "Instructores" },
  { to: "/#galeria", id: "galeria", label: "Galería" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");
  const location = useLocation();

  /* ── Track scroll ──────────────────────────── */
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 40);
          setPastHero(currentScrollY > window.innerHeight * 0.5);
          
          const heroHeight = window.innerHeight * 3.5;
          if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Hide on scroll down, unless we've passed the Hero section
            if (currentScrollY > heroHeight - 100) {
              setHidden(false);
            } else {
              setHidden(true);
            }
          } else if (currentScrollY < lastScrollY) {
            // Show on scroll up
            setHidden(false);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Track active section in viewport ──────── */
  useEffect(() => {
    // Only track hashes on home page
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible intersecting entry
        let maxRatio = 0;
        let mostVisibleId = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        if (mostVisibleId) setActiveHash(`#${mostVisibleId}`);
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [location.pathname]);

  /* ── Close on route change ─────────────────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Auto-close mobile menu on desktop resize ─ */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Lock body scroll ──────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Escape key ────────────────────────────── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  return (
    <>
      {/*
        El header ocupa todo el ancho fijo pero con pointer-events: none
        para no bloquear clics en el hero. La <nav> recupera pointer-events.
      */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "clamp(20px, 3vw, 32px) var(--container-padding)",
          pointerEvents: "none",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          opacity: hidden ? 0 : 1,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <nav
          className={scrolled ? "nav-pill--scrolled" : ""}
          style={{
            maxWidth: "var(--container-max)",
            marginInline: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
            paddingInline: "24px",
            borderRadius: "var(--radius-pill)",
            border: `1px solid ${scrolled ? "var(--color-line)" : "transparent"}`,
            transition: [
              "background-color var(--duration-md) var(--ease-out)",
              "border-color var(--duration-md) var(--ease-out)",
            ].join(", "),
            pointerEvents: "auto",
          }}
        >
          {/* ── Wordmark ──────────────────────── */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              flexShrink: 0,
              textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={logoIcon}
              alt=""
              width={28}
              height={28}
              style={{ display: "block", flexShrink: 0 }}
            />
            Club Azulejo
          </Link>

          {/* ── Desktop centre links ───────────── */}
          <ul className="nav-desktop-links">
            {NAV_LINKS.map(({ to, id, label }) => {
              const isHashLink = to.startsWith("/#");
              const isActive = isHashLink
                ? location.pathname === "/" && activeHash === `#${id}`
                : location.pathname === to;

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isHashLink && location.pathname === "/") {
                  e.preventDefault();
                  const target = document.getElementById(id);
                  if (target) {
                    // @ts-ignore
                    if (window.lenis) {
                      // @ts-ignore
                      window.lenis.scrollTo(target, { offset: -80, immediate: false });
                    } else {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    window.history.pushState({}, "", to);
                  }
                }
              };

              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={handleClick}
                    className="nav-link"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                      transition: "color var(--duration-sm) var(--ease-out), font-weight var(--duration-sm) var(--ease-out)",
                      textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop right ─────────────────── */}
          <div
            className="nav-desktop-right"
            style={{
              opacity: pastHero ? 1 : 0,
              visibility: pastHero ? "visible" : "hidden",
              pointerEvents: pastHero ? "auto" : "none",
              transition: "opacity 0.2s ease-out, visibility 0.2s ease-out",
            }}
          >
            <Button
              variant="primary"
              size="md"
              href="/inscripcion"
              style={{
                textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
              }}
            >
              Agendar clase diagnóstica
            </Button>
          </div>

          {/* ── Mobile hamburger ──────────────── */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            style={{
              textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.4)",
              filter: scrolled ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
            }}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile fullscreen sheet ────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              backgroundColor: "var(--color-canvas)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "28px",
              padding: "var(--container-padding)",
            }}
          >
            {NAV_LINKS.map(({ to, id, label }, i) => {
              const isHashLink = to.startsWith("/#");
              const isActive = isHashLink
                ? location.pathname === "/" && activeHash === `#${id}`
                : location.pathname === to;

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileOpen(false);
                if (isHashLink && location.pathname === "/") {
                  e.preventDefault();
                  const target = document.getElementById(id);
                  if (target) {
                    // @ts-ignore
                    if (window.lenis) {
                      // @ts-ignore
                      window.lenis.scrollTo(target, { offset: -80, immediate: false });
                    } else {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    window.history.pushState({}, "", to);
                  }
                }
              };

              return (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={to}
                    onClick={handleClick}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      fontWeight: 400,
                      color: isActive ? "var(--color-accent)" : "var(--color-text)",
                      transition: "color var(--duration-sm) var(--ease-out)",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <Button
                variant="primary"
                size="lg"
                href="/inscripcion"
                onClick={() => setMobileOpen(false)}
              >
                Agendar clase diagnóstica
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scoped styles ─────────────────────── */}
      <style>{`
        .nav-desktop-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-pill--scrolled {
          background-color: rgba(11,27,36,0.94);
          transition: background-color var(--duration-md) var(--ease-out), border-color var(--duration-md) var(--ease-out), backdrop-filter var(--duration-md) var(--ease-out);
        }
        @media (min-width: 1024px) {
          .nav-pill--scrolled {
            background-color: rgba(11,27,36,0.82);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }
        .nav-desktop-right {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }
        .nav-mobile-toggle {
          display: none !important;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .nav-link:hover {
          color: var(--color-text) !important;
        }

        /* ── Button hover states (global, scoped by class) */
        .btn--primary:hover  { filter: brightness(1.1); }
        .btn--primary:active { transform: scale(0.97); }
        .btn--ghost:hover {
          background-color: var(--color-surface) !important;
          border-color: var(--color-text-muted) !important;
        }
        .btn--ghost:active  { transform: scale(0.97); }
        .btn--text:hover .btn-arrow { transform: translateX(4px); }
        .btn-arrow { transition: transform var(--duration-md) var(--ease-out); }
        .btn:disabled { opacity: 0.4; pointer-events: none; }

        @media (max-width: 1023px) {
          .nav-desktop-links  { display: none !important; }
          .nav-desktop-right  { display: none !important; }
          .nav-mobile-toggle  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
