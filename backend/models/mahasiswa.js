const Sequelize = require("sequelize");
const db = require("../config/database");
const jurusan = require("./jurusan");

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nim: { type: Sequelize.INTEGER, primaryKey: true },
    nama: Sequelize.STRING,
    kd_jurusan: Sequelize.STRING,
    alamat: Sequelize.STRING,
    angkatan: Sequelize.STRING,
    foto: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Mahasiswa.hasOne(jurusan, { foreignKey: "kd_jurusan" });
Mahasiswa.belongsTo(jurusan, { foreignKey: "kd_jurusan" });

Mahasiswa.removeAttribute("id");
module.exports = Mahasiswa;

(async () => {
  await Mahasiswa.sync();
})();
