const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('OrderItem', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        book_id: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        book_name:{
          type:DataTypes.STRING,
          allowNull:false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false
        }
      });
};
