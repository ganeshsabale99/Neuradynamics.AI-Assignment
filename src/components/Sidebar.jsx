import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  Home,
  ShoppingBag,
  Heart,
  Menu,
  X,

} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useWindowSize } from '../app/hooks';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const { mode } = useAppSelector(state => state.theme);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  React.useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  const activeStyle =
    "bg-blue-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400";


  const sidebarBg = mode === 'dark'
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-800 border-r border-gray-200';

  return (
    <>

      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}


      <div
        className={`
          ${sidebarBg}
          ${isCollapsed ? 'w-16' : 'w-64'} 
          fixed h-screen transition-all duration-300 ease-in-out z-20
          flex flex-col
        `}
      >

        <div className="flex items-center justify-between p-4 h-16">
          {!isCollapsed && (
            <h1 className="font-bold text-xl">
              <ShoppingBag className="inline-block mr-2\" size={20} />
              G&S Shoppe
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>


        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/"
            className={({ isActive }) => `
              flex items-center p-3 rounded-md transition-colors
              ${isCollapsed ? 'justify-center' : ''}
              ${isActive ? activeStyle : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Home size={20} />
            {!isCollapsed && <span className="ml-3">Home</span>}
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => `
              flex items-center p-3 rounded-md transition-colors
              ${isCollapsed ? 'justify-center' : ''}
              ${isActive ? activeStyle : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <ShoppingBag size={20} />
            {!isCollapsed && <span className="ml-3">Products</span>}
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `
              flex items-center p-3 rounded-md transition-colors
              ${isCollapsed ? 'justify-center' : ''}
              ${isActive ? activeStyle : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            <Heart size={20} />
            {!isCollapsed && <span className="ml-3">Favorites</span>}
          </NavLink>
        </nav>


        <div className="p-4 border-t dark:border-gray-700">
          <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
            {!isCollapsed && <span>Theme</span>}
            <ThemeToggle iconOnly={isCollapsed} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;