const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;
const APP_NAME = process.env.APP_NAME || "Docker Practice";

app.get("/", (req, res) => {
  res.json({
    message: "Docker deployment is working!",
    app: APP_NAME
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
