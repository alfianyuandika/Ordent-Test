const express = require("express");
const router = express.Router();

const transaksiValidator = require("../middlewares/validators/transaksiValidator");

const transaksiController = require("../controllers/transaksiController");

const auth = require("../middlewares/auth");

router.post(
  "/order",
  auth.peminjam,
  transaksiValidator.create,
  transaksiController.createTransaksi
);

router.get("/", auth.admin, transaksiController.getAllTransaksi);

router.get("/:id", auth.admin, transaksiController.getOneTransaksi);

router.get("/transaksi/user", auth.admin, transaksiValidator.getAllUserTransaksi, transaksiController.getAllUserTransaksi);

router.get("/own/:id", auth.peminjam, transaksiController.getOwnOneTransaksi);

router.get("/own/own/all", auth.peminjam, transaksiController.getAllOwnTransaksi);

module.exports = router;
