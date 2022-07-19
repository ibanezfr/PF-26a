const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('sellorder', {
        order: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        product: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        review: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        country: {
            type: DataTypes.STRING,
            defaultValue: ""         
        },
        province: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        city: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        street: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        paymentStatus: {
            type: DataTypes.ENUM("pending", "completed", "canceled"),
            defaultValue: "pending"
        },
        orderStatus: {
            type: DataTypes.ENUM("pending", "accepted", "rejected"),
            defaultValue: "pending"
        }
    },{timestamps: false}
    )
};