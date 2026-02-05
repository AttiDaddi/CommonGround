import { createContext, useContext, useState } from 'react';

const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const [person1, setPerson1] = useState({
    name: 'Person 1',
    movies: [],
    actors: [],
    directors: [],
    genres: [],
    youtubers: [],
    streamers: [],
    musicians: [],
    triggers: [],
    completed: false
  });

  const [person2, setPerson2] = useState({
    name: 'Person 2',
    movies: [],
    actors: [],
    directors: [],
    genres: [],
    youtubers: [],
    streamers: [],
    musicians: [],
    triggers: [],
    completed: false
  });

  const [currentPerson, setCurrentPerson] = useState(null);

  const updatePerson1 = (data) => {
    setPerson1(prev => ({ ...prev, ...data }));
  };

  const updatePerson2 = (data) => {
    setPerson2(prev => ({ ...prev, ...data }));
  };

  const resetAll = () => {
    setPerson1({
      name: 'Person 1',
      movies: [],
      actors: [],
      directors: [],
      genres: [],
      youtubers: [],
      streamers: [],
      musicians: [],
      triggers: [],
      completed: false
    });
    setPerson2({
      name: 'Person 2',
      movies: [],
      actors: [],
      directors: [],
      genres: [],
      youtubers: [],
      streamers: [],
      musicians: [],
      triggers: [],
      completed: false
    });
    setCurrentPerson(null);
  };

  return (
    <PreferencesContext.Provider value={{
      person1,
      person2,
      currentPerson,
      setCurrentPerson,
      updatePerson1,
      updatePerson2,
      resetAll
    }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
