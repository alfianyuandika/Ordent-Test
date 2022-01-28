const express = require("express");
const router = express.Router();

const genreValidator = require("../middlewares/validators/genreValidator");

const genreController = require("../controllers/genreController");

const auth = require("../middlewares/auth");

router.get("/all", genreController.getAllGenre);

router.get("/:id", genreController.getOneGenre);

router.post("/create", auth.admin, genreController.createGenre);

router.patch("/update/:id", auth.admin, genreValidator.update, genreController.updateGenre);

router.delete("/delete/:id", auth.admin, genreValidator.delete, genreController.deleteGenre);


module.exports = router;
