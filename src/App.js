import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Translate from './pages/Translate';
import Vocabulary from './pages/Vocabulary';
import AudioTools from './pages/AudioTools';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import SpeechTranslate from './pages/SpeechTranslate';
import DocumentTranslate from './pages/DocumentTranslate';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="content-wrapper">
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/translate" element={<Translate />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/audio-tools" element={<AudioTools />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />


                <Route path="/speech" element={<SpeechTranslate />} />
                <Route path="/document" element={<DocumentTranslate />} />

              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
