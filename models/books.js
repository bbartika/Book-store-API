const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('Book', {
        book_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        book_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        stock_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        
          
        price: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        
      });
      
};
