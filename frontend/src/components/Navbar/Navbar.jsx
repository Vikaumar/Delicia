import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import logo2 from "../../assets/logo.png";
import axios from "axios";

import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const onSearchKey = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
    }
  };

  const handleHomeClick = () => {
    setMenu("home");
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnchorClick = (e, targetId, menuName) => {
    e.preventDefault();
    setMenu(menuName);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: targetId } });
    } else {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { token },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={`navbar ${scrolled ? "scrolled" : "transparent"}`}>
      <Link to="/" onClick={handleHomeClick}>
        <img
          className="logo "
          style={{ marginLeft: "50px" }}
          src={logo2}
          alt="logo"
        />
      </Link>
      <ul className="navbar-menu">
        <Link
          id="t"
          to="/"
          onClick={handleHomeClick}
          className={`nav-link ${menu === "home" ? "active" : ""}`}
        >
          Home
        </Link>

        <a
          href="explore-menu"
          id="t"
          onClick={(e) => handleAnchorClick(e, "explore-menu", "menu")}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </a>

        <a
          href="about"
          id="t"
          onClick={(e) => handleAnchorClick(e, "about", "about")}
          className={`${menu === "about" ? "active" : ""}`}
        >
          About Us
        </a>

        <a
          href="footer"
          id="t"
          onClick={(e) => handleAnchorClick(e, "footer", "contact")}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <MagnifyingGlassIcon
          className="w-8 h-8 text-gray-800 cursor-pointer hover:text-[#AB162C] transition-colors transition-colors duration-200 ease-in-out"
          onClick={() => setShowSearch((prev) => !prev)}
        />

        {showSearch && (
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#AB162C] transition-colors duration-200 ease-in-out"
            style={{ padding: "4px" }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onSearchKey}
            onBlur={() => setShowSearch(false)}
            autoFocus
          />
        )}

        <Link to="/cart" className="relative">
          <ShoppingCartIcon className="w-8 h-8 text-gray-800 cursor-pointer hover:text-[#AB162C] transition-colors transition-colors duration-200 ease-in-out" />
          {getTotalCartAmount() > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#AB162C] rounded-full"></div>
          )}
        </Link>

        {/* {!token ? (
          <button
            type="button"
            className="animated-button"
            onClick={() => {
              console.log("setShowLogin:", setShowLogin, "typeof:", typeof setShowLogin);
              if (typeof setShowLogin === "function") setShowLogin(true);
            }}
          >
            <span>Sign Up</span><span></span>
          </button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="orders" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout" /> <p>Logout</p>
              </li>
            </ul>
          </div> 
        )} */}
        {!token ? (
          <button
            type="button"
            className="animated-button"
            onClick={() => {
              if (typeof setShowLogin === "function") setShowLogin(true);
            }}
          >
            <span>Sign Up</span>
            <span></span>
          </button>
        ) : (
          <img
            src={
              user?.avatar
                ? `http://localhost:4000${user.avatar}`
                : assets.profile_icon
            }
            alt="profile"
            onClick={() => navigate("/dashboard")}
            style={{
              cursor: "pointer",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
