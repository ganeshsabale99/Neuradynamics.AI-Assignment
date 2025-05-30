import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  setSelectedCategory, 
  setSortOrder, 
  clearFilters 
} from '../features/products/productsSlice';
import { Filter, ArrowUpDown, X } from 'lucide-react';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, sortOrder } = useAppSelector(state => state.products);
  
  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };
  
  const handleSortChange = (order) => {
    dispatch(setSortOrder(order === sortOrder ? null : order));
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  
  const isFiltersActive = selectedCategory || sortOrder;
  
  return (
    <div className="p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center">
          <Filter size={18} className="mr-2 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-semibold dark:text-white">Filters</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
         
          <div className="flex-1 min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSortChange('asc')}
              className={`
                px-3 py-2 text-sm rounded-md border
                ${sortOrder === 'asc' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}
                transition-colors
              `}
            >
              <ArrowUpDown size={16} className="inline mr-1" />
              Price: Low to High
            </button>
            
            <button
              onClick={() => handleSortChange('desc')}
              className={`
                px-3 py-2 text-sm rounded-md border
                ${sortOrder === 'desc' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'}
                transition-colors
              `}
            >
              <ArrowUpDown size={16} className="inline mr-1" />
              Price: High to Low
            </button>
          </div>
          
          
          {isFiltersActive && (
            <button
              onClick={handleClearFilters}
              className="flex items-center px-3 py-2 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 hover:bg-red-100 dark:bg-gray-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-gray-600"
            >
              <X size={16} className="mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;