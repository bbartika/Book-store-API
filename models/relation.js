const sequelize = require("../utils/database");

// Import models
const User = require("./user")(sequelize);
const Books = require("./books")(sequelize);
const Cart = require("./cart")(sequelize);
const Cart_Items = require("./cart_items")(sequelize);
const Order = require("./order")(sequelize);
const Order_Items = require("./order_items")(sequelize);

Cart_Items.belongsTo(Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
Cart.hasMany(Cart_Items, {foreignKey: 'cart_id', onDelete: 'CASCADE'});

Cart_Items.belongsTo(Books, { foreignKey: 'book_id', onDelete: 'CASCADE' });

Cart.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' }); 

Order_Items.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(Order_Items, {foreignKey:'order_id' });

Order_Items.belongsTo(Books, { foreignKey: 'book_id', onDelete: 'CASCADE' });

Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' }); 

module.exports = {
  sequelize,
  User,
  Books,
  Cart,
  Cart_Items,
  Order,
  Order_Items,
};


