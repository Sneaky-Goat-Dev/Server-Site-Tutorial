const express = require("express");
const path = require("path");
require("dotenv").config({ path: "../.env" });

const basePath = path.join(__dirname, "..", "site");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const userRoutes = require("./api/userRoutes");

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
