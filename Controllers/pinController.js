const Pin = require("../models/pinModel");

exports.createPin = async (req, res) => {
  try {
    const { title, description, imageUrl, tags } = req.body;

    // Ensure all required fields are provided
    if (!title || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Title and imageUrl are required." });
    }

    // Create a new pin
    const newPin = new Pin({
      title,
      description,
      imageUrl,
      tags: tags ? tags.split(",") : [], // Convert comma-separated tags to array
      createdBy: req.user._id, // Attach the logged-in user as the creator
    });

    // Save the pin to the database
    await newPin.save();

    // Respond with the newly created pin
    res.status(201).json({ message: "Pin created successfully", pin: newPin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePin = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    const updatedPin = await Pin.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, tags: tags.split(",") },
      { new: true }
    );

    if (!updatedPin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    res.status(200).json({ message: "Pin updated successfully", updatedPin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(404).send("Pin not found.");
    }
    res.json(pin);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletePin = async (req, res) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    res.status(200).send("Pin deleted successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.searchPins = async (req, res) => {
  try {
    const { name, tags } = req.query;

    // Search based on name or tag
    const query = {};
    if (name) {
      query.title = { $regex: name, $options: "i" }; // Partial search based on the name
    }
    if (tags) {
      query.tags = { $in: tags.split(",") }; // Partial search based on tags
    }

    const pins = await Pin.find(query);

    if (pins.length === 0) {
      return res.status(404).json({ message: "No pins found" });
    }

    res.status(200).json(pins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
