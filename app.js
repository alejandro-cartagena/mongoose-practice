const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
    .then(() => console.log("CONNECTION OPEN"))
    .catch(err => console.log("ERROR: ", err))

const movieSchema = new mongoose.Schema({
    title:  String,
    year:   Number,
    score:  Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)

Movie.insertMany([
    {title: 'City of God', year: 1996, score: 9.6, rating: 'R'},
    {title: 'Logan', year: 2017, score: 8.9, rating: 'R'},
    {title: 'Frozen', year: 2015, score: 9.2, rating: 'PG'},
    {title: 'Pulp Fiction', year: 1994, score: 9.8, rating: 'R'},
    {title: 'The Avengers', year: 2012, score: 9.1, rating: 'PG-13'},
])
    .then(data => console.log(data))
    .catch(err => console.log("ERROR", `\n${err}`))