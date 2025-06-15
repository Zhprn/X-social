const { Sequelize, DataTypes } = require ('sequelize');
const sequelize = new Sequelize ('twitter', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
})

const db = [];

db.Sequelize = Sequelize,
db.sequelize = sequelize

db.user = require('./UserModels.js')(sequelize, DataTypes)
db.post = require('./PostModels.js')(sequelize, DataTypes)
db.follow = require('./FollowModels.js')(sequelize, DataTypes)

db.user.hasMany(db.post, { foreignKey: "user_id" });
db.post.belongsTo(db.user, { foreignKey: "user_id" });

// models/index.js (atau wherever you define associations)
db.user.hasMany(db.follow, { foreignKey: "follower_id", as: "Followings" }); // siapa yang dia follow
db.user.hasMany(db.follow, { foreignKey: "following_id", as: "Followers" }); // siapa yang follow dia

db.follow.belongsTo(db.user, { foreignKey: "follower_id", as: "Follower" }); // follow ini dilakukan oleh siapa
db.follow.belongsTo(db.user, { foreignKey: "following_id", as: "Following" }); // follow ini diarahkan ke siapa

module.exports = db;