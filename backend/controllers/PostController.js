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
    const userId = parseInt(req.cookies.id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const posts = await db.post.findAll({
      include: [
        {
          model: db.user,
          attributes: ["id", "username", "full_name", "is_private"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const follows = await db.follow.findAll({
      where: { follower_id: userId },
    });

    const result = posts.map((post) => {
      const postUser = post.user;
      let status = null;

      // Jangan tampilkan kalau user privat dan belum difollow
      const followEntry = follows.find((f) => f.following_id === postUser.id);
      if (followEntry) {
        status = followEntry.status; // 'requested' / 'following'
      }

      return {
        id: post.id,
        caption: post.caption,
        attachment: post.attachment,
        createdAt: post.createdAt,
        user: {
          id: postUser.id,
          username: postUser.username,
          full_name: postUser.full_name,
          is_private: postUser.is_private,
        },
        status, // <- INI dia status follow (null/requested/following)
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
