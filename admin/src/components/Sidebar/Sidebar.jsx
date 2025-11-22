// Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { 
      path: '/add', 
      icon: assets.add_icon, 
      label: 'Add Items',
      description: 'Create new items'
    },
    { 
      path: '/list', 
      icon: assets.order_icon, 
      label: 'List Items',
      description: 'Manage your items'
    },
    { 
      path: '/orders', 
      icon: assets.order_icon, 
      label: 'Orders',
      description: 'View all orders'
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Logo Section - Now Clickable */}
        <div className="sidebar-header">
          <button 
            className="logo-container-btn"
            onClick={handleDashboardClick}
            title="Go to Dashboard"
          >
            <h1 className="sidebar-logo">DELICIA</h1>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-options">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
            >
              <div className="option-icon-wrapper">
                <img src={item.icon} alt={item.label} className="option-icon" />
              </div>
              {isOpen && (
                <div className="option-content">
                  <p className="option-label">{item.label}</p>
                  <p className="option-description">{item.description}</p>
                </div>
              )}
              {isOpen && <div className="option-indicator"></div>}
            </NavLink>
          ))}
        </nav>

        {/* Spacer */}
        <div className="sidebar-spacer"></div>

        {/* Quick Actions */}
        {isOpen && (
          <div className="sidebar-quick-actions">
            <p className="quick-actions-label">Quick Actions</p>
            <button className="quick-action-btn" onClick={handleDashboardClick}>
              <span>📊</span>
              Dashboard
            </button>
          </div>
        )}

        {/* Footer Section */}
        <div className="sidebar-footer">
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={20} className="logout-icon" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;