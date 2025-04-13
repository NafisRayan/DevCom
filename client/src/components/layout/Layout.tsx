import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Notification from '../common/Notification';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { sidebarOpen, theme } = useSelector((state: RootState) => state.ui);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar onMenuClick={() => dispatch(toggleSidebar())} onThemeToggle={() => dispatch(toggleTheme())} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
      <Notification />
    </div>
  );
};

export default Layout; 