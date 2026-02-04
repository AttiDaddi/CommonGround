import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const { person1, person2, setCurrentPerson, resetAll } = usePreferences();

  const handleSelectPerson = (personNumber) => {
    setCurrentPerson(personNumber);
    navigate('/input');
  };

  const handleFindCommonGround = () => {
    navigate('/results');
  };

  const bothCompleted = person1.completed && person2.completed;

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="app-title">CommonGround</h1>
        <p className="app-tagline">Find what to watch, listen to, and enjoy together</p>

        <div className="instructions">
          <p>Each person adds their favorite movies, actors, YouTubers, streamers, and more.</p>
          <p>Then we'll find recommendations you'll <strong>both</strong> love!</p>
        </div>

        <div className="person-cards">
          <button
            className={`person-card ${person1.completed ? 'completed' : ''}`}
            onClick={() => handleSelectPerson(1)}
          >
            <div className="person-icon">1</div>
            <h2>{person1.name}</h2>
            {person1.completed ? (
              <span className="status complete">Ready!</span>
            ) : (
              <span className="status">Tap to add preferences</span>
            )}
          </button>

          <button
            className={`person-card ${person2.completed ? 'completed' : ''}`}
            onClick={() => handleSelectPerson(2)}
          >
            <div className="person-icon">2</div>
            <h2>{person2.name}</h2>
            {person2.completed ? (
              <span className="status complete">Ready!</span>
            ) : (
              <span className="status">Tap to add preferences</span>
            )}
          </button>
        </div>

        {bothCompleted && (
          <button
            className="find-button"
            onClick={handleFindCommonGround}
          >
            Find Your CommonGround!
          </button>
        )}

        {(person1.completed || person2.completed) && (
          <button className="reset-button" onClick={resetAll}>
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
