const express = require('express');
const router = express.Router();
const {createProduct, updateProduct, deleteProduct, getProduct, getAllProducts} = require('../controllers/product')
const {verifyTokenAndIsAdmin} = require('../middleware/VerifyToken')



router.post('/', verifyTokenAndIsAdmin, createProduct)

router.put('/:id', verifyTokenAndIsAdmin, updateProduct)

router.delete('/:id', verifyTokenAndIsAdmin,deleteProduct)

router.get('/:id', getProduct)

router.get('/', getAllProducts)

module.exports = router;