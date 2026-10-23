import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const header = req.headers.authorization; // use header to check for token
  const token = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { userId, username, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};