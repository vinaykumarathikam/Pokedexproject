const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const path = require("path");
const app = express();
app.use(express.json({ extended: false }));
app.use(express.static("build"));
const PRoutes = require("express").Router();
let pk = require("./models/model"); 
app.use(cors());

// mongodb://127.0.0.1:27017/pokemondata
mongoose.connect("mongodb+srv://vinil:vinil@login-system.wexbc.mongodb.net/pokemondata", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
const bcrypt = require("bcryptjs");
connection.once("open", () => {
  console.log("connection to mongodb is established");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(__dirname);
console.log(path.join(__dirname, "/mod/model.json"));
app.use(
  "/api/pokeml/classify",
  express.static(path.join(__dirname, "/mod/model.json"))
);
app.use("/api/pokeml", express.static(path.join(__dirname, "/mod")));
PRoutes.route("/add").post(async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const user = await pk.findOne({ email });
  console.log("user");
  console.log(user);
  const encpass = await bcrypt.hash(password, 10);
  if (user) {
    return res.json({ user });
  }
  const newPk = {
    fname,
    lname,
    email,
    password: encpass,
    collections: [],
    heights: [],
    weights: [],
    pokemon: 0,
  };
  const poke = new pk(newPk);
  poke
    .save()
    .then((poke) => {
      res.status(200).json({ pokemon: "added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new pokemon failed");
    });
});
PRoutes.route("/update").post(async (req, res) => {
  const email = req.body.email;
  pk.findOne({ email }, function (err, st) {
    console.log(st);
    if (err) {
      console.log(err);
    } else {
      st.collections = req.body.collections;
      st.heights = req.body.heights;
      st.weights = req.body.weights;
      st.pokemon = req.body.pokemon;
      st.save()
        .then((res) => {
          console.log(st);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
PRoutes.route("/getting").post(async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const user = await pk.findOne({ email });
  console.log("user" + user);
  return res.json({ user });
});
PRoutes.route("/check").post(async (req, res) => {
  console.log("req.body");
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const user = await pk.findOne({ email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return res.json({ user });
    }
  }
  return res.json({ err: "username or password are incorrect!" });
});
app.use("/pokemondata", PRoutes);
app.listen(4000, () => {
  console.log("server is listening at port 4000");
});
