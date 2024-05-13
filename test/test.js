const axios = require("axios");

axios
  .post("http://localhost:8080/api/login", {
    username: "TestUser",
    password: "TestPassword",
  })
  .then((response) => {
    console.log("Data received:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
