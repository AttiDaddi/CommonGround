import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PreferencesProvider } from './context/PreferencesContext';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import ResultsPage from './pages/ResultsPage';
import './App.css';

function App() {
  return (
    <PreferencesProvider>
      <Router>
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
