const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { full_name, username, password, bio, is_private } = req.body;

    function isAlphaNumeric(str) {
      return /^[a-zA-Z0-9._]+$/.test(str);
    }

    if (username.length < 3) {
      return res.status(500).json({
        message: "required, min 3 chars, unique, only alphanumeric, dot '.' or underscore '_' allowed"
      });
    } else if (!isAlphaNumeric(username)) {
      return res.status(500).json({
        message: "required, min 3 chars, unique, only alphanumeric, dot '.' or underscore '_' allowed"
      });
    } else if (password.length < 6) {
      return res.status(500).json({ message: "required, min 6 chars" });
    } else if (bio.length > 100) {
      return res.status(500).json({ message: "required, max 100 chars" });
    }

    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      full_name,
      username,
      password: hashpassword,
      bio,
      is_private: is_private ?? false, // default ke false jika undefined
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
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil daftar user" });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.cookies.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. No user_id in cookie." });
  }

  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "full_name", "username", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getOneUser = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: "Bad request. No username provided." });
  }

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "full_name", "username", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getDetailUser = async (req, res) => {
  try {
    const userId = req.cookies.id;
    
  } catch (error) {
    
  }
}