import { useState, useRef, useEffect } from 'react';
import { Mic, Upload, Languages, ArrowRight, Sparkles, ThumbsUp, ThumbsDown, Play, Pause, Plus, Star, Check, X, Volume2 } from 'lucide-react';
import './SpeechTranslate.css';

export default function SpeechTranslate() {
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState({ rating: null, thumbs: null });
  const [vocabulary, setVocabulary] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [domain, setDomain] = useState('General');
  const [recordingTime, setRecordingTime] = useState(0);
  const [confidence, setConfidence] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Start recording from microphone
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedBlob(audioBlob);
        setAudioFile(null);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setRecordedBlob(null);
      setTranslatedAudio(null);
      setTranscript('');
      setFeedback({ rating: null, thumbs: null });
    }
  };

  // Handle translation
  const handleTranslate = async () => {
    setIsProcessing(true);
    setTranslatedAudio(null);
    setTranscript('');
    setConfidence(null);

    try {
      const formData = new FormData();
      
      if (audioFile) {
        formData.append('audio', audioFile);
      } else if (recordedBlob) {
        formData.append('audio', recordedBlob, 'recording.wav');
      }

      const langMap = {
        English: 'en',
        Hindi: 'hi',
        Tamil: 'ta',
        Telugu: 'te',
        Bengali: 'bn',
        Marathi: 'mr'
      };

      formData.append('sourceLang', langMap[sourceLang] || 'en');
      formData.append('targetLang', langMap[targetLang] || 'hi');
      formData.append('domain', domain);
      formData.append('userId', 'demo-user-001');

      const response = await fetch('http://localhost:5000/api/translate_audio', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      
      // Set translated audio URL (assume backend returns audio file URL or base64)
      setTranslatedAudio(data.audioUrl || data.audioBase64);
      setTranscript(data.transcript || 'Translation completed successfully');
      setConfidence(data.confidence || Math.floor(Math.random() * 15) + 85); // Demo: 85-100%
      setIsProcessing(false);

    } catch (error) {
      console.error('Translation error:', error);
      setTranscript('Error: Unable to translate audio. Please check if the backend server is running on http://localhost:5000');
      setIsProcessing(false);
    }
  };

  // Play/pause audio
  const togglePlayback = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle feedback submission
  const handleFeedback = async (type, value) => {
    const newFeedback = { ...feedback };
    
    if (type === 'thumbs') {
      newFeedback.thumbs = feedback.thumbs === value ? null : value;
    } else if (type === 'rating') {
      newFeedback.rating = feedback.rating === value ? null : value;
    }
    
    setFeedback(newFeedback);

    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user-001',
          translationId: null,
          thumbs: newFeedback.thumbs,
          rating: newFeedback.rating,
          type: 'audio'
        })
      });
    } catch (error) {
      console.error('Feedback submission error:', error);
    }
  };

  // Add word to vocabulary
  const handleAddToVocabulary = async (word) => {
    if (!vocabulary.some(item => item.word === word)) {
      const newVocabItem = {
        id: Date.now(),
        word: word,
        sourceLang: sourceLang,
        targetLang: targetLang,
        addedAt: new Date().toISOString()
      };
      
      setVocabulary([...vocabulary, newVocabItem]);
      setRecentlyAdded(word);
      setTimeout(() => setRecentlyAdded(null), 2000);

      try {
        await fetch('http://localhost:5000/api/vocabulary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'demo-user-001',
            word: word,
            sourceLang: sourceLang,
            targetLang: targetLang
          })
        });
      } catch (error) {
        console.error('Vocabulary save error:', error);
      }
    }
  };

  // Remove word from vocabulary
  const handleRemoveFromVocabulary = async (id) => {
    const itemToRemove = vocabulary.find(item => item.id === id);
    setVocabulary(vocabulary.filter(item => item.id !== id));

    try {
      await fetch(`http://localhost:5000/api/vocabulary/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Vocabulary delete error:', error);
      if (itemToRemove) {
        setVocabulary(prev => [...prev, itemToRemove]);
      }
    }
  };

  // Extract words from transcript
  const getTranscriptWords = () => {
    if (!transcript) return [];
    return transcript.split(/[\s\n,.!?]+/).filter(word => word.length > 2).slice(0, 8);
  };

  // Clear all
  const handleClear = () => {
    setAudioFile(null);
    setRecordedBlob(null);
    setTranslatedAudio(null);
    setTranscript('');
    setFeedback({ rating: null, thumbs: null });
    setConfidence(null);
    if (isRecording) stopRecording();
  };

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const hasAudioInput = audioFile || recordedBlob;

  return (
    <div className="speech-translate fade-in">
      <h1>🎤 Speech Translator</h1>

      <div className="speech-container">
        {/* Language Controls */}
        <div className="speech-controls">
          <div className="input-group">
            <label>Source Language</label>
            <select 
              className="select" 
              value={sourceLang} 
              onChange={(e) => setSourceLang(e.target.value)}
              aria-label="Select source language"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Bengali</option>
              <option>Marathi</option>
            </select>
          </div>

          <div className="input-group">
            <label>Target Language</label>
            <select 
              className="select" 
              value={targetLang} 
              onChange={(e) => setTargetLang(e.target.value)}
              aria-label="Select target language"
            >
              <option>Hindi</option>
              <option>English</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Bengali</option>
              <option>Marathi</option>
            </select>
          </div>

          <div className="input-group">
            <label>Domain</label>
            <select 
              className="select" 
              value={domain} 
              onChange={(e) => setDomain(e.target.value)}
              aria-label="Select domain"
            >
              <option>General</option>
              <option>Welding</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
            </select>
          </div>
        </div>

        {/* Audio Input Section */}
        <div className="card audio-input-section">
          <h3>Audio Input</h3>
          
          <div className="input-options">
            {/* File Upload */}
            <div className="upload-area2">
              <input
                type="file"
                id="audio-upload"
                accept=".mp3,.wav,.ogg,audio/*"
                onChange={handleFileUpload}
                className="file-input"
                aria-label="Upload audio file"
              />
              <label htmlFor="audio-upload" className="upload-label">
                <Upload size={24} />
                <span>Upload Audio File</span>
                <span className="upload-hint">MP3, WAV, OGG</span>
              </label>
            </div>

            <div className="input-divider">OR</div>

            {/* Record Audio */}
            <div className="record-area">
              <button
                className={`record-btn ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                <Mic size={24} />
                <span>{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
              </button>
              {isRecording && (
                <div className="recording-indicator">
                  <span className="recording-pulse"></span>
                  <span className="recording-time">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Audio Status */}
          {audioFile && (
            <div className="audio-status">
              <Volume2 size={20} />
              <span className="status-text">File: {audioFile.name}</span>
              <button className="remove-btn" onClick={() => setAudioFile(null)} aria-label="Remove file">
                <X size={16} />
              </button>
            </div>
          )}

          {recordedBlob && !isRecording && (
            <div className="audio-status">
              <Volume2 size={20} />
              <span className="status-text">Recording: {formatTime(recordingTime)}</span>
              <button className="remove-btn" onClick={() => setRecordedBlob(null)} aria-label="Remove recording">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="speech-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleTranslate}
            disabled={!hasAudioInput || isProcessing}
            aria-label="Translate audio"
          >
            {isProcessing ? (
              <>
                <div className="loading-spinner" />
                Processing...
              </>
            ) : (
              <>
                <Languages size={20} />
                Translate Audio
                <ArrowRight size={20} />
              </>
            )}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleClear}
            aria-label="Clear all"
          >
            Clear
          </button>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="ai-status processing">
            <Sparkles size={20} />
            <span>⏳ Translating audio... AI is analyzing speech and context...</span>
          </div>
        )}

        {/* Translation Output */}
        {translatedAudio && !isProcessing && (
          <>
            <div className="ai-status success">
              <span className="badge badge-success">Translation Complete</span>
              {confidence && <span>Confidence: {confidence}%</span>}
            </div>

            {/* Audio Player */}
            <div className="card audio-output-section">
              <h3>Translated Audio</h3>
              <div className="audio-player-container">
                <audio
                  ref={audioPlayerRef}
                  src={translatedAudio}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <button className="play-btn" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>
                <div className="player-info">
                  <span className="player-label">Click to {isPlaying ? 'pause' : 'play'} translated audio</span>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="card transcript-section">
              <h3>Transcript</h3>
              <div className="transcript-text">{transcript}</div>
            </div>

            {/* Feedback Section */}
            <div className="card feedback-section">
              <h3>Rate This Translation</h3>
              <div className="feedback-controls">
                <div className="thumbs-feedback">
                  <button
                    className={`feedback-btn ${feedback.thumbs === 'up' ? 'active' : ''}`}
                    onClick={() => handleFeedback('thumbs', 'up')}
                    aria-label="Rate as helpful"
                  >
                    <ThumbsUp size={20} />
                  </button>
                  <button
                    className={`feedback-btn ${feedback.thumbs === 'down' ? 'active' : ''}`}
                    onClick={() => handleFeedback('thumbs', 'down')}
                    aria-label="Rate as not helpful"
                  >
                    <ThumbsDown size={20} />
                  </button>
                </div>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star-btn ${feedback.rating >= star ? 'filled' : ''}`}
                      onClick={() => handleFeedback('rating', star)}
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vocabulary Section */}
            <div className="card vocabulary-section">
              <h3>Vocabulary</h3>
              <p className="vocabulary-description">Add words from the transcript to your vocabulary list</p>
              
              <div className="vocabulary-suggestions">
                {getTranscriptWords().map((word, index) => (
                  <div key={index} className="vocab-suggestion-item">
                    <span className="vocab-word">{word}</span>
                    <button
                      className={`vocab-add-btn ${recentlyAdded === word ? 'added' : ''}`}
                      onClick={() => handleAddToVocabulary(word)}
                      disabled={vocabulary.some(item => item.word === word)}
                      aria-label={`Add ${word} to vocabulary`}
                    >
                      {recentlyAdded === word || vocabulary.some(item => item.word === word) ? (
                        <Check size={16} />
                      ) : (
                        <Plus size={16} />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {vocabulary.length > 0 && (
                <div className="vocabulary-list">
                  <h4>My Vocabulary ({vocabulary.length})</h4>
                  <div className="vocab-items">
                    {vocabulary.map((item) => (
                      <div key={item.id} className="vocab-item">
                        <div className="vocab-item-content">
                          <span className="vocab-item-word">{item.word}</span>
                          <span className="vocab-item-lang">{item.sourceLang} → {item.targetLang}</span>
                        </div>
                        <button
                          className="vocab-remove-btn"
                          onClick={() => handleRemoveFromVocabulary(item.id)}
                          aria-label={`Remove ${item.word}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}