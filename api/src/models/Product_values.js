const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('product_values', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true
        },
        size: {
            type: DataTypes.ENUM("xs", "s", "m", "l", "xl", "xxl", "xxxl", "único"),
        },
        stock: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
                max: 200
            }
        }
    },
    ),
        { timestamps: false }
};
