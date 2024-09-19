const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('Order', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        total_price: {
          type: DataTypes.FLOAT,
          defaultValue: 0
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: 'pending'
        }
      });
      
      
};
