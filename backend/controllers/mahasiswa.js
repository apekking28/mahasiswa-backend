const Mahasiswa = require("../models/mahasiswa");
const Jurusan = require("../models/jurusan");
const { Op } = require("sequelize");

const mahasiswaController = {
  getAll: async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.findAll({
        attributes: [
          ["nim", "nimMahasiswa"],
          ["nama", "namaMahasiswa"],
          ["kd_jurusan", "kodeJurusan"],
          ["alamat", "alamat"],
          ["angkatan", "tahunAngkatan"],
          ["foto", "fotoMahasiswa"],
        ],
        // include: [{ model: Jurusan, as: "jurusan" }],
        where: {
          angkatan: { [Op.between]: [2018, 2022] },
        },
        order: [["angkatan", "asc"]],
        // limit: 2,
      });

      if (mahasiswa.length > 0) {
        res.status(200).json({
          message: "Get all data mahasiswa",
          data: mahasiswa,
        });
      } else {
        res.status(200).json({
          message: "data tidak ada",
          data: mahasiswa,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  search: async (req, res) => {
    try {
      const search = req.query.search;
      const resultMahasiswa = await Mahasiswa.findAll({
        attributes: [
          ["nim", "nimMahasiswa"],
          ["nama", "namaMahasiswa"],
          ["kd_jurusan", "kodeJurusan"],
          ["alamat", "alamat"],
          ["angkatan", "tahunAngkatan"],
        ],
        where: {
          [Op.or]: [
            {
              nim: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              nama: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });

      if (!resultMahasiswa) {
        return res.status(200).json({
          message: "Mahasiswa tidak di temukan",
          data: [],
        });
      }

      res.status(200).json({
        message: "Mahasiswa  di temukan",
        data: resultMahasiswa,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.findOne({
        where: { nim: req.params.nim },
      });

      if (!mahasiswa) {
        return res.status(200).json({
          message: "data tidak ada",
          data: [],
        });
      }

      res.status(200).json({
        message: "Get data mahasiswa",
        data: mahasiswa,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  post: async (req, res) => {
    console.log(req.file);
    try {
      const mahasiswa = await Mahasiswa.create({
        nim: req.body.nim,
        nama: req.body.nama,
        kd_jurusan: req.body.kd_jurusan,
        alamat: req.body.alamat,
        angkatan: req.body.angkatan,
        foto: req.file.path,
      });

      res.status(201).json({
        message: "Berhasil menambahkan data mahasiswa",
        data: mahasiswa,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  put: async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.update(
        {
          nama: req.body.nama,
          jurusan: req.body.jurusan,
        },
        { where: { nim: req.params.nim } }
      );

      res.status(200).json({
        message: "Berhasil memperbarui data mahasiswa",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const mahasiswa = await Mahasiswa.destroy({
        where: { nim: req.params.nim },
      });

      res.status(200).json({
        message: "Berhasil menghapus data mahasiswa",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = mahasiswaController;
