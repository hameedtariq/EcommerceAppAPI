const Product = require('../models/Product')

// const getAllProducts = async (req,res)=> {

// }
const createProduct = async (req,res)=> {
    try {
        const product = await Product.create({...req.body})
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            msg: "Unable to create product. Please try again later."
        })
        
    }
}



const updateProduct = async (req,res)=> {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,{
            $set: req.body
          },
          { new: true }
        );
        res.status(200).json({
            success: true,
            msg: "Product has been updated successfully",
            product: updatedProduct,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                success: false,
                msg: "Product could not be updated. Please try again later.",
            }
        );
      }
}


const deleteProduct = async(req,res)=> {
    try
    {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            msg: "Product has been deleted successfully"
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "Product could not be deleted. Please try again later.",
        })
    }
}

const getProduct = async (req,res)=> {
    try
    {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            msg: "Product has been fetched successfully",
            product
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "Product could not be fetched. Please try again later.",
        })
    }
}



const getAllProducts = async (req,res)=> {

    const qNew = req.query.new === 'true' ? true : false;
    const qCategory = req.query.category
    // console.log(query);
    try
    {
        let products;
        if(qNew)
        {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }
        else if(qCategory)
        {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        }
        else
        {
            products = await Product.find();
        }
        res.status(200).json({
            success: true,
            msg: "All Product has been fetched successfully",
            products
        })
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "All Product could not be fetched. Please try again later.",
        })
    }
}
module.exports = {createProduct, updateProduct,deleteProduct, getProduct, getAllProducts}