const { buku, author, genre } = require("../../db/models");
const validator = require("validator");

exports.update = async (req, res, next) => {
  try {
    let findData = await author.findOne({
      where: { id: req.params.id },
    });

    if (!findData) {
      return res.status(404).json({
        message: "Author tidak ditemukan",
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

exports.delete = async (req, res, next) => {
  try {
    let findData = await author.findOne({
      where: { id: req.params.id },
    });

    if (!findData) {
      return res.status(404).json({
        message: "Author tidak ditemukan",
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
