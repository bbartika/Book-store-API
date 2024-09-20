const { Cart, Cart_Items, Books } = require('../models');

const sequelize=require('../utils/database')

function isStringNotValid(string){
    if(string===undefined || string.length===0){
        return true
    }
    else{
        return false
    }
}


exports.addToCart = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { book_id, book_name, quantity, price } = req.body;
    
    if (isStringNotValid(book_id) || isStringNotValid(book_name) || isStringNotValid(quantity) || isStringNotValid(price)) {
      return res.status(400).json({ error: 'Something is missing' });
    }
    
    const book = await Books.findByPk(book_id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if(Number(book.stock_quantity)==0){
      return res.status(400).json({message: "Out of stock"});
    }
    
    // Check if the user already has a cart
    let cart = await Cart.findOne({ where: { user_id: req.user.id } });
    
    // If the cart doesn't exist, create a new cart for the user
    if (!cart) {
      cart = await Cart.create({ user_id: req.user.id }, { transaction });
    }

    const cartItem = await Cart_Items.findOne({
      where: {
        cart_id: cart.id,
        book_id: book_id
      }
    });

    if (cartItem) {
      // Update the quantity
      const newQuantity = Number(cartItem.quantity) + Number(quantity);
      const newPrice = Number(newQuantity) * Number(price);

      await Cart_Items.update({
        quantity: newQuantity,
        price: newPrice
      }, { 
        where: { id: cartItem.id },
        transaction
      });
      
      const newStockQuantity = Number(book.stock_quantity) - Number(quantity);

      await Books.update({
        stock_quantity: newStockQuantity
      }, {
        where: { book_id: book_id }, // Adjusted the field name to 'id'
        transaction
      });

    } else {
      await Cart_Items.create({
        cart_id: cart.id,
        book_id: book_id,
        book_name: book_name,
        quantity: quantity,
        price: price
      }, { transaction });
      
      const newStockQuantity = Number(book.stock_quantity) - Number(quantity);

      await Books.update({
        stock_quantity: newStockQuantity
      }, {
        where: { book_id: book_id }, // Adjusted the field name to 'id'
        transaction
      });
    }

    await transaction.commit(); // Commit transaction only once

    return res.status(200).json({ message: 'Book added to cart successfully' });

  } catch (err) {
    await transaction.rollback(); // Rollback transaction if an error occurs
    console.error('Transaction failed:', err);
    res.status(500).json({ error: 'Transaction failed', details: err.message });
  }
};


exports.getCartDetails=async(req,res)=>{
    
    // const user=req.user
    // const userId = user.id
    
    try{
        
        const cart = await Cart.findOne({where:{user_id:req.user.id}});

        const cartItems = await Cart_Items.findAll({where:{cart_id:cart.id}});
        
        
     
        const cartList = await cartItems.map((item)=>{
            return {
                cart_id: item.cart_id,
                book_id:item.book_id,
                book_name:item.book_name,
                quantity:item.quantity,
                price:item.price
            }
        })
        
         
        res.status(200).json(cartList);
    }
    catch(err){
        res.status(500).json({error:err})
    }

}

exports.removeFromCart = async(req,res)=>{
    const transaction = await sequelize.transaction();
    
    // const user=req.user;
    // const userId = user.id;
    // const itemId = req.params.itemId;
    
    try{
      
        const cart = await Cart.findOne({where:{user_id:req.user.id}});

        const cartItem = await Cart_Items.findOne({where:{cart_id:cart.id,book_id:req.params.itemId},transaction});
         
        const book = await Books.findByPk(cartItem.book_id);
        if (!book) {
           return res.status(404).json({ error: 'Book not found' });
        }

        if (cartItem) {
            // Update the quantity
      
            const newstock_quantity = Number(book.stock_quantity) + Number(cartItem.quantity);
          
          await Books.update({
            stock_quantity:newstock_quantity
          },{
            where:{book_id:book.book_id},
            transaction:transaction
          });

           
          
          await cartItem.destroy();
           
          

          await transaction.commit();


          } 
          else {
            await transaction.rollback();

        
            return res.status(404).json({error:'Cart Item not found'});
        }

        
        
        res.status(204).end();

    }
    catch(err){
        res.status(500).json({error:err})
    }

}


// {
    
//   "name": "Jalima",
//   "email": "jalima56@gmail.com",
//   "password": "ab12"
// }
