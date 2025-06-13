module.exports = (Sequelize, DataTypes) => {
    const user = Sequelize.define('user', {
        full_name : {
            type : DataTypes.STRING
        },
        username : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        },
        bio : {
            type : DataTypes.STRING
        },
        is_private : {
            type : DataTypes.TINYINT
        },
        refresh_token : {
            type : DataTypes.STRING
        }
    });

    return user;
}