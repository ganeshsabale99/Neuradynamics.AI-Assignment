import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts, fetchCategories, clearFilters } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import NoResults from '../components/NoResults';

const Products = () => {
  const dispatch = useAppDispatch();
  const { 
    filteredItems, 
    status, 
    error, 
    searchTerm, 
    selectedCategory,
    sortOrder
  } = useAppSelector(state => state.products);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  
  const resetFilters = () => {
    dispatch(clearFilters());
  };
  
  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="large" />
      </div>
    );
  }
  
  if (status === 'failed') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error || 'Failed to load products. Please try again later.'}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  const isFiltering = searchTerm || selectedCategory || sortOrder;
  
  return (
    <div className="px-4 py-6">
      <FilterBar />
      
      {isFiltering && (
        <div className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-1">Showing results for:</span>
          {searchTerm && <span className="font-medium mr-2">"{searchTerm}"</span>}
          {selectedCategory && (
            <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2">
              {selectedCategory}
            </span>
          )}
          {sortOrder && (
            <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
            </span>
          )}
        </div>
      )}
      
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NoResults 
          message="No products found" 
          suggestion={`We couldn't find any products matching your ${isFiltering ? 'filters' : 'criteria'}.`}
          onReset={resetFilters}
        />
      )}
    </div>
  );
};

export default Products;