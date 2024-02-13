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


shopSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale
    return this.save()
}

shopSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat)
    return this.save()
}

shopSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', shopSchema)

// Product.insertMany([
//     {name: "Mountain Bike", price: 500},
//     {name: "Jansport", price: 35}
// ])

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: "Mountain Bike"})
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

Product.fireSale()
    .then(res => console.log(res))
    .catch(err => console.log(err))

// findProduct()
