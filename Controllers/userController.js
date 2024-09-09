const User = require("../models/userModel");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Assuming the registered user is uploading the image
      { profileImage: imageUrl },
      { new: true }
    );

    res.status(200).json({ message: "Profile image updated", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
