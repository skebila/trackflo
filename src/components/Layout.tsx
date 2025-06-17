
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Activity, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Activity', href: '/activity', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out user');
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-200 ease-in-out
        ${sidebarOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo and brand */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 min-h-[64px]">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              {sidebarOpen && (
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">TrackFlow</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden dark:text-gray-300 dark:hover:text-gray-100 flex-shrink-0"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium transition-colors group relative
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                    }
                    ${!sidebarOpen ? 'justify-center' : ''}
                  `}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${sidebarOpen ? 'mr-3' : ''}`} />
                  {sidebarOpen && (
                    <span className="truncate">{item.name}</span>
                  )}
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className={`flex items-center ${sidebarOpen ? 'space-x-3 mb-3' : 'justify-center mb-2'}`}>
              <img
                src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=john.doe"
                alt="User avatar"
                className="w-8 h-8 bg-gray-200 flex-shrink-0"
              />
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@trackflow.dev</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={`${sidebarOpen ? 'w-full justify-start' : 'w-8 h-8 p-0'} text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100`}
              onClick={handleLogout}
              title={!sidebarOpen ? 'Logout' : undefined}
            >
              <LogOut className={`h-4 w-4 ${sidebarOpen ? 'mr-2' : ''}`} />
              {sidebarOpen && 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="dark:text-gray-300 dark:hover:text-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            {/* Search and notifications can be added here */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
