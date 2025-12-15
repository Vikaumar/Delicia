import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import Verify from './pages/Verify/Verify';
import Contact from "./pages/Contact";
import Partner from "./pages/Partner";
import Dashboard from './pages/Dashboard';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Chatbot from './components/Chatbot/Chatbot';
import Loader from './components/Loader';
import ScrollToTopButton from './components/Scroll/ScrollToTopButton';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // return <Loader />;
  }

  // Paths where Navbar + Footer should be hidden
  const hideLayoutOn = ["/dashboard", "/myorders"];

  const shouldHideLayout = hideLayoutOn.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        {!shouldHideLayout && <Navbar setShowLogin={setShowLogin} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          {/* <Route path="/myorders" element={<MyOrders />} /> */}
          <Route path="/verify" element={<Verify />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ScrollToTopButton />
        {!shouldHideLayout &&<Chatbot />}
      </div>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
