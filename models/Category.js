const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
