const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const database = require("./config/database");
const bodyParser = require("body-parser");
const mahasiswaRouter = require("./routes/mahasiswa");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/mahasiswa", mahasiswaRouter);
app.use("/assest", express.static("assest"));

app.use((req, res, next) => {
  const error = new Error("Tidak di temukan path itu");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Server up and running at ${port}`);
});
