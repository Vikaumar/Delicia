import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I\'m your Delicia assistant. Ask me about our menu, pricing, or orders.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const bottomRef = useRef();
  const inputRef = useRef();

  // Auto-scroll when messages or open state change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  // Enhanced AI responses with all categories covered
  const generateAIResponse = async (userMessage) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const message = userMessage.toLowerCase();
    
    // General menu inquiry
   if (message.includes('menu') || message.includes('food') || message.includes('items') || message.includes('categories')) {
  return `🍽️ Welcome to Delicia! Our delicious menu includes:

🥗 Salads – Fresh garden salads  
🌯 Rolls – Tasty wraps and rolls  
🍰 Desserts – Sweet treats & pastries  
🥪 Sandwiches – Gourmet sandwiches  
🎂 Cakes – Freshly baked cakes  
🥬 Pure Veg – Vegetarian specialties  
🍝 Pasta – Italian pasta dishes  
🍜 Noodles – Asian noodle varieties

What category interests you? Just ask about any specific item! 😊`;
}

if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('how much')) {
  return `💰 Delicia Price Guide:

🥗 Salads: $8–12  
🌯 Rolls: $6–10  
🍰 Desserts: $4–8  
🥪 Sandwiches: $7–11  
🎂 Cakes: $15–25  
🥬 Pure Veg: $9–14  
🍝 Pasta: $10–15  
🍜 Noodles: $8–13

Prices may vary by location and special offers.  
Want details on a specific item? Just ask! 📋`;
}

if (message.includes('order') || message.includes('delivery') || message.includes('how to order')) {
  return `📦 Easy Ordering Process:

1️⃣ Browse our delicious menu  
2️⃣ Add your favorites to cart  
3️⃣ Enter delivery address  
4️⃣ Choose payment method  
5️⃣ Confirm your order

⏰ Delivery: 25–35 minutes  
💵 Minimum order: $15  
🚚 Free delivery on orders over $30

Ready to order something tasty? 🍽️`;
}
if (message.includes('recommend') || message.includes('popular') || message.includes('best') || message.includes('favorite')) {
  return `⭐ Customer Favorites & Recommendations:

🔥 Most Popular  
• Chicken Caesar Salad  
• Spaghetti Carbonara  
• Chocolate Fudge Cake  
• Club Sandwich

👨‍🍳 Chef Specials  
• Seafood Linguine  
• Mediterranean Roll  
• Veggie Buddha Bowl

🏆 Best Value  
• Any pasta + salad combo  
• Pure Veg dishes  
• Dessert with main course

What type of food are you in the mood for?  
I can give you a personalized recommendation! 🍽️`;
}

if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon')) {
  return `👋 Hello! Welcome to Delicia!  
I'm here to help you discover our amazing food options.  
What delicious meal can I help you find today? ✨`;
}

if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
  return `😊 You're very welcome!  
I'm always happy to help with our Delicia menu.  
Is there anything else about our delicious food or services I can assist you with? 🍽️`;
}

if (message.includes('salad')) {
  return `🥗 Fresh Salad Selection:

• Caesar Salad – Crisp romaine, parmesan, croutons  
• Greek Salad – Olives, feta, tomatoes, cucumber  
• Garden Fresh – Mixed greens, seasonal vegetables  
• Chicken Caesar – Our classic with grilled chicken  
• Mediterranean – Quinoa, chickpeas, fresh herbs

💰 Price range: $8–12  
🌱 All made with fresh, locally sourced ingredients!

Which salad sounds good to you? 🥬`;
}

if (message.includes('roll') || message.includes('wrap')) {
  return `🌯 Delicious Rolls & Wraps:

• Chicken Roll – Grilled chicken, fresh veggies  
• Veggie Wrap – Hummus, mixed vegetables  
• Turkey Club Roll – Turkey, bacon, lettuce, tomato  
• Mediterranean Roll – Falafel, tahini, cucumber  
• Spicy Chicken Wrap – With jalapeños and spicy sauce

💰 Price range: $6–10  
🔥 All served hot and fresh!

Which roll would you like to try? 🌮`;
}

