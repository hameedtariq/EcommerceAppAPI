const Cart = require('../models/Cart')

const createCart = async (req,res) => {
    try {
        const cart = await Cart.create({...req.body})
        res.json({
            success: true,
            cart
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            msg: "Unable to create cart. Please try again later."
        })
        
    }
}


const updateCart = async (req,res)=> {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,{
            $set: req.body
          },
          { new: true }
        );
        res.status(200).json({
            success: true,
            msg: "Cart has been updated successfully",
            cart: updatedCart,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                success: false,
                msg: "Cart could not be updated. Please try again later.",
            }
        );
      }
}



const deleteCart = async(req,res)=> {
    try
    {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            msg: "Cart has been deleted successfully"
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "Cart could not be deleted. Please try again later.",
        })
    }
}



const getCart = async (req,res)=> {
    try
    {
        const cart = await Cart.findOne({userId: req.params.id});
        res.status(200).json({
            success: true,
            msg: "Cart has been fetched successfully",
            cart
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "Cart could not be fetched. Please try again later.",
        })
    }
}

const getAllCarts = async (req,res)=> {
    try {
        const carts = await Cart.find()
        res.status(200).json(
            {
                success: true,
                msg: "Carts has been fetched successfully",
                carts
            }
        )
        
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Carts could not be fetched. Please try again later.",
        })
    }
}

module.exports = {createCart, updateCart, deleteCart,getCart,getAllCarts};