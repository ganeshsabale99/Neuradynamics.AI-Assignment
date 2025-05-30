import React from 'react';
import { useAppSelector } from '../app/hooks';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = () => {
  const { mode } = useAppSelector(state => state.theme);
  const location = useLocation();
  

  return (
    <header className={`
      fixed top-0 right-0 left-16 md:left-64 h-16 z-10
      flex items-center justify-between px-4 border-b
      ${mode === 'dark' 
        ? 'bg-gray-800 text-white border-gray-700' 
        : 'bg-white text-gray-800 border-gray-200'}
      transition-all duration-300
    `}>
     
      
      {(location.pathname === '/' || location.pathname === '/products') && (
        <div className="flex-1 mx-4 max-w-md">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Header;