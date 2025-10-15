import { Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Globe size={20} />
            <span>LinguaSphere</span>
          </div>
          <p className="footer-tagline">
            Breaking Language Barriers in Skill Education
          </p>
          <p className="footer-copyright">
            &copy; {currentYear} LinguaSphere. Empowering India's learners through accessible, multilingual vocational education.
          </p>
        </div>
      </div>
    </footer>
  );
}
