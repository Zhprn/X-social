module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {
    follower_id: {
      type: DataTypes.INTEGER,
    },
    following_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return Follow;
};
