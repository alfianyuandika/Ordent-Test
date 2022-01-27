const { author } = require("../db/models");

class AuthorController {
  async createAuthor(req, res) {
    try {
      let createdData = await author.create({
        nama: req.body.nama,
      });

      let data = await author.findOne({
        where: {
          id: createdData.id,
        },
        attributes: ["nama"],
      });

      return res.status(201).json({
        message: "Author berhasil ditambahkan",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getOneAuthor(req, res) {
    try {
      let data = await author.findOne({
        where: { id: req.params.id },
        attributes: ["id", "nama"],
      });
      if (!data) {
        return res.status(404).json({
          message: "Author tidak ditemukan",
        });
      }

      return res.status(201).json({
        message: "Berhasil",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAllAuthor(req, res) {
    try {
      let data = await author.findAll({
        attributes: ["id", "nama"],
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "Author tidak ditemukan",
        });
      }
      return res.status(200).json({
        message: "Berhasil",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async updateAuthor(req, res) {
    let update = {
      nama: req.body.nama,
    };
    try {
      let data = await author.update(update, {
        where: { id: req.params.id },
      });
      const nama = update.nama;

      return res.status(201).json({
        message: "Update author berhasil",
        nama,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  async deleteAuthor(req, res) {
    try {
      let data = await author.destroy({
        where: { id: req.params.id },
      });

      return res.status(201).json({
        message: "Delete author berhasil",
      });
    } catch (e) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new AuthorController();
