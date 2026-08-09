import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Wind, 
  Sprout, 
  BarChart3, 
  Settings, 
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = ({ forceCollapsed = false }) => {
  const { user } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(forceCollapsed);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Farm Map', path: '/farm-map', icon: Map },
    { name: 'Smart Spray', path: '/smart-spray', icon: Wind },
    { name: 'Crop Health', path: '/crop-health', icon: Sprout },
    { name: 'Analysis', path: '/analysis', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Contact Us', path: '/contact-us', icon: MessageSquare },
  ];

  return (
    <aside 
      className={`hidden lg:flex flex-col bg-white border-r border-slate-100 h-[calc(100vh-4rem)] sticky top-16 shadow-sm select-none transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Header */}
      <div className="flex items-center justify-end px-4 py-3 border-b border-slate-50 shrink-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-full hover:bg-lightgreen text-textmuted hover:text-primary transition-colors focus:outline-none border border-slate-100"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-3.5 rounded-card text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-md shadow-green-100' 
                  : 'text-textmuted hover:bg-lightgreen hover:text-primary'
                }
                ${isCollapsed ? 'justify-center px-0' : ''}
              `}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Mini Profile bottom area */}
      {user && (
        <div className={`p-4 border-t border-slate-100 bg-slate-50 flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center' : 'gap-3'
        }`}>
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm shrink-0">
            {user.name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h5 className="text-sm font-semibold text-textdark truncate">{user.name}</h5>
              <p className="text-xs text-textmuted truncate">ID: {user.id}</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
