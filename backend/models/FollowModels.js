module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted"),
      defaultValue: "pending",
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Follow;
};
