const db = require("../models");
const User = db.user;
const Follow = db.follow;

exports.follow = async (req, res) => {
  try {
    const { username } = req.params;
    const targetUser = await User.findOne({ where: { username } });
    const currentUserId = req.userId;

    if (!targetUser) return res.status(404).json({ message: "User not found" });
    if (targetUser.id === currentUserId)
      return res.status(400).json({ message: "You can't follow yourself" });

    const existing = await Follow.findOne({
      where: {
        follower_id: currentUserId,
        following_id: targetUser.id,
      },
    });

    if (existing) return res.status(400).json({ message: "Already followed" });

    const status = targetUser.is_private ? "pending" : "accepted";
    await Follow.create({
      follower_id: currentUserId,
      following_id: targetUser.id,
      status,
    });

    res.status(201).json({ message: `Follow ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const { username } = req.params;
    const targetUser = await User.findOne({ where: { username } });
    const currentUserId = req.userId;

    if (!targetUser) return res.status(404).json({ message: "User not found" });

    await Follow.destroy({
      where: {
        follower_id: currentUserId,
        following_id: targetUser.id,
      },
    });

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFollow = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const follows = await Follow.findAll({
      where: { follower_id: currentUserId },
    });
    res.status(200).json(follows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accFollow = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.userId;

    const followerUser = await User.findOne({ where: { username } });
    if (!followerUser)
      return res.status(404).json({ message: "User not found" });

    const follow = await Follow.findOne({
      where: {
        follower_id: followerUser.id,
        following_id: currentUserId,
        status: "pending",
      },
    });

    if (!follow) return res.status(404).json({ message: "Follow request not found" });

    follow.status = "accepted";
    await follow.save();

    res.status(200).json({ message: "Follow request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const followers = await Follow.findAll({
      where: {
        following_id: user.id,
        status: "accepted",
      },
      include: [
        {
          model: User,
          as: "Follower",
          attributes: ["id", "full_name", "username"],
        },
      ],
    });

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
