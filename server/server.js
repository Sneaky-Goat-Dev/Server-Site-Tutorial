const express = require("express");
require("dotenv").config({ path: "../.env" });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const userRoutes = require("./api/userRoutes");

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
