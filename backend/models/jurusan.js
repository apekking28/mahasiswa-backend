const Sequelize = require("sequelize");
const db = require("../config/database");

const Jurusan = db.define(
  "jurusan",
  {
    kd_jurusan: { type: Sequelize.STRING, primaryKey: true },
    nama_jurusan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Jurusan.removeAttribute("id");
module.exports = Jurusan;

(async () => {
  await Jurusan.sync();
})();
