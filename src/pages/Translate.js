import { useState } from 'react';
import { Languages, ArrowRight, Sparkles, ThumbsUp, ThumbsDown, Plus, Star, Check } from 'lucide-react';
import './Translate.css';

export default function Translate() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [vocabulary, setVocabulary] = useState([]);
  const [feedback, setFeedback] = useState({ rating: null, thumbs: null });
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [domain, setDomain] = useState('General');

  // Real API call to Flask backend
  const handleTranslate = async () => {
    setIsProcessing(true);
    setTranslatedText('');
    setFeedback({ rating: null, thumbs: null });
    
    try {

      const langMap = {
              English: 'en',
              Hindi: 'hi',
              Tamil: 'ta',
              Telugu: 'te',
              Bengali: 'bn',
              Marathi: 'mr'
            };
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          sourceLang: langMap[sourceLang] || 'en',
          targetLang: langMap[targetLang] || 'hi',
          domain: domain,
          userId: 'demo-user-001'
        })
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      setTranslatedText(data.translatedText);
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error: Unable to translate. Please check if the backend server is running on http://localhost:5000');
      setIsProcessing(false);
    }
  };

  // Add word/phrase to vocabulary - Real API call
  const handleAddToVocabulary = async (word) => {
    if (!vocabulary.some(item => item.word === word)) {
      const newVocabItem = {
        id: Date.now(),
        word: word,
        sourceLang: sourceLang,
        targetLang: targetLang,
        addedAt: new Date().toISOString()
      };
      
      // Optimistic update
      setVocabulary([...vocabulary, newVocabItem]);
      setRecentlyAdded(word);
      setTimeout(() => setRecentlyAdded(null), 2000);
      
      // Sync with backend
      try {
        const response = await fetch('http://localhost:5000/api/vocabulary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'demo-user-001',  // In production, use actual user ID
            word: word,
            sourceLang: sourceLang,
            targetLang: targetLang
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to save vocabulary');
        }
        
        const data = await response.json();
        // Update with server-generated ID
        setVocabulary(prev => prev.map(item => 
          item.id === newVocabItem.id ? { ...item, id: data.vocabularyId } : item
        ));
        
      } catch (error) {
        console.error('Vocabulary save error:', error);
        // Revert on error
        setVocabulary(prev => prev.filter(item => item.id !== newVocabItem.id));
      }
    }
  };

  // Remove word from vocabulary - Real API call
  const handleRemoveFromVocabulary = async (id) => {
    // Optimistic update
    const itemToRemove = vocabulary.find(item => item.id === id);
    setVocabulary(vocabulary.filter(item => item.id !== id));
    
    // Sync with backend
    try {
      const response = await fetch(`http://localhost:5000/api/vocabulary/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete vocabulary');
      }
      
    } catch (error) {
      console.error('Vocabulary delete error:', error);
      // Revert on error
      if (itemToRemove) {
        setVocabulary(prev => [...prev, itemToRemove]);
      }
    }
  };

  // Handle feedback submission - Real API call
  const handleFeedback = async (type, value) => {
    const newFeedback = { ...feedback };
    
    if (type === 'thumbs') {
      newFeedback.thumbs = feedback.thumbs === value ? null : value;
    } else if (type === 'rating') {
      newFeedback.rating = feedback.rating === value ? null : value;
    }
    
    setFeedback(newFeedback);
    
    // Submit feedback to backend
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user-001',  // In production, use actual user ID
          translationId: null,  // You can track this from translation response
          thumbs: newFeedback.thumbs,
          rating: newFeedback.rating
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      console.log('Feedback submitted successfully');
      
    } catch (error) {
      console.error('Feedback submission error:', error);
    }
  };

  // Extract words from translated text for vocabulary suggestions
  const getTranslatedWords = () => {
    if (!translatedText) return [];
    // Simple word extraction (in production, use proper tokenization)
    return translatedText.split(/[\s\n,.!?]+/).filter(word => word.length > 2).slice(0, 8);
  };

  return (
    <div className="translate fade-in">
      <h1>Multilingual Translation</h1>

      <div className="translate-container">
        <div className="translate-controls">
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

        <div className="translate-grid">
          <div className="card translate-panel">
            <h3>Source Text</h3>
            <textarea
              className="textarea"
              placeholder="Enter text to translate..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              style={{ minHeight: '300px' }}
              aria-label="Source text input"
            />
          </div>

          <div className="card translate-panel">
            <h3>Translation</h3>
            <textarea
              className="textarea"
              placeholder="Translation will appear here..."
              value={translatedText}
              readOnly
              style={{ minHeight: '300px', background: '#F9FAFB' }}
              aria-label="Translated text output"
            />
          </div>
        </div>

        <div className="translate-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleTranslate} 
            disabled={!sourceText || isProcessing}
            aria-label="Translate text"
          >
            {isProcessing ? (
              <>
                <div className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                Processing...
              </>
            ) : (
              <>
                <Languages size={20} />
                Translate
                <ArrowRight size={20} />
              </>
            )}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => { 
              setSourceText(''); 
              setTranslatedText(''); 
              setFeedback({ rating: null, thumbs: null });
            }}
            aria-label="Clear all fields"
          >
            Clear
          </button>
        </div>

        {isProcessing && (
          <div className="ai-status processing">
            <Sparkles size={20} />
            <span>AI is analyzing context and translating semantically...</span>
          </div>
        )}

        {translatedText && !isProcessing && (
          <>
            <div className="ai-status">
              <span className="badge badge-success">Semantic Translation</span>
              <span>Translation preserves meaning and context</span>
            </div>

            {/* Feedback Section */}
            <div className="card feedback-section">
              <h3>Rate This Translation</h3>
              <div className="feedback-controls">
                <div className="thumbs-feedback">
                  <button
                    className={`feedback-btn ${feedback.thumbs === 'up' ? 'active' : ''}`}
                    onClick={() => handleFeedback('thumbs', 'up')}
                    aria-label="Rate translation as helpful"
                  >
                    <ThumbsUp size={20} />
                  </button>
                  <button
                    className={`feedback-btn ${feedback.thumbs === 'down' ? 'active' : ''}`}
                    onClick={() => handleFeedback('thumbs', 'down')}
                    aria-label="Rate translation as not helpful"
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
              <p className="vocabulary-description">Add words to your personal vocabulary list for later review</p>
              
              <div className="vocabulary-suggestions">
                {getTranslatedWords().map((word, index) => (
                  <div key={index} className="vocab-suggestion-item">
                    <span className="vocab-word">{word}</span>
                    <button
                      className={`vocab-add-btn ${recentlyAdded === word ? 'added' : ''}`}
                      onClick={() => handleAddToVocabulary(word)}
                      disabled={vocabulary.some(item => item.word === word)}
                      aria-label={`Add ${word} to vocabulary`}
                    >
                      {recentlyAdded === word ? (
                        <Check size={16} />
                      ) : vocabulary.some(item => item.word === word) ? (
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
                          aria-label={`Remove ${item.word} from vocabulary`}
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