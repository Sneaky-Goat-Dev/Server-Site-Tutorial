const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.json({
    status: 200,
    error: false,
    data: {
      message: "You have successfully logged in.",
    },
  });
});

module.exports = router;
