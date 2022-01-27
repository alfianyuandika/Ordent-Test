const express = require("express");
const router = express.Router();

const buku = require("./bukuRoutes");
const genre = require("./genreRoutes");
const auth = require("./authRoutes");
const user = require("./userRoutes");
const author = require("./authorRoutes");
const transaksi = require("./transaksiRoutes");
// const pembayaran = require("./pembayaranRoute")

router.use("/buku", buku);
router.use("/genre", genre);
router.use("/auth", auth);
router.use("/user", user);
router.use("/author", author);
router.use("/transaksi", transaksi);
// router.use("/pembayaran", pembayaran)


module.exports = router;
