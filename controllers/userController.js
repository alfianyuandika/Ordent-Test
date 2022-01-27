const { author, buku, genre, user, transaksi } = require("../db/models");

class UserController {
  async getOneUser(req, res) {
    try {
      let data = await user.findOne({
        where: { id: req.params.id },
        attributes: ["id", "nama", "email", "role"],
      });
      if (!data) {
        return res.status(404).json({
          message: "User tidak ditemukan",
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

  async getAllUser(req, res) {
    try {
      let data = await user.findAll({
        attributes: ["id", "nama", "email", "role"],
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "User tidak ditemukan",
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

  async deleteUser(req, res) {
    try {
      let data = await user.destroy({
        where: { id: req.params.id },
      });

      return res.status(201).json({
        message: "Delete user berhasil",
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

module.exports = new UserController();
