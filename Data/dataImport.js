const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../Models/userModel");
const Pin = require("../Models/pinModel");
const Board = require("../Models/boardModel");
const path = require("path");

// Configure dotenv to load environment variables
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

console.log("Resolved config path:", path.resolve(__dirname, "../config.env"));
console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../Data/users.json`, "utf-8")
);
const pins = JSON.parse(
  fs.readFileSync(`${__dirname}/../Data/pins.json`, "utf-8")
);
const boards = JSON.parse(
  fs.readFileSync(`${__dirname}/../Data/boards.json`, "utf-8")
);

const importData = async () => {
  try {
    await User.create(users);
    await Pin.create(pins);
    await Board.create(boards);
    console.log("Data successfully loaded!");
    process.exit(0);
  } catch (err) {
    console.error("Failed to load data:", err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Pin.deleteMany();
    await Board.deleteMany();
    console.log("Data successfully deleted!");
    process.exit(0);
  } catch (err) {
    console.error("Failed to delete data:", err);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
