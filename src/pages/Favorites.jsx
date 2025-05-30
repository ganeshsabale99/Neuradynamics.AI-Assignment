import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clearAllFavorites } from '../features/favorites/favoritesSlice';
import ProductCard from '../components/ProductCard';
import NoResults from '../components/NoResults';
import { Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const favorites = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      dispatch(clearAllFavorites());
    }
  };
  
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Heart size={24} className="mr-2 text-red-500" fill="currentColor" />
          <h1 className="text-2xl font-bold dark:text-white">Your Favorites</h1>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center px-3 py-2 text-sm text-red-500 bg-red-50 rounded-md border border-red-200 hover:bg-red-100 dark:bg-gray-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-gray-600"
          >
            <Trash2 size={16} className="mr-1" />
            Clear All
          </button>
        )}
      </div>
      
      {favorites.length > 0 ? (
        <>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            You have {favorites.length} favorite product{favorites.length !== 1 ? 's' : ''}.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <NoResults 
          message="No favorites yet" 
          suggestion="Explore our products and add some to your favorites list."
          onReset={() => {}}
        />
      )}
      
      {favorites.length === 0 && (
        <div className="flex justify-center mt-8">
          <Link
            to="/products"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;