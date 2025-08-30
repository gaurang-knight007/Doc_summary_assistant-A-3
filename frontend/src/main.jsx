import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { ThemeProvider } from './components/ThemeContext.jsx';
import ThemeToggleButton from './components/ThemeToggleButton.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ThemeToggleButton />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

