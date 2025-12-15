import React, { useState } from 'react';
import './Reviews.css';
import myPhoto from '../../assets/review.png';

const reviews = [
  { 
    id: 1, 
    name: 'Riya Sharma', 
    role: 'Regular Customer', 
    rating: 5, 
    text: 'Great variety and easy-to-use interface. Ordering is smooth, and the meals are always consistent in taste and quality. Definitely one of the best food platforms out there!' 
  },
  { 
    id: 2, 
    name: 'Aman Verma', 
    role: 'Food Enthusiast', 
    rating: 5, 
    text: "Amazing experience! The food is always fresh, the delivery is super quick, and the packaging is neat. This has become my go-to app whenever I crave something tasty." 
  },
  { 
    id: 3, 
    name: 'Neha Kapoor', 
    role: 'Loyal Customer', 
    rating: 5, 
    text: 'Fantastic service! The food quality is always top-notch, portions are generous, and delivery is hassle-free. Highly recommend it to anyone who loves good food.' 
  },
  { 
    id: 4, 
    name: 'Arjun Mehta', 
    role: 'First-Time User', 
    rating: 4, 
    text: 'I was impressed by how simple the ordering process was. Food arrived hot and tasty. Just wish there were more options in healthy meals.' 
  },
  { 
    id: 5, 
    name: 'Simran Kaur', 
    role: 'Vegetarian Customer', 
    rating: 5, 
    text: 'Absolutely love the vegetarian options here! Everything tastes fresh and well-prepared. Delivery is always on time and neatly packed.' 
  },
  { 
    id: 6, 
    name: 'Rohit Malhotra', 
    role: 'Busy Professional', 
    rating: 4, 
    text: 'This app saves me so much time. Ordering during office breaks is quick and convenient. Sometimes delivery takes a bit longer, but overall great service.' 
  },
  { 
    id: 7, 
    name: 'Priya Nair', 
    role: 'Health Conscious', 
    rating: 5, 
    text: 'Finally an app that balances taste and health! The salads and light meals are amazing, and the calorie info really helps me stay on track.' 
  },
  { 
    id: 8, 
    name: 'Vikram Singh', 
    role: 'Weekend Foodie', 
    rating: 5, 
    text: 'Every weekend I try something new from here, and it never disappoints. Excellent range of cuisines and the flavors are authentic.' 
  }
];


const Reviews = () => {
  const [idx, setIdx] = useState(0);
  const active = reviews[idx];

  const prev = () => setIdx((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setIdx((p) => (p + 1) % reviews.length);

  return (
    <section className="reviews-section container">
      <div className="reviews-left">
        <img src={myPhoto} alt="me" className="person-image" />
        <div className="dot dot-1" />
        <div className="dot dot-2" />
        <div className="dot dot-3" />
        <div className="dot dot-4" />
        <div className="dot dot-5" />
      </div>

      <div className="reviews-right">
        <div className="review-card">
          <div className="review-body review-animate" key={active.id}>
            <div className="stars">
              {Array.from({ length: active.rating }).map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>

            <p className="review-text">{active.text}</p>

            <div className="author-row">
              <div className="avatar">
                {active.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div className="author-info">
                <h4>{active.name}</h4>
                <span>{active.role}</span>
              </div>
            </div>
          </div>

          <div className="controls">
            <button onClick={prev} className="circle-btn circle-left" aria-label="Previous review">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>

            <button onClick={next} className="circle-btn circle-right" aria-label="Next review">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
