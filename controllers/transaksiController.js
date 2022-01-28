const {
  transaksi,
  buku,
  author,
  genre,
  user,
  sequelize,
} = require("../db/models");

class TransaksiController {
  async createTransaksi(req, res) {
    let transaction = await sequelize.transaction();
    try {
      let createdData = await transaksi.create({
        id_user: req.user.id,
        id_buku: req.body.id_buku,
      });

      let data = await transaksi.findOne({
        where: { id: createdData.dataValues.id },
        attributes: ["id", ["createdAt", "tanggal_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["id", "judul", "edisi", "tanggal_terbit"],
            include: [
              {
                model: author,
                attributes: ["id", "nama"],
              },
              {
                model: genre,
                attributes: ["id", "nama_genre"],
              },
            ],
          },
          {
            model: user,
            attributes: ["id", "nama"],
          },
        ],
      });

      await buku.decrement("stok", {
        where: { id: req.body.id_buku },
        transaction,
      });
      transaction.commit();

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      transaction.rollback();
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAllTransaksi(req, res) {
    try {
      let data = await transaksi.findAll({
        attributes: ["id", ["createdAt", "tanggal_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["judul", "edisi", "tanggal_terbit"],
            include: [
              {
                model: author,
                attributes: ["id", "nama"],
              },
              {
                model: genre,
                attributes: ["id", "nama_genre"],
              },
            ],
          },
          {
            model: user,
            attributes: ["id", "nama"],
          },
        ],
      });

      if (data.length == 0) {
        return res.status(400).json({
          message: "Transaksi tidak ditemukan",
        });
      } else {
        return res.status(200).json({
          message: "Berhasil",
          data,
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getOneTransaksi(req, res) {
    try {
      let data = await transaksi.findOne({
        where: { id: req.params.id },

        attributes: ["id", ["createdAt", "tanggal_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["judul", "edisi", "tanggal_terbit"],
            include: [
              {
                model: author,
                attributes: ["id", "nama"],
              },
              {
                model: genre,
                attributes: ["id", "nama_genre"],
              },
            ],
          },
          {
            model: user,
            attributes: ["id", "nama"],
          },
        ],
      });

      if (!data) {
        return res.status(404).json({
          message: "Transaksi tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAllUserTransaksi(req, res) {
    try {
      let data = await transaksi.findAll({
        where: { id_user: req.body.id_user },

        attributes: ["id", ["createdAt", "tanggal_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["judul", "edisi", "tanggal_terbit"],
            include: [
              {
                model: author,
                attributes: ["id", "nama"],
              },
              {
                model: genre,
                attributes: ["id", "nama_genre"],
              },
            ],
          },
          {
            model: user,
            attributes: ["id", "nama"],
          },
        ],
      });

      if (!data) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getOwnOneTransaksi(req, res) {
    try {
      let data = await transaksi.findOne({
        where: { id: req.params.id, id_user: req.user.id },

        attributes: ["id", ["createdAt", "tanggal_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["judul", "edisi", "tanggal_terbit"],
            include: [
              {
                model: author,
                attributes: ["id", "nama"],
              },
              {
                model: genre,
                attributes: ["id", "nama_genre"],
              },
            ],
          },
          {
            model: user,
            attributes: ["id", "nama"],
          },
        ],
      });

      if (!data) {
        return res.status(404).json({
          message: "Transaksi tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAllOwnTransaksi(req, res) {
    try {
      let data = await transaksi.findAll({
        where: { id_user: req.user.id },

        attributes: ["id", ["createdAt", "tanggal_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["judul", "edisi", "tanggal_terbit"],
            include: [
              {
                model: author,
                attributes: ["id", "nama"],
              },
              {
                model: genre,
                attributes: ["id", "nama_genre"],
              },
            ],
          },
          {
            model: user,
            attributes: ["id", "nama"],
          },
        ],
      });

      if (!data) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "Success",
        data: data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new TransaksiController();
