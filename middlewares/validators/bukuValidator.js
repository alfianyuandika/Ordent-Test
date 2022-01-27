const { buku, author, genre } = require("../../db/models");
const validator = require("validator");

exports.create = async (req, res, next) => {
  try {
    let findData = await Promise.all([
      author.findOne({
        where: {
          id: req.body.id_author,
        },
      }),
      genre.findOne({
        where: {
          id: req.body.id_genre,
        },
      }),
    ]);

    let errors = [];

    if (!findData[0]) {
      errors.push("Author tidak ditemukan");
    }

    if (!findData[1]) {
      errors.push("Genre tidak ditemukan");
    }

    if (!validator.isNumeric(req.body.stok)) {
      errors.push("Stok harus dalam bentuk angka");
    }

    if (!validator.isDate(req.body.tanggal_terbit)) {
      errors.push("Penulisan tanggal terbit harus sesuai (YYYY/MM/DD)");
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

exports.update = async (req, res, next) => {
  try {
    let findData = await Promise.all([
      author.findOne({
        where: {
          id: req.body.id_author,
        },
      }),
      genre.findOne({
        where: {
          id: req.body.id_genre,
        },
      }),
      buku.findOne({
        where: {
          id: req.params.id,
        },
      }),
    ]);

    let errors = [];

    if (!findData[0]) {
      errors.push("Author tidak ditemukan");
    }

    if (!findData[1]) {
      errors.push("Genre tidak ditemukan");
    }

    if (!findData[2]) {
      errors.push("Buku tidak ditemukan");
    }

    if (!validator.isNumeric(req.body.stok)) {
      errors.push("Stok harus dalam bentuk angka");
    }

    if (!validator.isDate(req.body.tanggal_terbit)) {
      errors.push("Penulisan tanggal terbit harus sesuai (YYYY/MM/DD)");
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

exports.delete = async (req, res, next) => {
  try {
    let findData = await buku.findOne({
      where: { id: req.params.id },
    });

    if (!findData) {
      return res.status(404).json({
        message: "Buku Not Found",
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
