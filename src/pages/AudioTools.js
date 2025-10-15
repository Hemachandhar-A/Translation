import { Mic, Volume2, Play, Square } from 'lucide-react';
import './AudioTools.css';

export default function AudioTools() {
  return (
    <div className="audio-tools fade-in">
      <h1>Audio Tools</h1>
      <p className="page-description">
        Convert between text and speech in multiple Indian languages
      </p>

      <div className="audio-grid">
        <div className="card audio-panel">
          <div className="audio-header">
            <div className="audio-icon-wrapper tts">
              <Volume2 size={32} />
            </div>
            <h2>Text-to-Speech</h2>
          </div>
          <p className="card-description">
            Convert written text into natural-sounding speech in your preferred language
          </p>

          <div className="input-group">
            <label>Select Language</label>
            <select className="select">
              <option>Hindi</option>
              <option>English</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Bengali</option>
              <option>Marathi</option>
            </select>
          </div>

          <div className="input-group">
            <label>Enter Text</label>
            <textarea
              className="textarea"
              placeholder="Type or paste text here..."
              rows={6}
            />
          </div>

          <button className="btn btn-primary">
            <Play size={20} />
            Generate Speech
          </button>

          <div className="badge badge-warning" style={{ marginTop: '1rem' }}>AI Placeholder</div>
        </div>

        <div className="card audio-panel">
          <div className="audio-header">
            <div className="audio-icon-wrapper stt">
              <Mic size={32} />
            </div>
            <h2>Speech-to-Text</h2>
          </div>
          <p className="card-description">
            Convert spoken words into written text with high accuracy
          </p>

          <div className="input-group">
            <label>Select Language</label>
            <select className="select">
              <option>Hindi</option>
              <option>English</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Bengali</option>
              <option>Marathi</option>
            </select>
          </div>

          <div className="recording-area">
            <div className="recording-indicator">
              <div className="pulse-ring"></div>
              <Mic size={48} />
            </div>
            <p>Click to start recording</p>
          </div>

          <div className="audio-controls">
            <button className="btn btn-accent">
              <Square size={20} />
              Start Recording
            </button>
          </div>

          <div className="input-group">
            <label>Transcription</label>
            <textarea
              className="textarea"
              placeholder="Transcribed text will appear here..."
              rows={4}
              readOnly
              style={{ background: '#f8f9fa' }}
            />
          </div>

          <div className="badge badge-warning" style={{ marginTop: '1rem' }}>AI Placeholder</div>
        </div>
      </div>

      <div className="card info-section">
        <h3>Supported Features</h3>
        <div className="features-list">
          <div className="feature-item">
            <span className="badge badge-success">Available</span>
            <span>Multiple Indian languages support</span>
          </div>
          <div className="feature-item">
            <span className="badge badge-success">Available</span>
            <span>Natural voice synthesis</span>
          </div>
          <div className="feature-item">
            <span className="badge badge-success">Available</span>
            <span>Real-time transcription</span>
          </div>
          <div className="feature-item">
            <span className="badge badge-warning">Coming Soon</span>
            <span>Accent adaptation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
