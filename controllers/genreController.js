const { genre } = require("../db/models");

class GenreController {
  async createGenre(req, res) {
    try {
      let createdData = await genre.create({
        nama_genre: req.body.nama_genre,
      });

      let data = await genre.findOne({
        where: {
          id: createdData.id,
        },
        attributes: ["id", "nama_genre", "createdAt", "updatedAt"],
      });

      return res.status(201).json({
        message: "Genre berhasil ditambahkan",
        data,
        genre,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getOneGenre(req, res) {
    try {
      let data = await genre.findOne({
        where: { id: req.params.id },
        attributes: ["nama_genre", "createdAt", "updatedAt"],
      });
      if (!data) {
        return res.status(404).json({
          message: "Genre tidak ditemukan",
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

  async getAllGenre(req, res) {
    try {
      let data = await genre.findAll({
        attributes: ["id", "nama_genre", "createdAt", "updatedAt"],
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "Genre tidak ditemukan",
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

  async updateGenre(req, res) {
    let update = {
      nama_genre: req.body.nama_genre,
    };
    try {
      let data = await genre.update(update, {
        where: { id: req.params.id },
        attributes: ["id", "nama_genre", "createdAt", "updatedAt"],
      });
      const nama_genre = update.nama_genre;

      return res.status(201).json({
        message: "Update genre berhasil",
        data,
        nama_genre,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  async deleteGenre(req, res) {
    try {
      let data = await genre.destroy({
        where: { id: req.params.id },
      });

      return res.status(201).json({
        message: "Delete genre berhasil",
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

module.exports = new GenreController();
