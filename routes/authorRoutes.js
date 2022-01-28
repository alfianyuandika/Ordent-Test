const express = require("express");
const router = express.Router();

const authorValidator = require("../middlewares/validators/authorValidator");

const authorController = require("../controllers/authorController");

const auth = require("../middlewares/auth");

router.get("/all", authorController.getAllAuthor);

router.get("/:id", authorController.getOneAuthor);

router.post("/create", auth.admin, authorController.createAuthor);

router.delete("/delete/:id", auth.admin, authorValidator.delete, authorController.deleteAuthor);

router.patch("/update/:id", auth.admin, authorValidator.update, authorController.updateAuthor);

module.exports = router;
