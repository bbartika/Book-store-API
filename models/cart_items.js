const { DataTypes } = require('sequelize');




module.exports = (sequelize) =>{
    return sequelize.define('cartItems', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        cart_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          
        },
        book_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          
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

    


