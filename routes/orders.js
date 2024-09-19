const express=require('express')
const router=express.Router()

const ordersController=require('../controller/orders')
const userAuthentication=require('../middleware/authen')


router.post('/orders',userAuthentication.authenticate,ordersController.placeOrder)
router.get('/orders',userAuthentication.authenticate,ordersController.ordersHistory)
router.get('/orders/:id',userAuthentication.authenticate,ordersController.getOrderDetails)



module.exports=router
