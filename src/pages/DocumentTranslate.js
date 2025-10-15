import { useState } from 'react';
import { FileUp, FileDown, Loader2, CheckCircle, ThumbsUp, ThumbsDown, Upload, X } from 'lucide-react';
import './DocumentTranslate.css';

const BACKEND_URL = 'http://localhost:5000';
const API = `${BACKEND_URL}/api`;

export default function DocumentTranslate() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [domain, setDomain] = useState('General');
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [translationComplete, setTranslationComplete] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFilename, setDownloadFilename] = useState('');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({ thumbs: null });
  const [isDragging, setIsDragging] = useState(false);

  const langMap = {
    English: 'en',
    Hindi: 'hi',
    Tamil: 'ta',
    Telugu: 'te',
    Bengali: 'bn',
    Marathi: 'mr'
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['pdf', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      setError('Please select a PDF or DOCX file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError('');
    setTranslationComplete(false);
    setDownloadUrl('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleTranslate = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setIsProcessing(true);
    setError('');
    setTranslationComplete(false);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('sourceLang', langMap[sourceLang] || 'en');
      formData.append('targetLang', langMap[targetLang] || 'hi');
      formData.append('domain', domain);
      formData.append('outputFormat', outputFormat);

      const response = await fetch(`${API}/translate-document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Translation failed');
      }

      const data = await response.json();
      setDownloadUrl(`${BACKEND_URL}${data.downloadUrl}`);
      setDownloadFilename(data.filename);
      setTranslationComplete(true);
      setIsProcessing(false);

    } catch (err) {
      console.error('Translation error:', err);
      setError(err.message || 'Translation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
  if (!downloadUrl) return;

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = downloadFilename;  // filename user will see
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const handleClear = () => {
    setSelectedFile(null);
    setTranslationComplete(false);
    setDownloadUrl('');
    setDownloadFilename('');
    setError('');
    setFeedback({ thumbs: null });
    setIsProcessing(false);
  };

  const handleFeedback = (type) => {
    setFeedback({ thumbs: feedback.thumbs === type ? null : type });
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError('');
  };

  return (
    <div className="document-translate fade-in" data-testid="document-translate-page">
      <h1 data-testid="page-title">Document Translation</h1>

      <div className="translate-container">
        {/* Controls */}
        <div className="translate-controls">
          <div className="input-group">
            <label>Source Language</label>
            <select
              className="select"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              disabled={isProcessing}
              data-testid="source-lang-select"
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
              disabled={isProcessing}
              data-testid="target-lang-select"
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
              disabled={isProcessing}
              data-testid="domain-select"
            >
              <option>General</option>
              <option>Welding</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
            </select>
          </div>

          <div className="input-group">
            <label>Output Format</label>
            <select
              className="select"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              disabled={isProcessing}
              data-testid="output-format-select"
            >
              <option value="pdf">PDF</option>
              <option value="docx">Word DOCX</option>
            </select>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="card upload-card">
          <h3>Upload Document</h3>
          
          <div
            className={`upload-area ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            data-testid="upload-area"
          >
            {!selectedFile ? (
              <>
                <Upload size={48} className="upload-icon" />
                <p className="upload-text">Drag & drop your document here</p>
                <p className="upload-subtext">or</p>
                <label htmlFor="file-input" className="upload-button">
                  <FileUp size={20} />
                  Choose File
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  data-testid="file-input"
                />
                <p className="upload-hint">Supported formats: PDF, DOCX (Max 10MB)</p>
              </>
            ) : (
              <div className="file-preview" data-testid="file-preview">
                <div className="file-icon">
                  {selectedFile.name.endsWith('.pdf') ? '📄' : '📝'}
                </div>
                <div className="file-info">
                  <p className="file-name" data-testid="file-name">{selectedFile.name}</p>
                  <p className="file-size" data-testid="file-size">{formatFileSize(selectedFile.size)}</p>
                </div>
                <button
                  className="remove-file-btn"
                  onClick={removeFile}
                  disabled={isProcessing}
                  data-testid="remove-file-btn"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="translate-actions">
          <button
            className="btn btn-primary"
            onClick={handleTranslate}
            disabled={!selectedFile || isProcessing}
            data-testid="translate-btn"
          >
            {isProcessing ? (
              <>
                <Loader2 className="loading-spinner" size={20} />
                Processing...
              </>
            ) : (
              <>
                <FileUp size={20} />
                Translate Document
              </>
            )}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={isProcessing}
            data-testid="clear-btn"
          >
            Clear
          </button>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="ai-status processing" data-testid="processing-status">
            <Loader2 className="spinning" size={20} />
            <span>Processing document... Extracting text, translating, and recreating format...</span>
          </div>
        )}

        {/* Success Status */}
        {translationComplete && (
          <>
            <div className="ai-status success" data-testid="success-status">
              <CheckCircle size={20} />
              <span>✅ Translation Complete!</span>
            </div>

            {/* Download Section */}
            <div className="card download-card">
              <h3>Download Translated Document</h3>
              <button
                className="btn btn-download"
                onClick={handleDownload}
                data-testid="download-btn"
              >
                <FileDown size={20} />
                Download {outputFormat.toUpperCase()}
              </button>
              <p className="download-info">File: {downloadFilename}</p>
            </div>

            {/* Feedback Section */}
            <div className="card feedback-section">
              <h3>Was this translation accurate?</h3>
              <div className="feedback-controls">
                <button
                  className={`feedback-btn ${feedback.thumbs === 'up' ? 'active' : ''}`}
                  onClick={() => handleFeedback('up')}
                  data-testid="feedback-thumbs-up"
                >
                  <ThumbsUp size={20} />
                  <span>Yes</span>
                </button>
                <button
                  className={`feedback-btn ${feedback.thumbs === 'down' ? 'active' : ''}`}
                  onClick={() => handleFeedback('down')}
                  data-testid="feedback-thumbs-down"
                >
                  <ThumbsDown size={20} />
                  <span>No</span>
                </button>
              </div>
              {feedback.thumbs && (
                <p className="feedback-thanks" data-testid="feedback-thanks">
                  Thank you for your feedback!
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}