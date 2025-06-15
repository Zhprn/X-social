const db = require("../models");
const User = db.user;
const Follow = db.follow;

exports.follow = async (req, res) => {
  const userId = req.cookies.id;
  const { username } = req.params;

  if (!userId) return res.status(401).json({ message: "Unauthenticated." });

  const target = await User.findOne({ where: { username } });
  if (!target) return res.status(404).json({ message: "User not found" });

  if (target.id == userId) {
    return res.status(422).json({ message: "You are not allowed to follow yourself" });
  }

  const existing = await Follow.findOne({
    where: { follower_id: userId, following_id: target.id },
  });

  if (existing) {
    return res.status(422).json({
      message: "You are already followed",
      status: existing.status,
    });
  }

  await Follow.create({
    follower_id: userId,
    following_id: target.id,
    status: "requested",
  });

  res.status(200).json({
    message: "Follow success",
    status: "requested",
  });
};

exports.unfollow = async (req, res) => {
  const userId = req.cookies.id;
  const { username } = req.params;

  if (!userId) return res.status(401).json({ message: "Unauthenticated." });

  const target = await User.findOne({ where: { username } });
  if (!target) return res.status(404).json({ message: "User not found" });

  const follow = await Follow.findOne({
    where: { follower_id: userId, following_id: target.id },
  });

  if (!follow) {
    return res.status(422).json({ message: "You are not following the user" });
  }

  await follow.destroy();
  res.status(204).send();
};

exports.getFollow = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const followersCount = await Follow.count({
      where: { following_id: user.id },
    });

    const followingCount = await Follow.count({
      where: { follower_id: user.id },
    });

    const followersList = await Follow.findAll({
      where: { following_id: user.id },
      include: [
        {
          model: User,
          as: "Follower",
          attributes: ["id", "username", "full_name"],
        },
      ],
    });

    const followingList = await Follow.findAll({
      where: { follower_id: user.id },
      include: [
        {
          model: User,
          as: "Following",
          attributes: ["id", "username", "full_name"],
        },
      ],
    });

    const followers = followersList.map((item) => ({
      id: item.Follower.id,
      username: item.Follower.username,
      full_name: item.Follower.full_name,
      status: item.status,
    }));

    const following = followingList.map((item) => ({
      id: item.Following.id,
      username: item.Following.username,
      full_name: item.Following.full_name,
      status: item.status,
    }));

    res.status(200).json({
      followersCount,
      followingCount,
      followers,
      following,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.acceptFollow = async (req, res) => {
  try {
    const userId = req.cookies.id;
    const { username } = req.params;

    if (!userId)
      return res.status(401).json({ message: "Unauthenticated." });

    const requester = await User.findOne({ where: { username } });
    if (!requester)
      return res.status(404).json({ message: "User not found" });

    const follow = await Follow.findOne({
      where: {
        follower_id: requester.id,
        following_id: userId,
      },
    });

    if (!follow)
      return res.status(422).json({ message: "The user is not following you" });

    if (follow.status === "following") {
      return res.status(422).json({ message: "Follow request is already accepted" });
    }

    follow.status = "following";
    await follow.save();

    const reverseFollow = await Follow.findOne({
      where: {
        follower_id: userId,
        following_id: requester.id,
      },
    });

    if (!reverseFollow) {
      await Follow.create({
        follower_id: userId,
        following_id: requester.id,
        status: "following",
      });
    }

    return res.status(200).json({ message: "Follow request accepted and followed back" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getFollowStatus = async (req, res) => {
  try {
    const id = req.cookies.id;
    const { username } = req.params;

    if (!id) return res.status(401).json({ message: "Unauthorized" });

    const target = await User.findOne({ where: { username } });
    if (!target) return res.status(404).json({ message: "User not found" });

    const follow = await Follow.findOne({
      where: {
        follower_id: id,
        following_id: target.id,
      },
    });

    if (!follow) return res.json({ status: null });

    return res.json({ status: follow.status });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
