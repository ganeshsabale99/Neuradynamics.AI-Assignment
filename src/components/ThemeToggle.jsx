import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleTheme } from '../features/theme/themeSlice';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ iconOnly = false }) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.theme);
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center p-2 rounded-md
        ${mode === 'dark' 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
        transition-colors duration-200
      `}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      {!iconOnly && (
        <span className="ml-2">{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
};

export default ThemeToggle;