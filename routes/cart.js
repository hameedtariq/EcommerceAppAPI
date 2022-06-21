const express = require('express');
const router = express.Router();
const {createCart,updateCart,deleteCart,getCart,getAllCarts} = require('../controllers/cart')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndIsAdmin} = require('../middleware/VerifyToken')

router.post('/', verifyToken, createCart)
router.put('/:id', verifyTokenAndAuthorization, updateCart)
router.delete('/:id', verifyTokenAndAuthorization, deleteCart)

router.get('/:id',verifyTokenAndAuthorization,getCart)
router.get('/',verifyTokenAndIsAdmin, getAllCarts)



module.exports = router;