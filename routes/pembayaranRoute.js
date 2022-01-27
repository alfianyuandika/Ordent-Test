const express = require("express"); 
const router = express.Router(); 

const pembayaranController = require("../controllers/pembayaranController");

const auth = require("../middlewares/auth");

router.post("/:id", auth.user, pembayaranController.create);

module.exports = router;
