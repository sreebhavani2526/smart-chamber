
import React from 'react';
import { Home, BarChart2, PlusCircle, Settings, Target } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getItemClass = (path: string) => {
    return currentPath === path 
      ? "flex flex-col items-center p-2 text-main"
      : "flex flex-col items-center p-2 text-neutral";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex justify-around items-center p-2 z-10">
      <Link to="/" className={getItemClass('/')}>
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/stats" className={getItemClass('/stats')}>
        <BarChart2 size={22} />
        <span className="text-xs mt-1">Stats</span>
      </Link>
      <div className="relative -top-6">
        <button className="bg-main hover:bg-main-dark text-white rounded-full p-4 transition-colors shadow-lg">
          <PlusCircle size={24} />
        </button>
      </div>
      <Link to="/goals" className={getItemClass('/goals')}>
        <Target size={22} />
        <span className="text-xs mt-1">Goals</span>
      </Link>
      <Link to="/profile" className={getItemClass('/profile')}>
        <Settings size={22} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNav;
