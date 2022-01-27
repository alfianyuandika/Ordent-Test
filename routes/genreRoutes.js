const express = require("express");
const router = express.Router();

// const genreValidator = require("../middlewares/validators/genreValidator");

const genreController = require("../controllers/genreController");

// const auth = require("../middlewares/auth");


router.get("/all", genreController.getAllGenre);

router.get("/:id", genreController.getOneGenre);

router.post(
  "/create",
  // auth.admin,
  // genreValidator.create,
  genreController.createGenre
);

router.delete(
  "/delete/:id",
  // auth.admin,
  // genreValidator.delete,
  genreController.deleteGenre
);

router.patch(
  "/update/:id",
  // auth.admin,
  // genreValidator.update,
  genreController.updateGenre
);

module.exports = router;
