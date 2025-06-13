const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { full_name, username, password, bio, is_private } = req.body;

    function isAlphaNumeric(str) {
      return /^[a-zA-Z0-9]+$/.test(str);
    }

    if (username.length < 3) {
      return res.status(500).json({ message: "required, min 3 chars, unique, onlpy alphanumeric, dot '.' or underscore '_' allowed" });
    } else if (!isAlphaNumeric(username)) {
        return res.status(500).json({message : "required, min 3 chars, unique, onlpy alphanumeric, dot '.' or underscore '_' allowed"})
    } else if (password.length < 6) {
      return res.status(500).json({ message: "required, min 6 chars" });
    } else if (bio.length > 100) {
        return res.status(500).json({ message : "required, max 100 chars"})
    }

    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      full_name: full_name,
      username: username,
      password: hashpassword,
      bio: bio,
      is_private: is_private,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    const cPassword = await bcrypt.compare(password, user.password);

    if (!cPassword) {
      res.status(500).json({ message: "password wrong" });
    }

    const refresh_token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.refresh_token = refresh_token;
    await user.save();

    res.json({
      message: "Login Succes",
      refresh_token,
      user: {
        id: user.id,
        full_name : user.fullname,
        username: user.username,
        bio : user.bio,
        is_private : user.is_private,
        created_at : user.createdAt
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const user = await User.findOne({ where: { refresh_token } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.update(
      { refresh_token: null },
      { where: { id: user.id } }
    );

    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "full_name"], // Ambil kolom yang dibutuhkan saja
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Gagal mengambil daftar user" });
  }
};
