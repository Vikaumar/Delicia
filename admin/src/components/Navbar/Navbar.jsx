import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Menu, X, Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('minimized');
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        {/* Hamburger Menu - Toggle Sidebar */}
        <button 
          className='hamburger-btn'
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div className='navbar-logo-section'>
          <img className='logo' src={assets.logo3} alt="DELICIA Logo" />
        </div>
      </div>

      {/* Center - Search or Brand Name can go here */}
      <div className='navbar-center'>
        <span className='navbar-title'>Admin Panel</span>
      </div>

      <div className='navbar-right'>
        {/* Notification Bell */}
        <div className='notification-container'>
          <button 
            className='navbar-btn notification-btn'
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={20} />
            <span className='notification-badge'>3</span>
          </button>

          {showNotifications && (
            <div className='notification-dropdown'>
              <div className='notification-header'>
                <h3>Notifications</h3>
                <button className='close-btn' onClick={() => setShowNotifications(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className='notification-list'>
                <div className='notification-item'>
                  <div className='notification-icon'>📦</div>
                  <div className='notification-content'>
                    <p>New order received</p>
                    <span>5 min ago</span>
                  </div>
                </div>
                <div className='notification-item'>
                  <div className='notification-icon'>⭐</div>
                  <div className='notification-content'>
                    <p>New review from customer</p>
                    <span>1 hour ago</span>
                  </div>
                </div>
                <div className='notification-item'>
                  <div className='notification-icon'>🔔</div>
                  <div className='notification-content'>
                    <p>System maintenance scheduled</p>
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <button className='navbar-btn settings-btn' title="Settings">
          <Settings size={20} />
        </button>

        {/* Profile Section */}
        <div className='profile-section'>
          <button 
            className='profile-btn'
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className='profile-avatar'>
              <img src={assets.profile_image} alt="Profile" />
            </div>
            <div className='profile-info'>
              <span className='profile-name'>Admin</span>
              <span className='profile-role'>Owner</span>
            </div>
            <ChevronDown size={18} className={`chevron ${showProfile ? 'open' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className='profile-dropdown'>
              <button className='dropdown-item'>
                <User size={16} />
                <span>Profile</span>
              </button>
              <button className='dropdown-item'>
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <div className='dropdown-divider'></div>
              <button 
                className='dropdown-item logout-item'
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;