if (message.includes('dessert') || message.includes('sweet')) {
  return `🍰 Sweet Dessert Collection:

• Chocolate Brownie – Rich and fudgy  
• Tiramisu – Classic Italian dessert  
• Apple Pie – Homemade with vanilla ice cream  
• Cheesecake – New York style, berry topping  
• Ice Cream Sundae – Multiple flavors available  
• Fruit Tart – Seasonal fresh fruits

💰 Price range: $4–8  
🍓 Perfect ending to any meal!

What sweet treat are you craving? 🧁`;
}

if (message.includes('sandwich') || message.includes('sub')) {
  return `🥪 Gourmet Sandwich Menu:

• Club Sandwich – Triple-decker with turkey & bacon  
• BLT Deluxe – Bacon, lettuce, tomato on sourdough  
• Grilled Chicken – With avocado and swiss cheese  
• Veggie Delight – Hummus, sprouts, cucumber  
• Philly Cheesesteak – Classic with peppers & onions  
• Tuna Melt – With melted cheddar on rye

💰 Price range: $7–11  
🍞 All served on fresh artisan bread!

Which sandwich sounds perfect? 🥖`;
}

if (message.includes('cake') || message.includes('birthday')) {
  return `🎂 Freshly Baked Cake Selection:

• Chocolate Fudge Cake – Rich, moist chocolate layers  
• Red Velvet – With cream cheese frosting  
• Vanilla Bean – Classic with buttercream  
• Carrot Cake – With walnuts and cream cheese  
• Black Forest – Chocolate with cherries  
• Lemon Drizzle – Light and zesty

💰 Price range: $15–25 (whole cakes)  
🎉 Perfect for celebrations and special occasions!  
📞 Custom cakes available with 24hr notice

Which cake would make your day special? 🍰`;
}

if (message.includes('pure veg') || message.includes('vegetarian') || message.includes('veg') || message.includes('plant based')) {
  return `🥬 Pure Vegetarian Delights:

• Veggie Buddha Bowl – Quinoa, roasted vegetables  
• Stuffed Bell Peppers – Rice, herbs, cheese  
• Eggplant Parmesan – Breaded with marinara  
• Veggie Burger – House-made patty with fixings  
• Caprese Stack – Fresh mozzarella, tomato, basil  
• Mushroom Risotto – Creamy arborio rice

💰 Price range: $9–14  
🌱 100% vegetarian, many vegan options available!

✨ Fresh, healthy, and absolutely delicious!  
What veggie dish interests you? 🌿`;
}

if (message.includes('pasta') || message.includes('spaghetti') || message.includes('italian')) {
  return `🍝 Authentic Italian Pasta:

• Spaghetti Carbonara – Eggs, bacon, parmesan  
• Penne Arrabbiata – Spicy tomato sauce  
• Fettuccine Alfredo – Creamy white sauce  
• Lasagna Bolognese – Layered with meat sauce  
• Pesto Linguine – Fresh basil pesto  
• Seafood Linguine – Shrimp, mussels, white wine

💰 Price range: $10–15  
🇮🇹 Made with imported Italian pasta  
🧄 Fresh herbs and authentic sauces

Which pasta dish are you craving? 🍴`;
}

if (message.includes('noodle') || message.includes('asian') || message.includes('ramen') || message.includes('pad thai')) {
  return `🍜 Asian Noodle Specialties:

• Pad Thai – Sweet & tangy Thai classic  
• Chicken Ramen – Rich broth with fresh toppings  
• Lo Mein – Soft noodles with vegetables  
• Pho Bo – Vietnamese beef noodle soup  
• Singapore Rice Noodles – Curry-spiced with shrimp  
• Udon Stir-fry – Thick noodles with teriyaki

💰 Price range: $8–13  
🥢 Authentic Asian flavors  
🌶️ Spice levels can be adjusted

Which noodle dish sounds amazing? 🥡`;
}

if (message.includes('gluten free') || message.includes('vegan') || message.includes('dairy free')) {
  return `🌱 Special Dietary Options:

✅ Gluten-Free – Available for most salads, some pasta  
✅ Vegan – Pure veg section has many vegan options  
✅ Dairy-Free – Multiple options in each category  
✅ Low-Carb – Salads and veggie dishes

Please let our staff know about any allergies or dietary requirements when ordering.  
We're happy to customize dishes to meet your needs! 👨‍🍳

What specific dietary requirement can I help you with? 🍽️`;
}

if (message.includes('hours') || message.includes('open') || message.includes('location') || message.includes('address') || message.includes('phone')) {
  return `📍 Delicia Restaurant Info:

⏰ Hours: Daily 11:00 AM – 10:00 PM  
📱 Phone: Call for reservations  
🚚 Delivery: Available in our service area  
💳 Payment: Cash, Card, Online payment

For specific location details and contact info, please check our website or app.  
Ready to place an order? 🍽️`;
}

if (message.includes('help') || message.includes('confused') || message.includes('what can you do')) {
  return `🤖 I'm here to help you with:

🍽️ Menu information and descriptions  
💰 Pricing for all items  
📦 Ordering process and delivery  
🥗 Specific dish recommendations  
🌱 Dietary restrictions and options  
⭐ Popular items and chef specials

Just ask me about any food category or specific dish!  
Try asking:  
• "Tell me about pasta dishes"  
• "What desserts do you have?"  
• "How much are the salads?"

What would you like to know? 😊`;
}


const foodKeywords = ['salad', 'roll', 'dessert', 'sandwich', 'cake', 'veg', 'pasta', 'noodle', 'price', 'delivery'];

if (!message.includes('food') && !message.includes('menu') && !message.includes('order')) {
  const hasFood = foodKeywords.some(keyword => message.includes(keyword));
  if (!hasFood) {
    return `🍽️ I'm your specialized Delicia food assistant!  
I'm here to help you with:

🍽️ Our delicious menu options  
💰 Pricing information  
📦 Ordering and delivery  
🥗 Food recommendations

What can I tell you about our amazing food?  
Try asking about salads, pasta, desserts, or any of our other categories! 😊`;
  }
}

return `I'd love to help you with that!  
Could you be more specific about what you'd like to know?

You can ask me about:

🍽️ Menu categories – Salads, Rolls, Desserts, Sandwiches, Cakes, Pure Veg, Pasta, Noodles  
💰 Pricing for any item  
📦 Ordering and delivery info  
⭐ Recommendations based on your preferences

What sounds good to you today? 🍽️`;
  };

  // Send a message
  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(userMsg.content);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsConnected(true);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Sorry, I\'m having trouble connecting right now. Please try again in a moment.' }
      ]);
      setIsConnected(false);
      setTimeout(() => setIsConnected(true), 3000);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hi there! I\'m your Delicia assistant. Ask me about our menu, pricing, or orders.' }
    ]);
  };

  const formatTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Auto-resize textarea with better handling
  const handleInputChange = (e) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  // Quick suggestion buttons
  const suggestions = [
    "Show me the menu 🍽️",
    "What are your prices? 💰", 
    "How do I order? 📦",
    "Recommend something popular ⭐"
  ];

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`chatbot-wrapper ${open ? 'open' : ''}`}>
      <button className="chatbot-toggle" onClick={() => setOpen(o => !o)}>
        💬
        {!open && messages.length > 1 && (
          <span className="unread-indicator">{messages.length - 1}</span>
        )}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-status">
              <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
              <span className="chatbot-title">Delicia Assistant</span>
              <span className="status-text">{isConnected ? 'Online' : 'Reconnecting...'}</span>
            </div>
            <div className="chatbot-actions">
              <button className="action-btn" onClick={clearChat} title="Clear chat">🗑️</button>
              <button className="action-btn" onClick={() => setOpen(false)} title="Close">✕</button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="msg-content" style={{ whiteSpace: 'pre-line' }}>
                  {m.content}
                </div>
                <div className="msg-time">{formatTime()}</div>
              </div>
            ))}
            {isTyping && (
              <div className="msg assistant typing">
                <div className="msg-content">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions - show only when chat is empty or few messages */}
          {messages.length <= 2 && (
            <div className="quick-suggestions">
              {suggestions.map((suggestion, i) => (
                <button 
                  key={i}
                  className="suggestion-btn"
                  onClick={() => handleSuggestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <div className="input-container">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKey}
                placeholder="Ask about menu,prices,orders..."
                disabled={isTyping}
                maxLength={500}
                rows={1}
                className="chatbot-textarea"
              />

              <div className="input-actions">
                <span className="char-count">{input.length}/500</span>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="send-btn"
                  aria-label="Send message"
                >
                  {isTyping ? '⏳' : '📤'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
