const express = require("express");
const router = express.Router();
const pinController = require("../controllers/pinController");
const upload = require("../controllers/uploadController");
const authController = require("../controllers/authController");

router.post(
  "/create",
  authController.protect, // Middleware to protect route
  upload.single("image"), // Middleware for file uploads
  pinController.createPin
);

router.put(
  "/update/:id",
  authController.protect, // Middleware to protect route
  upload.single("image"), // Middleware for file uploads
  pinController.updatePin
);

router.delete("/:id", authController.protect, pinController.deletePin);

router.get("/:id", pinController.getPin);

router.get("/search", pinController.searchPins);

module.exports = router;
