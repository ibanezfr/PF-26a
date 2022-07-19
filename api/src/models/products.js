const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        color: { 
            type: DataTypes.STRING,         
          
        },

        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 1
        },
       image: { 
            type: DataTypes.STRING,         
            allowNull: false 
        },
        image2: { 
            type: DataTypes.STRING
        },
        image3: { 
            type: DataTypes.STRING
        },
        image4: { 
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        size: {
            type: DataTypes.STRING
        }
    
    },
        { timestamps: false })

};