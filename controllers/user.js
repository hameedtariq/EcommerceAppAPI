const User = require('../models/User')
const Cryptojs = require('crypto-js')

const updateUser = async (req,res)=> {
     if(req.body.password)
     {
        req.body.password = Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
     }

     try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user.id,{
            $set: req.body
          },
          { new: true }
        );
        res.status(200).json({
            success: true,
            msg: "User has been updated successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(
            {
                success: false,
                msg: "User could not be updated. Please try again later.",
            }
        );
      }
}


const deleteUser = async (req,res)=> {
    try
    {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            msg: "User has been deleted successfully"
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "User could not be deleted. Please try again later.",
        })
    }
}

const getUser = async (req,res)=> {
    try
    {
        const {_doc:{password, ...user}} = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            msg: "User has been fetched successfully",
            user
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "User could not be fetched. Please try again later.",
        })
    }
}



const getAllUser = async (req,res)=> {

    const query = req.query.new === 'true' ? true : false
    console.log(query);
    try
    {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        const modifiedUsers = users.map((u)=> {
            const {_doc:{password, ...user}} = u;
            return user;
        })
        res.status(200).json({
            success: true,
            msg: "All Users has been fetched successfully",
            modifiedUsers
        })
    }catch(err)
    {
        res.status(500).json({
            success: false,
            msg: "All Users could not be fetched. Please try again later.",
        })
    }
}

const getStats = async (req,res)=> {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        const data = await User.aggregate([
            {
                $match: {createdAt: {$gte: lastYear}}
            },
            {
                $project:{
                    month: {$month: "$createdAt"}
                }

            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum:1}
                }
            }
        ])
        res.status(200).json({
            success: true,
            data,
        })    
    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            msg: "teri pen di siri",
        }) 
    }
    
}

module.exports = {updateUser, deleteUser, getUser, getAllUser, getStats};