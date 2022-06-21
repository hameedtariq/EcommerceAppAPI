const mongoose = require('mongoose');


const start = (url)=> {
    return mongoose.connect(url)
}


module.exports = start;