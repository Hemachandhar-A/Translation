import { BookOpen, Upload, Plus, Search } from 'lucide-react';
import './Vocabulary.css';

export default function Vocabulary() {
  const dummyVocabulary = [
    { term: 'Welding Rod', hindi: 'वेल्डिंग रॉड', domain: 'Welding' },
    { term: 'Circuit Breaker', hindi: 'सर्किट ब्रेकर', domain: 'Electrical' },
    { term: 'Pipe Wrench', hindi: 'पाइप रिंच', domain: 'Plumbing' },
    { term: 'Soldering Iron', hindi: 'सोल्डरिंग आयरन', domain: 'Electrical' },
    { term: 'Safety Goggles', hindi: 'सुरक्षा चश्मा', domain: 'General' },
  ];

  return (
    <div className="vocabulary fade-in">
      <h1>Domain Vocabulary</h1>
      <p className="page-description">
        Manage specialized vocabulary for different vocational domains
      </p>

      <div className="vocabulary-grid">
        <div className="card">
          <h3>
            <Upload size={24} />
            Upload Domain Terms
          </h3>
          <p className="card-description">Import custom vocabulary lists for specific trades</p>
          <div className="input-group">
            <label>Select Domain</label>
            <select className="select">
              <option>Welding</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
              <option>Masonry</option>
            </select>
          </div>
          <button className="btn btn-primary">
            <Upload size={20} />
            Upload File
          </button>
          <div className="badge badge-warning" style={{ marginTop: '1rem' }}>Coming Soon</div>
        </div>

        <div className="card">
          <h3>
            <Plus size={24} />
            Vocabulary Expander
          </h3>
          <p className="card-description">AI-powered expansion of domain-specific terms</p>
          <div className="input-group">
            <label>Enter Base Term</label>
            <input type="text" className="input" placeholder="e.g., welding" />
          </div>
          <button className="btn btn-accent">
            <Plus size={20} />
            Generate Vocabulary
          </button>
          <div className="badge badge-warning" style={{ marginTop: '1rem' }}>AI Placeholder</div>
        </div>
      </div>

      <div className="card vocabulary-list-section">
        <div className="vocabulary-list-header">
          <h3>
            <BookOpen size={24} />
            Vocabulary Library
          </h3>
          <div className="search-box">
            <Search size={20} />
            <input type="text" placeholder="Search terms..." className="input" />
          </div>
        </div>

        <div className="vocabulary-table">
          <table>
            <thead>
              <tr>
                <th>English Term</th>
                <th>Hindi Translation</th>
                <th>Domain</th>
              </tr>
            </thead>
            <tbody>
              {dummyVocabulary.map((item, index) => (
                <tr key={index}>
                  <td>{item.term}</td>
                  <td>{item.hindi}</td>
                  <td>
                    <span className="badge badge-primary">{item.domain}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="badge badge-success" style={{ marginTop: '1rem' }}>Sample Data</div>
      </div>
    </div>
  );
}
