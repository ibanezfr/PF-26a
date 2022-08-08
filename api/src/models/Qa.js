const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('qa', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: "",
        },
        answer: {
            type: DataTypes.TEXT,
            defaultValue: "",
        },
        resolved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }),
        { timestamps: false }
};