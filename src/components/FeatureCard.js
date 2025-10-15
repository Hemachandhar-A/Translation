import { Link } from 'react-router-dom';
import './FeatureCard.css';

export default function FeatureCard({ icon: Icon, title, description, link, color = 'primary' }) {
  return (
    <Link to={link} className="feature-card">
      <div className={`feature-card-icon ${color}`}>
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
