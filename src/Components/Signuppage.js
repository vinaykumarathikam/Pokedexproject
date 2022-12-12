import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import pokemon from "./../pokemon.jpg"; 
import axios from "axios";

function Signuppage() {
  const [NewUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    collections: [],
    heights: [],
    weights: [],
    pokemon: 0,
  });
  const navigate = useNavigate();
  return (
    <div id="display_image" style={{ backgroundImage: `url(${pokemon})`, height: "100vh", }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:4000/pokemondata/add", NewUser)
            .then((res) => {
              localStorage.setItem("fname", NewUser["fname"]);
              localStorage.setItem("lname", NewUser["lname"]);
              localStorage.setItem("email", NewUser["email"]);
              localStorage.setItem("password", NewUser["password"]);
              localStorage.setItem(
                "collections",
                JSON.stringify(NewUser["collections"])
              );
              localStorage.setItem(
                "heights",
                JSON.stringify(NewUser["heights"])
              );
              localStorage.setItem(
                "weights",
                JSON.stringify(NewUser["weights"])
              );
              localStorage.setItem(
                "pokemon",
                JSON.stringify(NewUser["pokemon"])
              );
              navigate("/home");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <div
          className="sign-form"
          style={{ width: "50%", paddingTop: "20vh", "margin-left": "25%" }}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="fname"
              onChange={(e) => {
                setNewUser({ ...NewUser, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lname"
              onChange={(e) => {
                setNewUser({ ...NewUser, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              onChange={(e) => {
                setNewUser({ ...NewUser, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={(e) => {
                setNewUser({ ...NewUser, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signuppage;
