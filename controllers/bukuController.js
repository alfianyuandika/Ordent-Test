const { buku, author, genre } = require("../db/models");

class BukuController {
  async createBuku(req, res) {
    try {
      let createdData = await buku.create({
        id_author: req.body.id_author,
        judul: req.body.judul,
        edisi: req.body.edisi,
        tanggal_terbit: req.body.tanggal_terbit,
        id_genre: req.body.id_genre,
        stok: req.body.stok,
      });

      let data = await buku.findOne({
        where: {
          id: createdData.id,
        },
        attributes: ["judul", "edisi", "tanggal_terbit", "stok"],
        include: [
          {
            model: author,
            attributes: ["id", "nama"],
          },
          {
            model: genre,
            attributes: ["nama_genre"],
          },
        ],
      });

      return res.status(201).json({
        message: "Buku berhasil ditambahkan",
        data,
      });
    } catch (e) {
      
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getOneBuku(req, res) {
    try {
      let data = await buku.findOne({
        where: { id: req.params.id },
        attributes: ["id", "judul", "edisi", "tanggal_terbit"],
        include: [
          {
            model: author,
            attributes: ["id", "nama"],
          },
          {
            model: genre,
            attributes: ["nama_genre"],
          },
        ],
      });
      if (!data) {
        return res.status(404).json({
          message: "Buku tidak ditemukan",
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

  async getAllBuku(req, res) {
    try {
      let data = await buku.findAll({
        attributes: ["id", "judul", "edisi", "tanggal_terbit"],
        include: [
          {
            model: author,
            attributes: ["id", "nama"],
          },
          {
            model: genre,
            attributes: ["nama_genre"],
          },
        ],
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "Buku tidak ditemukan",
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

  async updateBuku(req, res) {
    let update = {
      id_author: req.body.id_author,
      judul: req.body.judul,
      edisi: req.body.edisi,
      tanggal_terbit: req.body.tanggal_terbit,
      id_genre: req.body.id_genre,
      stok: req.body.stok,
    };
    try {
      let data = await buku.update(update, {
        where: { id: req.params.id },
        attributes: ["id", "judul", "edisi", "tanggal_terbit"],
        include: [
          {
            model: author,
            attributes: ["id", "nama"],
          },
          {
            model: genre,
            attributes: ["nama_genre"],
          },
        ],
      });
      const id_author = update.id_author;
      const judul = update.judul;
      const edisi = update.edisi;
      const tanggal_terbit = update.tanggal_terbit;
      const id_genre = update.id_genre;
      const stok = update.stok;

      return res.status(201).json({
        message: "Update buku berhasil",
        data,
        id_author,
        judul,
        edisi,
        tanggal_terbit,
        id_genre,
        stok,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  async deleteBuku(req, res) {
    try {
      let data = await buku.destroy({
        where: { id: req.params.id },
      });

      return res.status(201).json({
        message: "Delete buku berhasil",
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

module.exports = new BukuController();
