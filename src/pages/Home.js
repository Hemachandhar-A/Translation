import { Link } from 'react-router-dom';
import { Languages, BookOpen, Mic, BarChart3, MessageSquare, ArrowRight,FileUp } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import './Home.css';

export default function Home() {
  return (
    <div className="home fade-in">
      <section className="hero">
        <h1>Breaking Language Barriers in Skill Education</h1>
        <p className="hero-tagline">
          AI-powered multilingual content localization for vocational training across India
        </p>
        <div className="hero-actions">
          <Link to="/translate" className="btn btn-primary">
            Get Started
            <ArrowRight size={20} />
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          <FeatureCard
            icon={Languages}
            title="Multilingual Translation"
            description="Translate technical content across Indian languages with AI-powered accuracy and context awareness."
            link="/translate"
            color="primary"
          />
          <FeatureCard
            icon={FileUp}
            title="Document Translation"
            description="Translate entire documents between Indian languages while preserving formatting and structure. Supports PDF and Word files for education, training, and multilingual communication."
            link="/document"
            color="accent"
          />

          <FeatureCard
            icon={Mic}
            title="Audio Tools"
            description="Bridge language barriers with AI-powered speech tools — record or upload audio, get instant transcription and translation"
            link="/speech"
            color="accent"
          />

          <FeatureCard
            icon={BookOpen}
            title="Domain Vocabulary"
            description="Specialized vocabulary adaptation for vocational domains like welding, plumbing, and electrical work."
            link="/vocabulary"
            color="secondary"
          />

          <FeatureCard
            icon={BarChart3}
            title="Quality Dashboard"
            description="Track translation accuracy and quality metrics to ensure the best learning experience."
            link="/dashboard"
            color="primary"
          />
          <FeatureCard
            icon={MessageSquare}
            title="Feedback System"
            description="Help us improve with your feedback on translations and localization quality."
            link="/feedback"
            color="secondary"
          />
        </div>
      </section>
    </div>
  );
}
