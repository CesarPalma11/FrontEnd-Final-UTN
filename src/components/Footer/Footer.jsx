import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import "./Footer.css";
import PropTypes from "prop-types";

const Footer = ({darkMode}) => {
  return (
    <footer className={`footer-container ${darkMode ? "dark-theme" : ""}`}>
      <nav className="footer-nav">
      
        <ul className="footer-column">
          <div className="icons-footer">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
          <li>Avisos Legales</li>
          <li>Relaciones con inversionistas</li>
          <li>Audio descriptivo</li>
          <li>
            <button className="service-btn">Código de servicio</button>
          </li>
          <p>© 2025 Todos los derechos reservados</p>
        </ul>

        <ul className="footer-column">
          <li>Centro de ayuda</li>
          <li>Empleo</li>
          <li>Preferencias de cookies</li>
        </ul>

        <ul className="footer-column">
          <li>Tarjetas de regalo</li>
          <li>Términos de uso</li>
          <li>Información corporativa</li>
        </ul>

        <ul className="footer-column">
          <li>Prensa</li>
          <li>Privacidad</li>
          <li>Contáctanos</li>
        </ul>
      </nav>
    </footer>
  );
};

Footer.propTypes = {
  darkMode: PropTypes.bool.isRequired, 
  setDarkMode: PropTypes.func.isRequired, 
};
export default Footer;