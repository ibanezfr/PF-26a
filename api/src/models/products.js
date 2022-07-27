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
            type: DataTypes.TEXT,
            allowNull: false
        },
        image2: {
            type: DataTypes.TEXT
        },
        image3: {
            type: DataTypes.TEXT
        },
        image4: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },
        { timestamps: false })

};
