const { transaksi, produk, pembayaran, sequelize } = require("../db/models");

class PembayaranController {
  async create(req, res) {
    const transaction = await sequelize.transaction();
    try {
      let data = await transaksi.findOne({
        where: { order_id: req.params.id },
        
      });

      if (data === null) {
        return res.status(400).json({
          message: "You don't have any transaction",
        });
      }
      if (data.status == "paid") {
        return res.status(400).json({
          message: "This transaction has been paid",
        });
      }
     
      let createdData = await pembayaran.create(
        {
          order_id: req.params.id,
          amount: data.amount,
          status: "paid",
        },
        { transaction }
      );

      let transaksiUpdate = await transaksi.update(
        { status: "paid" },
        {
          where: { order_id: req.params.id },
          transaction,
        }
      );

      await produk.decrement("qty", {
        where: { id: data.produk_id },
        transaction,
      });
      transaction.commit();

      return res.status(201).json({
        message: "Success",
        createdData,
      });
    } catch (e) {
      
      transaction.rollback();
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new PembayaranController();
