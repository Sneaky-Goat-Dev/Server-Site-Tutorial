const express = require("express");
const router = express.Router();
const database = require("../../database/Database");
const sql = require("mssql");
database.connect();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      status: 400,
      error: true,
      data: {
        message: "Please provide a username and password.",
      },
    });
  }

  const query = `EXEC Login_GetUser @Username, @Password`;

  const params = [
    { name: "Username", type: sql.VarChar, value: username },
    { name: "Password", type: sql.VarChar, value: password },
  ];

  const userDetails = await database.executeQuery(query, params);

  console.log(userDetails);

  if (userDetails.length > 0) {
    if (
      username == userDetails[0].Username &&
      password == userDetails[0].Password
    ) {
      res.json({
        status: 200,
        error: false,
        data: {
          message: "You have successfully logged in.",
        },
      });
    }
  } else {
    return res.json({
      status: 400,
      error: true,
      data: {
        message: "Invalid username or password.",
      },
    });
  }
});

module.exports = router;
