const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('books_store','root','uitIT$1822', {
    
    host:'localhost',
    dialect:'mysql',
    logging:false,
});

module.exports = sequelize;
