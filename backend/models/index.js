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
db.user.hasMany(db.follow, { foreignKey: "user_id" });
db.post.belongsTo(db.user, { foreignKey: "user_id" });
db.follow.belongsTo(db.user, { foreignKey: "user_id"});
module.exports = db;