const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const upload = require("../controllers/uploadController");

router.put(
  "/profile/upload",
  upload.single("profileImage"),
  userController.uploadProfileImage
);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
