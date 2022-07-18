const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('match', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true
        },
        home: {
            type: DataTypes.STRING,
            allowNull: false
        },
        guest: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_home: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_guest: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        winner: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        league: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        phase: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        created: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        { timestamps: false })

};