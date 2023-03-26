const { Router } = require("express");
const router = Router();
const jurusanRouter = require("../controllers/jurusan");

router.get("/", jurusanRouter.getAll);

router.post("/", jurusanRouter.postOne);

router.post("/many", jurusanRouter.postMany);

module.exports = router;
