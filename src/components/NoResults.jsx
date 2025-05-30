import React from 'react';
import { SearchX } from 'lucide-react';

const NoResults = ({ message, suggestion, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX size={64} className="mb-4 text-gray-400 dark:text-gray-500" />
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{message || 'No results found'}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {suggestion || 'Try adjusting your search or filter criteria to find what you\'re looking for.'}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default NoResults;