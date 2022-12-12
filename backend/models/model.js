const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pd = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  collections: {
    type: Array,
  },
  heights:{
    type:Array,
  },
  weights:{
    type:Array,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  pokemon: {
    type: Number,
  },
});

module.exports = mongoose.model("pokemondata", pd);
