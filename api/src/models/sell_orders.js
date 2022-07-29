const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('sell_order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product: {
            type: DataTypes.TEXT,
            allowNull: false,
        },// hacerlo con relacion 
        /* user:{
            type: DataTypes.STRING,
            allowNull: false,
        },// hacerlo con relacion
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        },// revisar
        review: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },*/
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
        },/* 
        paymentStatus: {
            type: DataTypes.ENUM("pending", "completed", "canceled"),
            defaultValue: "pending"
        }, */ //solo se hace el tiquet si se efectuo el pago
        orderStatus: {
            type: DataTypes.ENUM("pending", "accepted", "rejected"),
            defaultValue: "pending"
        }
    },{timestamps: false}
    )
};