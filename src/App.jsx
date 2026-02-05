import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PreferencesProvider } from './context/PreferencesContext';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

function App() {
  const baseUrl = import.meta.env.BASE_URL === '/'
    ? '/'
    : import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <PreferencesProvider>
      <Router basename={baseUrl}>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </PreferencesProvider>
  );
}

export default App;
