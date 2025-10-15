import { MessageSquare, Star, Send } from 'lucide-react';
import { useState } from 'react';
import './Feedback.css';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="feedback fade-in">
      <h1>Feedback</h1>
      <p className="page-description">
        Help us improve by sharing your experience with LinguaSphere
      </p>

      <div className="feedback-grid">
        <div className="card feedback-form">
          <h3>
            <MessageSquare size={24} />
            Share Your Thoughts
          </h3>

          <div className="input-group">
            <label>Feedback Category</label>
            <select className="select">
              <option>Translation Quality</option>
              <option>Audio Tools</option>
              <option>Vocabulary</option>
              <option>User Interface</option>
              <option>Performance</option>
              <option>Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Rate Your Experience</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star size={32} fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="rating-text">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Needs Improvement'}
              </p>
            )}
          </div>

          <div className="input-group">
            <label>Your Feedback</label>
            <textarea
              className="textarea"
              placeholder="Tell us about your experience, suggestions for improvement, or any issues you encountered..."
              rows={8}
            />
          </div>

          <div className="input-group">
            <label>Email (optional)</label>
            <input
              type="email"
              className="input"
              placeholder="your.email@example.com"
            />
          </div>

          <button className="btn btn-primary">
            <Send size={20} />
            Submit Feedback
          </button>

          <div className="badge badge-warning" style={{ marginTop: '1rem' }}>Placeholder - Not Functional</div>
        </div>

        <div className="feedback-info">
          <div className="card">
            <h3>Why Your Feedback Matters</h3>
            <p>
              LinguaSphere is built for learners and educators across India. Your insights help us:
            </p>
            <ul className="feedback-benefits">
              <li>Improve translation accuracy</li>
              <li>Enhance domain-specific vocabulary</li>
              <li>Better serve regional language needs</li>
              <li>Create more intuitive features</li>
              <li>Build a more inclusive learning platform</li>
            </ul>
          </div>

          <div className="card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">1,234</div>
                <div className="stat-label">Feedback Received</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4.8</div>
                <div className="stat-label">Average Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Response Rate</div>
              </div>
            </div>
            <div className="badge badge-success" style={{ marginTop: '1rem' }}>Sample Data</div>
          </div>
        </div>
      </div>
    </div>
  );
}
