const { author, buku, genre, transaksi, user } = require("../../db/models");
const validator = require("validator");

module.exports.create = async (req, res, next) => {
  try {
    let findData = await Promise.all([
      buku.findOne({
        where: { id: req.body.id_buku },
      }),
      user.findOne({
        where: { id: req.user.id },
      }),
    ]);

    console.log("data", findData[0].dataValues.stok);
    let errors = [];

    if (!findData[0]) {
      errors.push("Buku tidak ditemukan");
    }

    if (findData[0].dataValues.stok < 1) {
      errors.push("Stok buku sedang kosong");
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
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
