import React, { useState } from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import logo2 from "../../assets/logo.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn , FaYoutube } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    emailjs
      .send(
        "service_89qfx4b", 
        "template_tjzj5pe", 
        { user_email: email },
        "MyL2t_opu-GP9ScLi"
      )
      .then(
        (response) => {
          alert(`Thank you for subscribing, ${email}! You’ll now receive the latest updates from DELICIA.`);
          setEmail("");
        },
        (error) => {
          alert("We couldn’t complete your subscription at the moment. Please try again shortly.");
          console.error("EmailJS Error:", error);
        }
      );

  };

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="footer-content">
        {/* Left: Brand */}
        <div className="footer-content-left">
          <img className="logo" style={{ marginRight: "10px" }} src={logo2} alt="DELICIA logo" />
          <p className="footer-desc">
            DELICIA — Fresh meals delivered fast. We bring restaurant-quality
            dishes straight to your door with real-time tracking, friendly
            drivers and reliable delivery.
          </p>

          <div className="flex gap-[15px] items-center mt-[6px]" aria-label="Social links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out hover:-translate-y-[3px] bg-[#3b5998]"
            >
              <FaFacebookF className="text-white text-lg" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] rounded-full transition-all duration-500 ease-in-out hover:-translate-y-[3px]"
            >
              <FaTwitter className="text-white text-lg" />
            </a>

            <a
              href="https://www.linkedin.com/in/vikas-kumar-536bb428a"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#0A66C2] rounded-full transition-all duration-500 ease-in-out hover:-translate-y-[3px] "
            >
              <FaLinkedinIn className="text-white text-lg" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] hover:bg-[#e60000] transition-transform duration-300          ease-in-out transform hover:-translate-y-1 shadow-md"
            >
              <FaYoutube className="text-white text-lg" />
            </a>
          </div>

          <form className="newsletter" onSubmit={handleNewsletter} aria-label="Newsletter signup">
            <label htmlFor="newsletter-email" className="sr-only text-red-200">Subscribe to offers</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email for offers"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              className="placeholder-black border border-[#AB162C] focus:border-[#AB162C] focus:ring-1 focus:ring-[#AB162C]"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Center: Company Links */}
        <div className="footer-content-center">
          <h3 className="font-bold">Company</h3>
          <ul>
            <li><a >Home</a></li>
            <li><a >About us</a></li>
            <li><a >Menu</a></li>
            <li><a >Delivery</a></li>
            <li><a >Privacy policy</a></li>
            <li><a >Careers</a></li>
          </ul>
        </div>

        {/* Right: Contact */}
        <div className="footer-content-right">
          <h3 className="font-bold">Get in touch</h3>
          <ul className="contact-list">
            <li>
              <a href="tel:+910000000000">+91-00000-00000</a>
            </li>
            <li>
              <a href="mailto:delicia.official2@gmail.com">delicia.official2@gmail.com</a>
            </li>
            <li>DELICIA HQ — 124 Market St, New York, NY</li>
            <li>Support: Daily 8:00 AM – 11:00 PM</li>
          </ul>

          <div className="footer-cta">
            <a className="btn-secondary" href="/contact">Contact us</a>
            <a className="btn-outline" href="/partner">Partner with us</a>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p className="copyright">
          Copyright {new Date().getFullYear()} © DELICIA.com — All rights reserved.
        </p>
        <div className="legal-links">
          <a >Terms</a>
          <a >Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
