const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('statistics', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true
        },
        team: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        twoP: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        threeP: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TL: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        losts: {
            type: DataTypes.INTEGER,           
            allowNull: false
        },
        recovery: {
            type: DataTypes.INTEGER,           
            allowNull: false
        },
        created: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        { timestamps: false })

};