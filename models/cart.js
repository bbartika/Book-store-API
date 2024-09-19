const { DataTypes } = require('sequelize');



module.exports = (sequelize) =>{
    return sequelize.define('Cart', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull:false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      
      });
      
};
