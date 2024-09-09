const Board = require("../models/boardModel");

exports.createBoard = async (req, res) => {
  try {
    const { title, createdBy } = req.body;
    const board = new Board({ title, createdBy });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating board", error: error.message });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("pins");
    if (!board) {
      return res.status(404).send("Board not found.");
    }
    res.json(board);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.json(board);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.status(200).send("Board deleted successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
