import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const SalesChart = ({ data }) => {
  return (
    <div style={{ width: 600, height: 300, marginTop: 30 }}>
      <h3>Sales (Past Days)</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4A90E2" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
