const db = require("../models");
const Post = db.post;
const User = db.user;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.addPost = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { caption } = req.body;

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      const user_id = req.user.id;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "File not uploaded" });
      }

      const filesize = file.size;
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = file.filename;
      const url = `${req.protocol}://${req.get("host")}/public/${filename}`;

      const allowedTypes = [".png", ".jpg", ".jpeg"];
      if (!allowedTypes.includes(ext)) {
        return res
          .status(400)
          .json({ message: "File must be .jpg, .png, or .jpeg" });
      }

      if (filesize > 5_000_000) {
        return res
          .status(400)
          .json({ message: "File size must be less than 5MB" });
      }

      const post = await Post.create({
        caption,
        attachment: url,
        user_id,
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "full_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Hapus file gambar dari folder public jika ada
    if (post.attachment) {
      const filename = post.attachment.split("/public/")[1];
      const filePath = path.join(__dirname, "..", "public", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Post.destroy({ where: { id } });

    res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
