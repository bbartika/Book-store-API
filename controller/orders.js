const { Cart, Cart_Items, Order,Order_Items } = require('../models');
const sequelize = require('../utils/database');




exports.placeOrder = async (req, res) => {
    const user = req.user;
    const userId = user.id;

    // Start a transaction for placing an order
    const transaction = await sequelize.transaction();

    try {
        const cart = await Cart.findOne({ where: { user_id: userId } });

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItems = await Cart_Items.findAll({ where: { cart_id: cart.id } });

        // Check if the cart is empty
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "No items in the cart" });
        }

        const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);

        // Create a new order
        const order = await Order.create({
            user_id: userId,
            total_price: totalPrice,
            status: 'success'
        }, { transaction });

        // Prepare order items from the cart
        const orderItems = cartItems.map(item => ({
            order_id: order.id,
            book_id: item.book_id,
            book_name: item.book_name,
            quantity: item.quantity,
            price: item.price
        }));

        // Insert order items into the order_items table
        await Order_Items.bulkCreate(orderItems, { transaction });

        // Clear the cart after placing the order
        await Cart_Items.destroy({ where: { cart_id: cart.id }, transaction });

        // Commit the transaction
        await transaction.commit();

        res.status(200).send('Order placed successfully');
    } catch (err) {
        await transaction.rollback(); // Roll back the transaction in case of any error
        res.status(500).json({ error: err.message });
    }
};


exports.ordersHistory=async(req,res)=>{
    
    const user=req.user
    const userId = user.id
    
    try{
        
        
        const orders = await Order.findAll({where:{user_id:userId}});
        
        const orderList = await orders.map((item)=>{
            return {
                id:item.id,
                user_id: item.user_id,
                total_price:item.total_price,
                status:item.status
            }
        })
        
         
        res.status(200).json(orderList);
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

exports.getOrderDetails = async(req,res)=>{
    
    const user=req.user;
    const userId = user.id;
    
    const orderId = req.params.id;
    
    try{
        
        
        const order = await Order.findOne({where:{id:orderId,user_id:userId}});

        const orderDetails = await Order_Items.findAll({where:{order_id:order.id}});
        
        res.status(200).json(orderDetails);
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

