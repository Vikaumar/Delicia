import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardStats.css";
import { TrendingUp, ShoppingCart, Users } from 'lucide-react';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/api/dashboard/stats")
      .then(res => {
        setStats(res.data.stats);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stat-card skeleton"></div>
        <div className="stat-card skeleton"></div>
        <div className="stat-card skeleton"></div>
      </div>
    );
  }

  const cards = [
    { 
      title: "Revenue", 
      value: "$" + stats?.revenue || "0", 
      color: "#ff6347",
      icon: TrendingUp,
      trend: "+12.5%",
      bgGradient: "from-red-50 to-orange-50"
    },
    { 
      title: "Orders Today", 
      value: stats?.ordersToday || "0", 
      color: "#ffc107",
      icon: ShoppingCart,
      trend: "No new orders",
      bgGradient: "from-yellow-50 to-amber-50"
    },
    { 
      title: "Active Users", 
      value: stats?.activeUsers || "0", 
      color: "#28a745",
      icon: Users,
      trend: "+2 this week",
      bgGradient: "from-green-50 to-emerald-50"
    }
  ];

  return (
    <div className="stats-wrapper">
      <div className="stats-header">
        <h2>Overview</h2>
        <p>Today's business metrics at a glance</p>
      </div>
      <div className="stats-container">
        {cards.map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={i} 
              className={`stat-card bg-gradient-to-br ${stat.bgGradient}`}
              style={{ "--border-color": stat.color }}
            >
              <div className="stat-card-header">
                <div className="stat-icon-wrapper" style={{ backgroundColor: stat.color }}>
                  <IconComponent size={24} color="white" />
                </div>
                <span className="stat-badge">{stat.trend}</span>
              </div>
              <div className="stat-card-content">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-card-footer">
                <div className="stat-bar" style={{ backgroundColor: stat.color }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStats;