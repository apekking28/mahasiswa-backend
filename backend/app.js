const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const database = require("./config/database");
const bodyParser = require("body-parser");

// Routes
const mahasiswaRoutes = require("./routes/mahasiswa");
const jurusanRoutes = require("./routes/jurusan");
const axiosRoutes = require("./routes/axios");
// End Routes
const basicAuth = require("express-basic-auth");
const helmet = require("helmet");

// SWAGGER
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./apidocs.json");
const morgan = require("morgan");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
// END SWAGGER

// helmet js
app.use(helmet());

// morgan
app.use(morgan("dev"));

// app.use(
//   basicAuth({
//     users: { admin: "supersecret" },
//     unauthorizedResponse: basicAuthResponse,
//   })
// );

// function basicAuthResponse(req) {
//   return req.auth
//     ? ("Credenctials", +req.auth.user + ":" + req.auth.password + "rejected")
//     : "Unauthorized";
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/jurusan", jurusanRoutes);
app.use("/axios", axiosRoutes);
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
