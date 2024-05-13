require("dotenv").config({ path: "../.env" });
const sql = require("mssql");

const database = {
  connectionPool: null,

  // Configuration for SQL Server connection using environment variables
  sqlConfig: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.HOST,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      trustServerCertificate: true, // only for development environments
    },
  },

  // Create a connection to the database
  connect: async function () {
    try {
      // Ensure the connection pool is created
      // console.log(`Configuring database with`, this.sqlConfig);
      this.connectionPool = await sql.connect(this.sqlConfig);
      console.log("Connected to the database!");
    } catch (err) {
      console.error("Error connecting to the database: ", err);
      process.exit(1);
    }
  },

  // Close the connection
  close: async function () {
    try {
      await this.connectionPool.close();
      console.log("Database connection closed.");
    } catch (err) {
      console.error("Error closing the database connection: ", err);
    }
  },

  // Execute a query
  executeQuery: async function (query, params = []) {
    try {
      const request = new sql.Request(this.connectionPool);
      params.forEach((param) => {
        request.input(param.name, param.type, param.value);
      });
      const result = await request.query(query);
      return result.recordset;
    } catch (err) {
      console.error("Error executing query: ", err);
      throw err; // Rethrowing the error is often better for error handling
    }
  },
};

module.exports = database;
