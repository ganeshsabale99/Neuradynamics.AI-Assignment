import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice';
import { Heart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);
  const isFavorite = favorites.some(item => item.id === product.id);
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-800 bg-white border dark:border-gray-700 border-gray-200">
      <Link to={`/product/${product.id}`} className="block h-full">
       
        <button
          onClick={toggleFavorite}
          className={`
            absolute top-2 right-2 z-10 p-2 rounded-full 
            ${isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'}
            transition-colors duration-200 hover:scale-110
          `}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        
        
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img 
            src={product.image} 
            alt={product.title} 
            className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        
       
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold line-clamp-2 dark:text-white">
            {product.title}
          </h2>
          
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formattedPrice}
            </p>
            
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium dark:text-gray-300">
                {product.rating.rate} <span className="text-gray-500 dark:text-gray-400">({product.rating.count})</span>
              </span>
            </div>
          </div>
          
          <div className="mt-3">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;