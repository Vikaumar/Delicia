import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginPopupInner({ setShowLogin }) {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Sign Up');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const firstFieldRef = useRef(null);

  useEffect(() => {
    // focus the first input when opened
    if (firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, []);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setShowLogin(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setShowLogin]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((d) => ({ ...d, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let new_url = url;
    if (currState === 'Login') {
      new_url += '/api/user/login';
    } else {
      new_url += '/api/user/register';
    }

    try {
      const response = await axios.post(new_url, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        loadCartData(response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="login-popup-overlay"
      onClick={() => setShowLogin(false)}
      role="presentation"
    >
      <form
        onSubmit={onLogin}
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-popup-heading"
      >
        <div className="login-popup-title">
          <h2 id="login-popup-heading">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="login-popup-close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === 'Sign Up' ? (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              ref={firstFieldRef}
            />
          ) : (
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
              ref={firstFieldRef}
            />
          )}

          {currState === 'Sign Up' && (
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
          )}

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="login-popup-submit">
          {currState === 'Login' ? 'Login' : 'Create account'}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" name="agree" id="agree" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === 'Login' ? (
          <p className="login-popup-switch">
            Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p className="login-popup-switch">
            Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default function LoginPopup(props) {
  // Guard for SSR / tests
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(<LoginPopupInner {...props} />, document.body);
}
