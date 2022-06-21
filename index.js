const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/product.js')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter)
app.use('/api/orders', orderRouter)






const port = process.env.PORT || 5000
app.listen(port, async ()=> {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Server listening on port ${port}`);
    } catch (error) {
        console.log(error);
    }
    
});