import axios from "axios";
import React, { useState } from "react";
import pokemon from "./../pokemon.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const [NewUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div
    id="display_image"
      style={{
        backgroundImage: `url(${pokemon})`,
        height: "100vh",
        display: "block",
      }}
    >
      <form
        style={{ paddingTop: "20vh" }}
        id="newform"
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:4000/pokemondata/check", NewUser)
            .then((res) => {
              if (res.data.err) {
                document.getElementById("err").innerText = res.data.err;
                console.log(res.data.err);
                document.getElementById("newform").reset();
              } else if (res.data.user) {
                console.log(res.data.user);
                localStorage.setItem("fname", res.data.user.fname);
                localStorage.setItem("lname", res.data.user.lname);
                localStorage.setItem("email", res.data.user.email);
                localStorage.setItem("password", res.data.user.password);
                localStorage.setItem(
                  "collections",
                  JSON.stringify(res.data.user.collections)
                );
                localStorage.setItem(
                  "minheight",
                  JSON.stringify(res.data.user.minheight)
                );
                localStorage.setItem(
                  "minweight",
                  JSON.stringify(res.data.user.minweight)
                );
                localStorage.setItem(
                  "maxheight",
                  JSON.stringify(res.data.user.maxheight)
                );
                localStorage.setItem(
                  "maxweight",
                  JSON.stringify(res.data.user.maxweight)
                );
                localStorage.setItem(
                  "pokemon",
                  JSON.stringify(res.data.user.pokemon)
                );
                navigate("/home");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <div className="container my-3" style={{ width: "70vh" }}>
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
              Login
            </button>
          </div>
          <p id="err" style={{ color: "black" }}></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
