const express=require('express');
const router=express.Router();

const booksController=require('../controller/books');



router.get('/books',booksController.listAllBooks);
router.get('/books/:id',booksController.getDetailsofBook);


module.exports=router;
