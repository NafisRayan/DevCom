import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  MegaphoneIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Leads', href: '/leads', icon: UserGroupIcon },
  { name: 'Campaigns', href: '/campaigns', icon: MegaphoneIcon },
  { name: 'Landing Pages', href: '/landing-pages', icon: DocumentDuplicateIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-base-100 border-r border-base-200`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-base-200 group ${
                    isActive ? 'bg-primary text-primary-content' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 