const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('product_values', {
        size: {
            type: DataTypes.STRING,
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
