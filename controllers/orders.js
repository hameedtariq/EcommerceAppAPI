const Order = require('../models/Order');

const createOrder = async (req,res) => {
    try {
        const order = await Order.create({...req.body})
        res.json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            msg: "Unable to create order. Please try again later."
        })
        
    }
}


const updateOrder = async (req,res)=> {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,{
            $set: req.body
          },
          { new: true }
        );
        res.status(200).json({
            success: true,
            msg: "Order has been updated successfully",
            order: updatedOrder,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                success: false,
                msg: "Order could not be updated. Please try again later.",
            }
        );
      }
}



const deleteOrder = async(req,res)=> {
    try
    {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            msg: "Order has been deleted successfully"
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "Order could not be deleted. Please try again later.",
        })
    }
}


const getOrder = async (req,res)=> {
    try
    {
        const order = await Order.findOne({userId: req.params.id});
        res.status(200).json({
            success: true,
            msg: "Order has been fetched successfully",
            order
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "Order could not be fetched. Please try again later.",
        })
    }
}


const getAllOrders = async (req,res)=> {
    try {
        const orders = await Order.find()
        res.status(200).json(
            {
                success: true,
                msg: "Orders has been fetched successfully",
                orders
            }
        )
        
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Orders could not be fetched. Please try again later.",
        })
    }
}

const getMonthlyIncome = async (req,res)=> {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate(
            [
                {
                    $match: {createdAt: {$gte: prevMonth}}
                },
                {
                    $project: {
                        month: {$month: "$createdAt"},
                        sales: "$amount",
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: "$sales"}
                    }
                }
            ]
        )
        res.status(200).json(
            {
                success: true,
                msg: "Income has been fetched successfully",
                income
            }
        )
        
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Income could not be fetched. Please try again later.",
        })
    }
}

module.exports = {createOrder,updateOrder,deleteOrder,getOrder, getAllOrders, getMonthlyIncome}