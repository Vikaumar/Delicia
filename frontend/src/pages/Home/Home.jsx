// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import CategorySection from '../../components/CategorySection/CategorySection';
import AboutUs from '../../components/AboutUs/AboutUs';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Promotions from '../../components/Promotions/Promotions';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const Home = () => {
  const [category, setCategory] = useState("All");
  const location = useLocation();

  // register plugins once
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    // optional: set ScrollTrigger defaults
    ScrollTrigger.defaults({ toggleActions: "play none none none" });
  }, []);

  // compute headerOffset by checking for a <header> element (fallback to 80)
  const headerOffset = (() => {
    try {
      const hdr = document.querySelector('header');
      if (hdr) return Math.round(hdr.getBoundingClientRect().height) || 80;
    } catch (err) {}
    return 80;
  })();

  // helper to animate scroll to element or to top using ScrollToPlugin
  const animateScrollTo = (target, opts = {}) => {
    try {
      gsap.to(window, {
        duration: opts.duration ?? 0.8,
        ease: opts.ease ?? "power2.out",
        scrollTo: {
          y: target || 0,
          offsetY: opts.offsetY ?? headerOffset,
          autoKill: true,
        },
      });
    } catch (err) {
      // fallback to instant scroll
      if (typeof target === "number") {
        window.scrollTo(0, target);
      } else if (target && target.getBoundingClientRect) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - (opts.offsetY ?? headerOffset);
        window.scrollTo(0, y);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  // scroll when coming with hash or state.scrollTo (same behavior as before)
  useEffect(() => {
    const idFromState = location?.state?.scrollTo;
    const idFromHash = location?.hash?.replace('#', '') || null;
    const targetId = idFromState || idFromHash;

    if (targetId) {
      const t = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) animateScrollTo(el);
        else animateScrollTo(0);
        try {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        } catch (err) {}
      }, 50);

      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // delegate anchor clicks like <a href="#menu"> to smooth scroll
  useEffect(() => {
    const onDocClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === "#") return;
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        animateScrollTo(el);
        try { history.pushState(null, "", `#${id}`); } catch (err) {}
      }
    };

    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FADE + SLIDE animation for elements with .home-animate
  useEffect(() => {
    // collect elements
    const nodes = gsap.utils.toArray('.home-animate');

    // create animations
    nodes.forEach((el, i) => {
      // start them invisible (avoid FOUC if you like)
      gsap.set(el, { autoAlpha: 0, y: 30 });

      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0, // small optional delay per element handled by ScrollTrigger
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          // you can adjust start so animation fires earlier/later
          toggleActions: 'play none none none',
          // optionally add markers: true for debugging
        },
        // small stagger if elements contain multiple children that you want to animate together:
        // (if you want child staggering, animate children separately instead)
      });
    });

    // cleanup on unmount
    return () => {
      try {
        ScrollTrigger.getAll().forEach(st => st.kill());
      } catch (err) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      {/* wrap each section with .home-animate so it fades/slides when in view */}
      <div className="home-animate">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      <div className="home-animate">
        <CategorySection onSelect={setCategory} />
      </div>

      <div className="home-animate">
        <FoodDisplay category={category} />
      </div>

      <div className="home-animate">
        <Promotions />
      </div>

      <div className="home-animate">
        <AboutUs />
      </div>
    </>
  );
};

export default Home;
