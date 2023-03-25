const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "kuliah",
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

async function testConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.....");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = db;
