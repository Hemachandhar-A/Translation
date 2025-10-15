import { BarChart3, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const recentTranslations = [
    { id: 1, source: 'English', target: 'Hindi', domain: 'Welding', quality: 95, date: '2025-10-10' },
    { id: 2, source: 'Hindi', target: 'Tamil', domain: 'Electrical', quality: 92, date: '2025-10-10' },
    { id: 3, source: 'English', target: 'Bengali', domain: 'Plumbing', quality: 88, date: '2025-10-09' },
    { id: 4, source: 'Tamil', target: 'Hindi', domain: 'General', quality: 94, date: '2025-10-09' },
  ];

  return (
    <div className="dashboard fade-in">
      <h1>Accuracy Dashboard</h1>
      <p className="page-description">
        Monitor translation quality and system performance metrics
      </p>

      <div className="metrics-grid">
        <div className="card metric-card">
          <div className="metric-icon primary">
            <CheckCircle size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">94.2%</div>
            <div className="metric-label">Overall Accuracy</div>
            <div className="metric-change positive">
              <TrendingUp size={16} />
              +2.3% from last week
            </div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon secondary">
            <BarChart3 size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">1,847</div>
            <div className="metric-label">Translations</div>
            <div className="metric-change positive">
              <TrendingUp size={16} />
              +156 this week
            </div>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-icon accent">
            <Clock size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-value">1.2s</div>
            <div className="metric-label">Avg. Processing Time</div>
            <div className="metric-change positive">
              <TrendingUp size={16} />
              15% faster
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <h3>Quality Score Trend</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '75%' }}>
                <span className="bar-label">Mon</span>
              </div>
              <div className="chart-bar" style={{ height: '82%' }}>
                <span className="bar-label">Tue</span>
              </div>
              <div className="chart-bar" style={{ height: '78%' }}>
                <span className="bar-label">Wed</span>
              </div>
              <div className="chart-bar" style={{ height: '88%' }}>
                <span className="bar-label">Thu</span>
              </div>
              <div className="chart-bar" style={{ height: '92%' }}>
                <span className="bar-label">Fri</span>
              </div>
              <div className="chart-bar" style={{ height: '90%' }}>
                <span className="bar-label">Sat</span>
              </div>
              <div className="chart-bar" style={{ height: '94%' }}>
                <span className="bar-label">Sun</span>
              </div>
            </div>
          </div>
          <div className="badge badge-success" style={{ marginTop: '1rem' }}>Sample Data</div>
        </div>

        <div className="card">
          <h3>Domain Performance</h3>
          <div className="domain-list">
            <div className="domain-item">
              <span className="domain-name">Welding</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '95%' }}></div>
              </div>
              <span className="domain-score">95%</span>
            </div>
            <div className="domain-item">
              <span className="domain-name">Electrical</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '92%' }}></div>
              </div>
              <span className="domain-score">92%</span>
            </div>
            <div className="domain-item">
              <span className="domain-name">Plumbing</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '88%' }}></div>
              </div>
              <span className="domain-score">88%</span>
            </div>
            <div className="domain-item">
              <span className="domain-name">Carpentry</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '90%' }}></div>
              </div>
              <span className="domain-score">90%</span>
            </div>
          </div>
          <div className="badge badge-success" style={{ marginTop: '1rem' }}>Sample Data</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Translations</h3>
        <div className="table-container">
          <table className="translations-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Target</th>
                <th>Domain</th>
                <th>Quality Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTranslations.map((translation) => (
                <tr key={translation.id}>
                  <td>{translation.source}</td>
                  <td>{translation.target}</td>
                  <td>
                    <span className="badge badge-primary">{translation.domain}</span>
                  </td>
                  <td>
                    <span className={`quality-score ${translation.quality >= 90 ? 'high' : 'medium'}`}>
                      {translation.quality}%
                    </span>
                  </td>
                  <td>{translation.date}</td>
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
