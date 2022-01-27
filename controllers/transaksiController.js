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
    try {
      let findData = await Promise.all([
        buku.findOne({ where: { id: req.body.id_buku } }),
        user.findOne({ where: { id: req.user.id } }),
      ]);

      let errors = [];

      if (!findData[0]) {
        errors.push("Judul buku tidak ditemukan");
      }

      if (!findData[1]) {
        errors.push("User tidak ditemukan");
      }

      if (errors.length > 0) {
        return res.status(404).json({
          message: errors.join(", "),
        });
      }

      let judul = findData[0].judul;
      let edisi = findData[0].edisi;
      let tanggal_terbit = findData[0].tanggal_terbit;
      let stok = findData[0].stok;

      let createdData = await transaksi.create({
        id_user: req.user.id,
        id_buku: req.body.id_buku,
        judul,
        edisi,
        tanggal_terbit,
        stok,
      });
      let data = await transaksi.findOne({
        where: { id: createdData.id },
        attributes: ["id", ["createdAt", "waktu_peminjaman"]],
        include: [
          {
            model: buku,
            attributes: ["id", "judul", "edisi", "tanggal_terbit", "stok"],
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

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getAllTransaksi(req, res) {
    try {
      let data = await transaksi.findAll({
        // where: { id_user: req.user.id },

        attributes: ["id"],
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

        attributes: ["id"],
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
          message: "Transaksi Not Found",
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
      console.log("transaksi error", e);
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new TransaksiController();
