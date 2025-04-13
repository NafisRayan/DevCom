import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bars3Icon, SunIcon, MoonIcon, BellIcon } from '@heroicons/react/24/outline';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

interface NavbarProps {
  onMenuClick: () => void;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onThemeToggle }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-200">
      <div className="flex-1">
        <button className="btn btn-ghost" onClick={onMenuClick}>
          <Bars3Icon className="h-6 w-6" />
        </button>
        <Link to="/" className="btn btn-ghost text-xl">
          DevLeadConnect
        </Link>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost btn-circle" onClick={onThemeToggle}>
          {theme === 'light' ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <BellIcon className="h-5 w-5" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                alt={user?.name}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 