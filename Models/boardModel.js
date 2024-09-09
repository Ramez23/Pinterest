const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }],
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
