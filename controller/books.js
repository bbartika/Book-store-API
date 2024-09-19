const { Books }  = require('../models');
const sequelize=require('../utils/database')



exports.listAllBooks=async(req,res)=>{
    
    try{ 
        
        const books = await Books.findAll();
        
        const bookList = await books.map((book)=>{
            return {
                book_id: book.book_id,
                book_name:book.book_name,
                stock_quantity:book.stock_quantity,
                price:book.price
            }
        })
        
         
        res.status(200).json(bookList);
    }
    catch(err){
        res.status(500).json({error:err})
    }

}

exports.getDetailsofBook = async (req, res) => {
    //const { book_id } = req.params.id;// Extract the id from the request parameters
    
    try { 
        const book = await Books.findByPk(req.params.id); // Use the extracted id to find the book

        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
}
