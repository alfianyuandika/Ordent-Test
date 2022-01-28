const { buku, author, genre } = require("../../db/models");
const validator = require("validator");

exports.delete = async (req, res, next) => {
  try {
    let findData = await buku.findOne({
      where: { id: req.body.id_user },
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
