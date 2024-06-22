const { roleEnum } = require("../helpers/enums");

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM,
            values: roleEnum,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    });

    return Users;
};