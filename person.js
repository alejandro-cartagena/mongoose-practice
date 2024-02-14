const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => console.log("CONNECTION OPEN"))
    .catch(err => console.log("ERROR: ", err))

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullname')
    .get(function () {
        return `${this.first} ${this.last}`
    })
    .set(function (name) {
        const [first, last] = name.split(' ')
        this.first = first
        this.last = last
    })

personSchema.pre('save', async function () {
    console.log("ABOUT TO SAVE!!!")
})

personSchema.post('save', async function () {
    console.log("JUST SAVED!!!")
})

const Person = mongoose.model('Person', personSchema)

