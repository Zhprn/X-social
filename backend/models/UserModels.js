module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    full_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  });
  return user;
};
