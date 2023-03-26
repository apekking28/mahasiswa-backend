const Jurusan = require("../models/jurusan");

const jurusanController = {
  getAll: async (req, res) => {
    try {
      const jurusan = await Jurusan.findAll();
      res
        .status(200)
        .json({ message: "Succsesfully get data jurusan", data: jurusan });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  postOne: async (req, res) => {
    try {
      const jurusan = await Jurusan.create({
        kd_jurusan: req.body.kd_jurusan,
        nama_jurusan: req.body.nama_jurusan,
      });
      res.status(201).json({
        message: "Berhasil menambahkan data jurusan",
        data: jurusan,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  postMany: async (req, res) => {
    try {
      const jurusan = await Jurusan.bulkCreate(req.body);
      res.status(201).json({
        message: "Berhasil menambahkan data jurusan",
        data: jurusan,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = jurusanController;
