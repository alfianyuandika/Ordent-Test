const express = require("express");
const router = express.Router();

const userValidator = require("../middlewares/validators/userValidator");

const userController = require("../controllers/userController");

const auth = require("../middlewares/auth");


router.get("/all", auth.admin, userController.getAllUser);

router.get("/:id", auth.admin, userController.getOneUser);

router.delete(
  "/delete/:id",
  auth.admin,
  userValidator.delete,
  userController.deleteUser
);


module.exports = router;
