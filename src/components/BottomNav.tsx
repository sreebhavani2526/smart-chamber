
import { Home, BarChart2, PlusCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex justify-around items-center p-2 z-10">
      <Link to="/" className="flex flex-col items-center p-2 text-main">
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/stats" className="flex flex-col items-center p-2 text-neutral">
        <BarChart2 size={22} />
        <span className="text-xs mt-1">Stats</span>
      </Link>
      <div className="relative -top-6">
        <button className="bg-main hover:bg-main-dark text-white rounded-full p-4 transition-colors shadow-lg">
          <PlusCircle size={24} />
        </button>
      </div>
      <Link to="/profile" className="flex flex-col items-center p-2 text-neutral">
        <Settings size={22} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNav;
