const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('ticket', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true
        },
        teamOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leagues: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageTwo: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        hour: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        stadium: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT
        },
        address: {
            type: DataTypes.STRING,           
            allowNull: false
        },
        chair: { 
            type: DataTypes.STRING,       
            allowNull: false         
        },
       status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active",
            allowNull: false
        } ,
        stock: {
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