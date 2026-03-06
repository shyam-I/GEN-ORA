
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const waterRoutes = require("./routes/waterRoutes");
const dataRoutes = require("./routes/dataRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Water Optimization API running");
});

app.use("/api/water", waterRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));