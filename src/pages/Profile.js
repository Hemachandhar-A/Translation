import { User, Mail, Globe, Settings, Edit } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  return (
    <div className="profile fade-in">
      <h1>Profile</h1>
      <p className="page-description">
        Manage your account settings and preferences
      </p>

      <div className="profile-grid">
        <div className="card profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={48} />
            </div>
            <h2>Demo User</h2>
            <p className="profile-role">Vocational Learner</p>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <Mail size={20} />
              <span>demo.user@linguasphere.in</span>
            </div>
            <div className="info-item">
              <Globe size={20} />
              <span>Primary Language: Hindi</span>
            </div>
          </div>

          <button className="btn btn-secondary">
            <Edit size={20} />
            Edit Profile
          </button>

          <div className="badge badge-warning" style={{ marginTop: '1rem' }}>Placeholder - Not Functional</div>
        </div>

        <div className="profile-settings">
          <div className="card">
            <h3>
              <Settings size={24} />
              Language Preferences
            </h3>

            <div className="input-group">
              <label>Primary Language</label>
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
              <label>Secondary Language</label>
              <select className="select">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Bengali</option>
                <option>Marathi</option>
              </select>
            </div>

            <div className="input-group">
              <label>Preferred Domain</label>
              <select className="select">
                <option>General</option>
                <option>Welding</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Carpentry</option>
                <option>Masonry</option>
              </select>
            </div>

            <button className="btn btn-primary">Save Preferences</button>
          </div>

          <div className="card">
            <h3>Account Statistics</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-label">Translations Made</span>
                <span className="stat-value">247</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Vocabulary Terms Added</span>
                <span className="stat-value">89</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Audio Conversions</span>
                <span className="stat-value">156</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Member Since</span>
                <span className="stat-value">Oct 2025</span>
              </div>
            </div>
            <div className="badge badge-success" style={{ marginTop: '1rem' }}>Sample Data</div>
          </div>
        </div>
      </div>
    </div>
  );
}
