const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


// connect database
connectDB();
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Backend + MongoDB ready");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});