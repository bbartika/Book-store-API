const express = require('express');

const sequelize = require('./utils/database');
const fs = require('fs'); // Import fs module to work with the file system
const path = require('path');

//const Books = require('./models/books');


const { Books,Cart, Cart_Items, Order, Order_Items,User } = require('./models');

const userRoute = require('./routes/user');
const booksRoute = require('./routes/books');
const cartRoute = require('./routes/cart');
const ordersRoute = require('./routes/orders');

const app = express();
const port = 3000;

app.use(express.json());



async function syncAndStoreBooks() {
    try {
      // Sync database
      await sequelize.sync({ force: true });
      console.log('Database synchronized');
  
      // Load books from JSON file
      const filePath = path.join(__dirname, 'books.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const bookData = JSON.parse(fileData);
  
      // Map the data to match the Book model structure
      const books = bookData.map(book => ({
    
        book_name: book.book_name,
        stock_quantity: book.book_quantity,
        price: book.book_price
      }));
  
      // Bulk insert into the database
      await Books.bulkCreate(books);
      console.log('Books have been inserted into the database.');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
}
syncAndStoreBooks()
  

app.use('/api/auth', userRoute);
app.use('/api', booksRoute);
app.use('/api', cartRoute);
app.use('/api', ordersRoute);


// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

sequelize.sync({force:true}).then(()=>{
    console.log('Database synchronised');
})
.catch(err => console.error('Error syncing database:',err));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

