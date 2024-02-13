const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => console.log("CONNECTION OPEN"))
    .catch(err => console.log("ERROR: ", err))

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive ya fool']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0 
        }
    },
    size : {
        type: String,
        enum: ['S', 'M', 'L']
    }

})

const Product = mongoose.model('Product', shopSchema)

const bike = new Product({ 
    name: 'Mountain Bike', 
    price: 500,
    categories: ['Cycling'],
    size: 'M' 
})
bike.save()
    .then(data => console.log(data))
    .catch(err => console.log("ERROR", `\n${err}`))

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -10.99 }, { new: true })
//     .then(data => console.log(data))
//     .catch(err => console.log("ERROR", `\n${err}`))