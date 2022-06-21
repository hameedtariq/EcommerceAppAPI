const express = require('express');
const router = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndIsAdmin} = require('../middleware/VerifyToken')
const {updateUser, deleteUser, getUser,getAllUser, getStats } = require('../controllers/user')


//Update User
router.put('/:id', verifyTokenAndAuthorization, updateUser)


// Delete User

router.delete('/:id',verifyTokenAndAuthorization, deleteUser)





// Get user stats

router.get('/stats', verifyTokenAndIsAdmin, getStats)

// Get user

router.get('/:id', verifyTokenAndIsAdmin, getUser)

// Get all Users

router.get('/', verifyTokenAndIsAdmin, getAllUser)

module.exports = router;