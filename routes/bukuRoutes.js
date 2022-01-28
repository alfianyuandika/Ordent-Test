const express = require("express");
const router = express.Router();

const bukuValidator = require("../middlewares/validators/bukuValidator");

const bukuController = require("../controllers/bukuController");

const auth = require("../middlewares/auth");


router.get("/all", bukuController.getAllBuku);

router.get("/:id", bukuController.getOneBuku);

router.post(
  "/create",
  auth.admin,
  bukuValidator.create,
  bukuController.createBuku
);

router.delete(
  "/delete/:id",
  auth.admin,
  bukuValidator.delete,
  bukuController.deleteBuku
);

router.patch(
  "/update/:id",
  auth.admin,
  bukuValidator.update,
  bukuController.updateBuku
);

module.exports = router;
