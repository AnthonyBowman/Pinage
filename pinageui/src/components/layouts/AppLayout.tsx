// src/components/layouts/AppLayout.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { routes } from '../../routes';
import { LucideIcon } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Pinage</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {routes.map((route) => {
              const Icon = route.icon as LucideIcon;
              return (
                <li key={route.path}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(route.path);
                    }}
                    className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                      location.pathname === route.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    <Icon 
                      className={`w-5 h-5 mr-3 ${
                        location.pathname === route.path ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    />
                    {route.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">John Doe</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;