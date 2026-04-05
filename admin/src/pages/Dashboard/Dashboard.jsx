import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardStats from "../../components/DashboardStats/DashboardStats";
import SalesChart from "../../components/Charts/SalesChart";
import { url } from "../../assets/assets";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`${url}/api/dashboard/stats`)
      .then(res => setStats(res.data.stats))
      .catch(err => console.log(err));
  }, []);

  if (!stats) return (
    <div className="dashboard-loader-container">
      <div className="modern-spinner"></div>
    </div>
  );



  return (
    <div className="dashboard">

      <DashboardStats />

      <SalesChart data={stats.graphData} />



      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="summary-card">
          <h3>Total Sales</h3>
          <p>${stats.totalSales}</p>
        </div>
        <div className="summary-card">
          <h3>Active Items</h3>
          <p>{stats.activeItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
