# 🍽️ Delicia — Production-Ready Full‑Stack Food Ordering Platform

Delicia is a **production-oriented full-stack food ordering web application** built using the **MERN stack**. The project demonstrates strong fundamentals in **frontend engineering**, **backend API design**, **database modeling**, and **real-world application structuring**, making it well-suited for **resume shortlisting, internships, and placements**.

---

## 🚀 Project Overview

* End-to-end food ordering system with **user-facing app** and **admin dashboard**
* Clean separation of **frontend, backend, and admin panel**
* Scalable REST API architecture
* Localization-ready pricing system (**₹ INR support**)

---

## 🖼️ Application Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Food Listing & Categories

![Menu Page](screenshots/menu.png)

### Cart & Price Calculation

![Cart Page](screenshots/cart.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin.png)

> 📌 Screenshots are stored in the `screenshots/` directory at the root level.

---

## ✨ Key Features

### Core Functionalities

* Secure online payments using **Stripe Checkout** with server-side order validation
* **JWT-based authentication** with role-based access control (User / Admin / Delivery)
* **Real-time order status updates** using WebSockets for instant UI synchronization
* **Email subscription system** for offers and updates
* **Integrated chatbot assistant** for menu, pricing, ordering help, and recommendations

### User Experience

* Browse food items with category-based listing
* Add/remove items from cart with dynamic price calculation
* Localized currency formatting (₹ INR)
* Responsive UI built primarily with Tailwind CSS and custom CSS

### Admin & Operations

* Admin dashboard to manage users, food items, and orders
* Analytics dashboard showing order volume, revenue trends, and user activity
* Delivery personnel management system for order assignment and delivery tracking
* Image upload and centralized menu management

### Engineering Highlights

* Modular React component architecture
* RESTful API design using Express.js
* MongoDB schema modeling with Mongoose
* WebSocket-based real-time communication layer
* Clean separation of frontend, backend, and admin services
* Ready for deployment and scaling

---

## 🧰 Tech Stack

**Frontend**

* React.js
* Tailwind CSS (primary styling framework)
* Custom CSS (for fine-grained control where utility classes are insufficient)
* JavaScript (ES6+)
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

**Tools & Practices**

* Git & GitHub (version control)
* VS Code
* Postman (API testing)

---

## 📁 Repository Structure

```
Delicia/
├── frontend/        # User-facing React application
├── admin/           # Admin dashboard
├── backend/         # Node.js + Express REST API
├── screenshots/     # UI screenshots
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Vikaumar/Delicia.git
cd Delicia
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4️⃣ Admin Panel Setup

```bash
cd admin
npm install
npm start
```

---

## 💱 Currency Localization

* Prices are handled in **Indian Rupees (₹ INR)**
* Implemented using `Intl.NumberFormat("en-IN")` for accurate formatting
* Architecture supports future multi-currency extension

---

## 🎯 Learning & Outcomes

* Built a complete MERN-stack application from scratch
* Designed REST APIs and database schemas
* Implemented admin-level CRUD operations
* Applied clean code principles and modular design
* Gained experience with real-world project structuring

---

## 🚧 Future Enhancements

* User authentication & authorization (JWT)
* Online payments (Razorpay integration)
* Order tracking & history
* Search, filters, and pagination
* Cloud deployment (AWS / Render / Vercel)

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Vikas Kumar**
🎓 B.Tech CSE, IIIT Kota (3rd Year)
💼 Aspiring Full‑Stack Engineer
🔗 GitHub: [https://github.com/Vikaumar](https://github.com/Vikaumar)

---

⭐ *This project is actively maintained and open to contributions.*

