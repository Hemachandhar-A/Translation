import { Link, useLocation } from 'react-router-dom';
import {
  Languages,
  BookOpen,
  Mic,
  MessageSquare,
  BarChart3,
  User,
  Info
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (window.innerWidth <= 1024) {
      onClose();
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-section-title">Main Tools</div>
        <Link
          to="/translate"
          className={`sidebar-link ${isActive('/translate') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <Languages size={20} />
          <span>Translation</span>
        </Link>
        <Link
          to="/vocabulary"
          className={`sidebar-link ${isActive('/vocabulary') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <BookOpen size={20} />
          <span>Vocabulary</span>
        </Link>
        <Link
          to="/audio-tools"
          className={`sidebar-link ${isActive('/audio-tools') ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          <Mic size={20} />
          <span>Audio Tools</span>
        </Link>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Insights</div>
          <Link
            to="/dashboard"
            className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <BarChart3 size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/feedback"
            className={`sidebar-link ${isActive('/feedback') ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <MessageSquare size={20} />
            <span>Feedback</span>
          </Link>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Account</div>
          <Link
            to="/profile"
            className={`sidebar-link ${isActive('/profile') ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link
            to="/about"
            className={`sidebar-link ${isActive('/about') ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <Info size={20} />
            <span>About</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
