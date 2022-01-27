const { transaksi, produk, user } = require("../../db/models");
const validator = require("validator");

module.exports.create = async (req, res, next) => {
  try {
    let findData = await Promise.all([
      produk.findOne({
        where: { id: req.body.produk_id },
      }),
    ]);

    let errors = [];

    if (!findData) {
      errors.push("Produk Not Found");
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
