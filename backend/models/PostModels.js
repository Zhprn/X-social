module.exports = (Sequelize, DataTypes) => {
    const post = Sequelize.define('post', {
        caption : {
            type : DataTypes.STRING,
        },
        attachment : {
            type : DataTypes.STRING,
        },
        user_id : {
            type : DataTypes.INTEGER,
        }
    });

    return post;
}