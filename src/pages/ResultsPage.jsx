import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';
import { generateRecommendations } from '../services/recommendationEngine';
import './ResultsPage.css';

function ResultsPage() {
  const navigate = useNavigate();
  const { person1, person2, resetAll } = usePreferences();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!person1.completed || !person2.completed) {
      navigate('/');
      return;
    }

    // Simulate a brief loading state for effect
    const timer = setTimeout(() => {
      const recommendations = generateRecommendations(person1, person2);
      setResults(recommendations);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [person1, person2, navigate]);

  const handleStartOver = () => {
    resetAll();
    navigate('/');
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'movie': return '🎬';
      case 'youtube': return '📺';
      case 'music': return '🎵';
      case 'stream': return '🎮';
      default: return '✨';
    }
  };

  const formatWarnings = (warnings = []) =>
    warnings
      .map(warning => warning.charAt(0).toUpperCase() + warning.slice(1))
      .join(', ');

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading-container">
          <div className="loading-animation">
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
            <div className="pulse-ring delay-2"></div>
          </div>
          <h2>Finding Your CommonGround...</h2>
          <p>Analyzing {person1.name}'s and {person2.name}'s preferences</p>
        </div>
      </div>
    );
  }

  if (!results || results.recommendations.length === 0) {
    return (
      <div className="results-page">
        <div className="no-results">
          <h2>No Matches Found</h2>
          <p>We couldn't find any common ground between your preferences. Try adding more interests!</p>
          <button className="primary-button" onClick={handleStartOver}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Your CommonGround</h1>
        <p className="results-subtitle">
          We found {results.recommendations.length} recommendations for {person1.name} & {person2.name}!
        </p>
      </div>

      {results.stats.totalOverlaps > 0 && (
        <div className="overlaps-banner">
          <span className="overlap-icon">🎯</span>
          <span>You have {results.stats.totalOverlaps} direct overlap{results.stats.totalOverlaps > 1 ? 's' : ''} in your interests!</span>
        </div>
      )}

      <div className="recommendations-list">
        {results.recommendations.map((rec, index) => (
          <div key={index} className="recommendation-card">
            <div className="card-header">
              <span className="media-icon">{getMediaIcon(rec.type)}</span>
              <div className="card-title-section">
                <h3>{rec.title}</h3>
                {rec.year && <span className="year">{rec.year}</span>}
              </div>
              <div className="match-score">
                <div className="score-circle">
                  <span className="score-value">{rec.matchScore}%</span>
                </div>
                <span className="score-label">Match</span>
              </div>
            </div>

            {rec.genres && (
              <div className="genre-tags">
                {rec.genres.map((genre, i) => (
                  <span key={i} className="genre-tag">{genre}</span>
                ))}
              </div>
            )}

            <p className="description">{rec.description}</p>

            {rec.warnings && rec.warnings.length > 0 && (
              <div className="warning-box">
                <span className="warning-label">Heads up!</span>
                <span className="warning-text">
                  We noticed mentions of {formatWarnings(rec.warnings)} in this recommendation.
                </span>
              </div>
            )}

            <div className="explanation">
              <span className="why-label">Why this works:</span>
              <span className="why-text">{rec.explanation}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <button className="secondary-button" onClick={handleStartOver}>
          Start Over
        </button>
        <button className="primary-button" onClick={() => navigate('/')}>
          Adjust Preferences
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
