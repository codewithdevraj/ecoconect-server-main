const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { fullName, email, password, phoneNumber, birthDate, gender, address } =
    req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      fullName,
      email,
      password,
      phoneNumber,
      birthDate,
      gender,
      address,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload,
      "ecoconecthub1001",
      { expiresIn: "5h" },
      (err, token) => {
      if (err) throw err;
      res.json({
        token,
        msg: "User created successfully",
        userId: user._id,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload,
      "ecoconecthub1001",
      { expiresIn: "5h" },
      (err, token) => {
      if (err) throw err;
      res.json({
        token,
        msg: "User logged in successfully",
        userId: user._id,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser };
