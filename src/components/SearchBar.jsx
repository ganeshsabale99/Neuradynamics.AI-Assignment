import React, { useState, useEffect } from 'react';
import { useAppDispatch, useDebounce } from '../app/hooks';
import { setSearchTerm } from '../features/products/productsSlice';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  
  useEffect(() => {
    dispatch(setSearchTerm(debouncedValue));
  }, [debouncedValue, dispatch]);
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const clearSearch = () => {
    setInputValue('');
    dispatch(setSearchTerm(''));
  };
  
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="w-full p-2 pl-10 pr-10 text-sm border border-gray-300 rounded-md 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white
                  dark:placeholder-gray-400"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;