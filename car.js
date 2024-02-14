const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/carApp');

const carSchema = mongoose.Schema({
    make: String,
    model: String,
    year: Number
})


const Car = mongoose.model('Car', carSchema)