import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice';
import axios from 'axios';
import { ArrowLeft, Heart, Star, ArrowUpRight } from 'lucide-react';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const isFavorite = favorites.some(item => item.id === Number(id));
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        
        
        const categoryResponse = await axios.get(
          `https://fakestoreapi.com/products/category/${response.data.category}`
        );
        
       
        const related = categoryResponse.data
          .filter(item => item.id !== Number(id))
          .slice(0, 4);
          
        setRelatedProducts(related);
        setError(null);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(Number(id)));
    } else if (product) {
      dispatch(addToFavorites(product));
    }
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="large" />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error || 'Product not found'}</p>
        <button
          onClick={goBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6">
      <button
        onClick={goBack}
        className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Products
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border dark:border-gray-700 border-gray-200">
        <div className="flex flex-col lg:flex-row">
          
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-700 p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-80 object-contain" 
            />
          </div>
          
         
          <div className="w-full lg:w-1/2 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {product.category}
              </span>
              
              <div className="flex items-center">
                <Star size={18} className="text-yellow-500 fill-current" />
                <span className="ml-1 font-medium">
                  {product.rating.rate} <span className="text-gray-500 dark:text-gray-400">({product.rating.count} reviews)</span>
                </span>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-4 dark:text-white">{product.title}</h1>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
            
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              {formatPrice(product.price)}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleToggleFavorite}
                className={`
                  flex-1 px-6 py-3 flex items-center justify-center rounded-md
                  ${isFavorite 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'}
                  transition-colors
                `}
              >
                <Heart size={18} className="mr-2" fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
     
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 dark:text-white">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <div 
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border dark:border-gray-700 border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="h-40 w-full flex items-center justify-center mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-full object-contain" 
                    />
                  </div>
                  
                  <h3 className="text-md font-semibold mb-2 text-center line-clamp-2 dark:text-white">
                    {item.title}
                  </h3>
                  
                  <p className="font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {formatPrice(item.price)}
                  </p>
                  
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    View Details
                    <ArrowUpRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;