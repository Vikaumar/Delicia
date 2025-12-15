import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
