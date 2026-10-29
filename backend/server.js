import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";

import notesRoutes from "./src/routes/notesRoutes.js";
import authRoutes from "./src/routes/authRoutes.js"
import connectDB from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", //can make requests to a different origin (domain, port, or protocol) from frontend to backend
    })
  );
}

app.use(express.json());
//custom middleware
app.use((req, res, next) => {
  console.log(`request method is ${req.method} & url is ${req.url}`);
  next();
});
app.use(rateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("app is running on port: ", PORT);
  });
});
