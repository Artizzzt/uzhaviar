import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Bell, 
  ChevronDown, 
  User, 
  Edit, 
  Home, 
  Settings, 
  HelpCircle, 
  LogOut,
  AlertTriangle,
  Calendar,
  CloudRain,
  TrendingUp,
  FlaskConical
} from 'lucide-react';
import Button from './Button';

const Navbar = ({ variant = 'public', forceProfileOpen = false }) => {
  const { user, logout, notifications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(forceProfileOpen);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const toggleNotifications = () => {
    setIsNotificationOpen(prev => !prev);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileDropdownOpen(prev => !prev);
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsNotificationOpen(false);
    navigate('/');
  };

  const handleNotificationClick = (notif) => {
    setNotifications(prev => 
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );
    setIsNotificationOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (iconName) => {
    switch (iconName) {
      case 'FlaskConical': return FlaskConical;
      case 'AlertTriangle': return AlertTriangle;
      case 'Calendar': return Calendar;
      case 'CloudRain': return CloudRain;
      case 'TrendingUp': return TrendingUp;
      default: return Bell;
    }
  };

  const getNotificationIconStyles = (iconName) => {
    switch (iconName) {
      case 'AlertTriangle': return 'bg-red-50 text-danger';
      case 'CloudRain': return 'bg-blue-50 text-blue-500';
      case 'Calendar': return 'bg-slate-100 text-textdark';
      case 'TrendingUp': return 'bg-green-50 text-primary';
      default: return 'bg-lightgreen text-primary';
    }
  };

  const publicNavLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  const appNavLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Farm Map', path: '/farm-map' },
    { name: 'Smart Spray', path: '/smart-spray' },
    { name: 'Crop Health', path: '/crop-health' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Settings', path: '/settings' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  const handleScroll = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Logo sub-component
  const Logo = () => (
    <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group select-none">
      <div className="bg-primary text-white p-2 rounded-lg flex items-center justify-center shadow-md shadow-green-200 transition-transform duration-200 group-hover:scale-105 shrink-0">
        <Sprout size={22} className="stroke-[2.5]" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-lg text-textdark tracking-tight">Uzhaviyar</span>
        <span className="text-[9px] font-bold text-primary tracking-widest uppercase mt-[-1px]">
          Smart Agriculture
        </span>
      </div>
    </Link>
  );

  return (
    <header ref={navbarRef} className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            {variant === 'public' ? (
              publicNavLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.href.substring(1))}
                  className="text-sm font-medium text-textmuted hover:text-primary hover:bg-lightgreen px-3.5 py-2 rounded-full transition-all duration-200"
                >
                  {link.name}
                </button>
              ))
            ) : (
              appNavLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-textmuted hover:text-primary hover:bg-lightgreen'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {variant === 'public' ? (
  !user && (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate('/sign-in')}
      >
        Sign In
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={() => navigate('/register')}
      >
        Register
      </Button>
    </div>
  )
) : (
              // App variant actions
              <div className="flex items-center gap-4">
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className={`relative p-2 rounded-full hover:bg-slate-50 transition-colors focus:outline-none ${
                      isNotificationOpen ? 'text-primary bg-slate-50' : 'text-textmuted hover:text-primary'
                    }`}
                  >
                    <Bell size={20} className="stroke-[2]" />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white animate-pulse"></span>
                    )}
                  </button>
                  
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-card bg-white shadow-lg border border-slate-100 py-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100 text-xs select-none">
                        <span className="font-extrabold text-textdark uppercase tracking-wider">Notifications</span>
                        {notifications.some(n => !n.read) && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-primary font-bold hover:underline focus:outline-none"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      
                      {/* Scrollable List */}
                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center text-xs text-textmuted select-none">
                            No notifications available
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            const IconComponent = getNotificationIcon(notif.icon);
                            const iconStyles = getNotificationIconStyles(notif.icon);
                            return (
                              <div
                                key={notif.id}
                                onClick={() => handleNotificationClick(notif)}
                                className={`flex items-start gap-3.5 px-4 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                                  !notif.read ? 'bg-green-50/20' : ''
                                }`}
                              >
                                <div className={`p-2 rounded-full shrink-0 ${iconStyles}`}>
                                  <IconComponent size={14} className="stroke-[2.5]" />
                                </div>
                                <div className="flex-1 space-y-0.5 text-left min-w-0">
                                  <div className="flex items-start justify-between gap-1">
                                    <h4 className={`text-xs text-textdark truncate ${!notif.read ? 'font-bold' : 'font-medium'}`}>
                                      {notif.title}
                                    </h4>
                                    {!notif.read && (
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 mt-1.5"></span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-textmuted leading-normal line-clamp-2">
                                    {notif.message}
                                  </p>
                                  <span className="text-[9px] text-slate-400 font-bold block pt-1 select-none">
                                    {notif.timestamp}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile menu */}
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center gap-2 p-1.5 pr-3 hover:bg-slate-50 rounded-full border border-slate-100 transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-textdark truncate max-w-[100px]">{user?.name || 'User'}</span>
                    <ChevronDown size={14} className="text-textmuted" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-card bg-white shadow-lg border border-slate-100 py-1 z-50 overflow-hidden">
                      {/* User Info Block */}
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-full bg-primary bg-opacity-10 text-primary flex items-center justify-center font-bold text-[10px]">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="font-semibold text-textdark truncate">{user?.name || 'Farmer'}</span>
                        </div>
                        <p className="text-textmuted">ID: <span className="font-mono">{user?.id || 'FRM-2026-979'}</span></p>
                        <p className="text-textmuted">Email: <span className="break-all">{user?.email || 'swath@gmail.com'}</span></p>
                        <p className="text-textmuted mt-0.5">Last Login: <span>{user?.lastLogin || '1 Jul 2026, 9:25 am'}</span></p>
                      </div>
                      
                      {/* Menu Options */}
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-textdark hover:bg-lightgreen hover:text-primary transition-colors"
                        >
                          <User size={16} className="text-textmuted" />
                          My Profile
                        </Link>
                        
                        <Link
                          to="/profile" // Edit profile routes to Profile
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-textdark hover:bg-lightgreen hover:text-primary transition-colors"
                        >
                          <Edit size={16} className="text-textmuted" />
                          Edit Profile
                        </Link>
                        
                        <Link
                          to="/farm-map" // My Farm routes to Farm Map
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-textdark hover:bg-lightgreen hover:text-primary transition-colors"
                        >
                          <Home size={16} className="text-textmuted" />
                          My Farm
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-textdark hover:bg-lightgreen hover:text-primary transition-colors"
                        >
                          <Settings size={16} className="text-textmuted" />
                          Settings
                        </Link>
                        
                        <Link
                          to="/contact-us"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-textdark hover:bg-lightgreen hover:text-primary transition-colors"
                        >
                          <HelpCircle size={16} className="text-textmuted" />
                          Help & Support
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-danger hover:bg-red-50 transition-colors border-t border-slate-100 mt-1"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu button toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-textmuted hover:text-primary focus:outline-none"
            >
              <ChevronDown size={24} className={`transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white py-2 px-4 space-y-1">
          {variant === 'public' ? (
            publicNavLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleScroll(link.href.substring(1))}
                className="block w-full text-left px-4 py-2 rounded-full text-base font-medium text-textmuted hover:text-primary hover:bg-lightgreen"
              >
                {link.name}
              </button>
            ))
          ) : (
            appNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-full text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-primary bg-lightgreen font-bold'
                    : 'text-textmuted hover:text-primary hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))
          )}
          
          <div className="border-t border-slate-100 pt-4 pb-2">
            {variant === 'public' ? (
  !user && (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="secondary"
        onClick={() => {
          setIsMobileMenuOpen(false);
          navigate('/sign-in');
        }}
      >
        Sign In
      </Button>

      <Button
        variant="primary"
        onClick={() => {
          setIsMobileMenuOpen(false);
          navigate('/register');
        }}
      >
        Register
      </Button>
    </div>
  )
) : (
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm text-textdark font-semibold border-b border-slate-100 mb-2">
                  User
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-textmuted hover:text-primary hover:bg-slate-50"
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-textmuted hover:text-primary hover:bg-slate-50"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-base font-medium text-danger hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
