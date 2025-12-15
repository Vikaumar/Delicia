import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // TOTAL ORDERS
    const totalOrders = await orderModel.countDocuments();

    // TOTAL SALES (sum of amount)
    const orders = await orderModel.find();
    const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);

    // REVENUE (same as totalSales but you can modify logic)
    const revenue = totalSales;

    // ACTIVE USERS
    const activeUsers = await userModel.countDocuments();

    // TOTAL ACTIVE ITEMS (food items)
    const activeItems = await foodModel.countDocuments();

    // ORDERS TODAY
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersToday = await orderModel.countDocuments({
      date: { $gte: today },
    });

    // SALES GRAPH LAST 7 DAYS
    const graphData = await orderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        revenue,
        ordersToday,
        activeUsers,
        totalOrders,
        totalSales,
        activeItems,
        graphData,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
