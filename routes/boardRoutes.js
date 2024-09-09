const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

router.post("/", boardController.createBoard);
router.get("/:id", boardController.getBoard);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

module.exports = router;
