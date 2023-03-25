const { Router } = require("express");
const router = Router();
const mahasiswaController = require("../controllers/mahasiswa");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assest/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", mahasiswaController.getAll);

router.get("/search", mahasiswaController.search);

router.get("/:nim", mahasiswaController.getOne);

router.post("/", upload.single("foto"), mahasiswaController.post);

router.put("/:nim", mahasiswaController.put);

router.delete("/:nim", mahasiswaController.delete);

module.exports = router;
