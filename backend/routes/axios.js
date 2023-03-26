const { Router } = require("express");
const router = Router();
const axiosController = require("../controllers/axios");

router.get("/", axiosController.getAll);

router.post("/",axiosController.post)

module.exports = router;
