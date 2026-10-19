import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-club.png";
import { NAV_LINKS } from "./Navbar";
import { TEL, EMAIL, WHATSAPP } from "@/lib/contacto";

export function Footer() {
  return (
    <footer className="az-foot">
      <div className="wrap">
        <div className="cols">
          <div className="brand">
            <img src={logo} alt="Club Azulejo" />
            <p>Escuela de natación con alberca techada, agua templada y grupos reducidos. Aprender a nadar, con calma y con técnica.</p>
          </div>
          <div><h4>Navegación</h4><ul>{NAV_LINKS.map(([id, t]) => <li key={id}><Link to={"/" + id}>{t}</Link></li>)}<li><Link to="/inscripcion">Inscripción</Link></li></ul></div>
          <div><h4>Horarios</h4><ul><li>Lunes a viernes · 6:00 – 20:00</li><li>Sábado · 7:00 – 14:00</li><li>Domingo · cerrado</li></ul></div>
          <div><h4>Contacto</h4><ul><li><a href={"tel:" + TEL.replace(/\s/g, "")}>{TEL}</a></li><li><a href={"mailto:" + EMAIL}>{EMAIL}</a></li><li><a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
        </div>
        <div className="word" aria-hidden>AZULEJO</div>
        <div className="bottom"><span>© {new Date().getFullYear()} Club Azulejo · Escuela de Natación</span><span>Hecho por HummingX BI</span></div>
      </div>
    </footer>
  );
}
