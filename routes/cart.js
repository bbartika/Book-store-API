const express=require('express')
const router=express.Router()

const cartController=require('../controller/cart')
const userAuthentication=require('../middleware/authen')


router.post('/cart',userAuthentication.authenticate,cartController.addToCart)
router.get('/cart',userAuthentication.authenticate,cartController.getCartDetails )
router.delete('/cart/:itemId',userAuthentication.authenticate,cartController.removeFromCart)



module.exports=router
