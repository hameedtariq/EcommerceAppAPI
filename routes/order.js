const express = require('express');
const router = express.Router();
const {getMonthlyIncome,createOrder,updateOrder,deleteOrder, getOrder, getAllOrders} = require('../controllers/orders')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndIsAdmin} = require('../middleware/VerifyToken')

router.post('/', verifyToken, createOrder)
router.put('/:id', verifyTokenAndIsAdmin, updateOrder)
router.delete('/:id', verifyTokenAndIsAdmin, deleteOrder)
router.get('/income', verifyTokenAndIsAdmin, getMonthlyIncome)
router.get('/:id',verifyTokenAndAuthorization,getOrder)
router.get('/',verifyTokenAndIsAdmin, getAllOrders)



module.exports = router;