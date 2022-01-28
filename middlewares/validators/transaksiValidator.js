const { author, buku, genre, transaksi, user } = require("../../db/models");
const validator = require("validator");

exports.create = async (req, res, next) => {
  try {
    let findData = await Promise.all([
      buku.findOne({
        where: { id: req.body.id_buku },
      }),
      user.findOne({
        where: { id: req.user.id },
      }),
    ]);

   
    let errors = [];

    if (!findData[0] || findData[0].stok < 1) {
      errors.push("Stok buku sedang kosong atau Judul buku tidak ditemukan");
    }
   
    if (!findData[1]) {
      errors.push("User tidak ditemukan");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
   console.log("test error :", e)
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

exports.getAllUserTransaksi = async (req, res, next) => {
  try {
    let findData = await transaksi.findAll({
      where: { id_user: req.body.id_user },
    });

    if (!findData) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
