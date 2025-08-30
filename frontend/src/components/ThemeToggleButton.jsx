import React from 'react';
import { useTheme } from './ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-btn"
      title="Toggle theme"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
};
