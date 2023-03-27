const { Router } = require("express");
const router = Router();
const axiosController = require("../controllers/axios");

router.get("/", axiosController.getAll);

router.post("/", axiosController.post);

router.put("/:id", axiosController.update);

router.delete("/:id", axiosController.delete);

module.exports = router;
