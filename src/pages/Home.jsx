import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts, fetchCategories } from '../features/products/productsSlice';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Package, 
  ArrowRight 
} from 'lucide-react';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, categories } = useAppSelector(state => state.products);
  const favorites = useAppSelector(state => state.favorites);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  
 
  const featuredProducts = [...items]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);
  
 
  const stats = [
    {
      label: 'Products',
      value: items.length,
      icon: <ShoppingBag size={24} className="text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-400',
      link: '/products'
    },
    {
      label: 'Favorites',
      value: favorites.length,
      icon: <Heart size={24} className="text-red-500" />,
      color: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-700 dark:text-red-400',
      link: '/favorites'
    },
    {
      label: 'Top Rated',
      value: items.length > 0 ? `${Math.max(...items.map(item => item.rating.rate))}★` : '0★',
      icon: <TrendingUp size={24} className="text-emerald-500" />,
      color: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      link: '/products'
    }
  ];
  
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
        <p className="text-gray-700 dark:text-gray-300">{error || 'Failed to load dashboard data.'}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Welcome to G&S Shoppe Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of products, filter by category, or add items to your favorites.
        </p>
      </div>
      
   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <Link 
            key={index}
            to={stat.link}
            className={`
              ${stat.color} 
              p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700
              hover:shadow-md transition-shadow
            `}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold mt-1 ${stat.textColor}`}>{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </Link>
        ))}
      </div>
     
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Featured Products</h2>
          <Link 
            to="/products" 
            className="text-blue-600 dark:text-blue-400 flex items-center hover:underline"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;