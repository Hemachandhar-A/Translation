import { Globe, Target, Users, Heart, Mail } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about fade-in">
      <div className="about-hero">
        <Globe size={64} className="about-logo" />
        <h1>About LinguaSphere</h1>
        <p className="about-tagline">
          Empowering India's learners through accessible, multilingual vocational education
        </p>
      </div>

      <div className="about-grid">
        <div className="card about-card">
          <div className="about-icon-wrapper mission">
            <Target size={32} />
          </div>
          <h3>Our Mission</h3>
          <p>
            To break down language barriers in skill education and make vocational training
            accessible to every learner across India, regardless of their native language.
          </p>
        </div>

        <div className="card about-card">
          <div className="about-icon-wrapper vision">
            <Users size={32} />
          </div>
          <h3>Our Vision</h3>
          <p>
            A future where every vocational learner in India can access quality training
            materials in their preferred language, powered by AI-driven localization.
          </p>
        </div>

        <div className="card about-card">
          <div className="about-icon-wrapper values">
            <Heart size={32} />
          </div>
          <h3>Our Values</h3>
          <p>
            Inclusivity, accessibility, quality, and innovation drive everything we do.
            We believe education should transcend language boundaries.
          </p>
        </div>
      </div>

      <div className="card about-section">
        <h2>The Challenge We Address</h2>
        <p>
          India's vocational education landscape faces a critical challenge: quality training
          materials are predominantly available in English, creating barriers for millions of
          learners who are more comfortable in their regional languages.
        </p>
        <p>
          LinguaSphere leverages AI-powered translation and localization to make technical
          content accessible across multiple Indian languages, ensuring that language is never
          a barrier to skill development.
        </p>
      </div>

      <div className="card about-section">
        <h2>Key Features</h2>
        <div className="features-list-about">
          <div className="feature-item-about">
            <div className="feature-bullet"></div>
            <div>
              <strong>Multilingual Translation:</strong> Accurate translation of technical content
              across major Indian languages with context awareness.
            </div>
          </div>
          <div className="feature-item-about">
            <div className="feature-bullet"></div>
            <div>
              <strong>Domain-Specific Vocabulary:</strong> Specialized terminology adaptation for
              vocational fields like welding, plumbing, and electrical work.
            </div>
          </div>
          <div className="feature-item-about">
            <div className="feature-bullet"></div>
            <div>
              <strong>Audio Tools:</strong> Text-to-speech and speech-to-text capabilities for
              enhanced accessibility and learning.
            </div>
          </div>
          <div className="feature-item-about">
            <div className="feature-bullet"></div>
            <div>
              <strong>Quality Assurance:</strong> Continuous monitoring and improvement of
              translation accuracy based on user feedback.
            </div>
          </div>
        </div>
      </div>

      <div className="card about-section partners">
        <h2>Our Partners</h2>
        <p className="partners-description">
          We collaborate with vocational training institutions, government bodies, and
          technology partners to deliver the best localization experience.
        </p>
        <div className="partners-grid">
          <div className="partner-placeholder">Partner Logo 1</div>
          <div className="partner-placeholder">Partner Logo 2</div>
          <div className="partner-placeholder">Partner Logo 3</div>
          <div className="partner-placeholder">Partner Logo 4</div>
        </div>
        <div className="badge badge-primary" style={{ marginTop: '1rem' }}>Placeholder Images</div>
      </div>

      <div className="card about-section contact">
        <h2>
          <Mail size={28} />
          Get In Touch
        </h2>
        <p>
          Have questions or want to collaborate? We'd love to hear from you.
        </p>
        <div className="contact-info">
          <p><strong>Email:</strong> contact@linguasphere.in</p>
          <p><strong>Support:</strong> support@linguasphere.in</p>
        </div>
      </div>
    </div>
  );
}
