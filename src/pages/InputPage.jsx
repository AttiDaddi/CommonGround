import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../context/PreferencesContext';
import TagInput from '../components/TagInput';
import './InputPage.css';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
];

function InputPage() {
  const navigate = useNavigate();
  const { currentPerson, person1, person2, updatePerson1, updatePerson2 } = usePreferences();

  const currentData = currentPerson === 1 ? person1 : person2;
  const updateCurrent = currentPerson === 1 ? updatePerson1 : updatePerson2;

  const [name, setName] = useState(currentData.name);
  const [movies, setMovies] = useState(currentData.movies);
  const [actors, setActors] = useState(currentData.actors);
  const [directors, setDirectors] = useState(currentData.directors);
  const [selectedGenres, setSelectedGenres] = useState(currentData.genres);
  const [youtubers, setYoutubers] = useState(currentData.youtubers);
  const [streamers, setStreamers] = useState(currentData.streamers);
  const [musicians, setMusicians] = useState(currentData.musicians);

  if (!currentPerson) {
    navigate('/');
    return null;
  }

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSubmit = () => {
    updateCurrent({
      name: name || `Person ${currentPerson}`,
      movies,
      actors,
      directors,
      genres: selectedGenres,
      youtubers,
      streamers,
      musicians,
      completed: true
    });
    navigate('/');
  };

  const hasEnoughData = movies.length > 0 || actors.length > 0 ||
    directors.length > 0 || selectedGenres.length > 0;

  return (
    <div className="input-page">
      <div className="input-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1>Person {currentPerson}'s Preferences</h1>
      </div>

      <div className="input-content">
        <div className="input-section">
          <label htmlFor="name">Your Name (optional)</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Person ${currentPerson}`}
            className="name-input"
          />
        </div>

        <div className="section-divider">
          <span>Movies & TV</span>
        </div>

        <TagInput
          label="Favorite Movies or TV Shows"
          placeholder="e.g., The Matrix, Breaking Bad..."
          tags={movies}
          setTags={setMovies}
        />

        <TagInput
          label="Favorite Actors"
          placeholder="e.g., Keanu Reeves, Sandra Bullock..."
          tags={actors}
          setTags={setActors}
        />

        <TagInput
          label="Favorite Directors"
          placeholder="e.g., Christopher Nolan, Greta Gerwig..."
          tags={directors}
          setTags={setDirectors}
        />

        <div className="input-section">
          <label>Genres You Love</label>
          <div className="genre-grid">
            {GENRES.map(genre => (
              <button
                key={genre}
                className={`genre-chip ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="section-divider">
          <span>Online Content</span>
        </div>

        <TagInput
          label="Favorite YouTubers"
          placeholder="e.g., Kurzgesagt, Marques Brownlee..."
          tags={youtubers}
          setTags={setYoutubers}
        />

        <TagInput
          label="Favorite Streamers"
          placeholder="e.g., Pokimane, Shroud..."
          tags={streamers}
          setTags={setStreamers}
        />

        <div className="section-divider">
          <span>Music</span>
        </div>

        <TagInput
          label="Favorite Musicians / Bands"
          placeholder="e.g., Daft Punk, Taylor Swift..."
          tags={musicians}
          setTags={setMusicians}
        />

        <button
          className={`submit-button ${!hasEnoughData ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!hasEnoughData}
        >
          {hasEnoughData ? "I'm Done!" : "Add at least one preference"}
        </button>
      </div>
    </div>
  );
}

export default InputPage;
