import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Create from "./create";
import Card from "./Card";
import { useEffect } from "react";

function adding() {
  document.getElementById("arc").html = <Create />;
}

function Homepage() {
  const [tab, settab] = useState([]);
  const [name, setname] = useState("");
  const [buttontext, setbuttontext] = useState("create");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  var [collectionssize, setcollectionssize] = useState(0);
  const fetchdata = async () => {
    axios
      .post("http://localhost:4000/pokemondata/getting", { email })
      .then((res) => {
        if (res.data.err) {
          console.log(res.data.err);
        }
        if (res.data.user) {
          console.log(res.data.user);
          localStorage.setItem("fname", res.data.user.fname);
          localStorage.setItem("lname", res.data.user.lname);
          localStorage.setItem("email", res.data.user.email);
          localStorage.setItem("password", res.data.user.password);
          localStorage.setItem(
            "collections",
            JSON.stringify(res.data.user.collections)
          );
          settab(res.data.user.collections);
          setcollectionssize(res.data.user.collections.length);
          localStorage.setItem(
            "heights",
            JSON.stringify(res.data.user.heights)
          );
          localStorage.setItem(
            "weights",
            JSON.stringify(res.data.user.weights)
          );
          localStorage.setItem(
            "pokemon",
            JSON.stringify(res.data.user.pokemon)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const [fname, setfname] = useState(localStorage.getItem("fname"));
  const lname = localStorage.getItem("lname");
  let harr = JSON.parse(localStorage.getItem("heights"));
  let warr = JSON.parse(localStorage.getItem("weights"));
  let minheight = 0;
  let maxheight = 0;
  let maxweight = 0;
  let minweight = 0;
  const pokemon = JSON.parse(localStorage.getItem("pokemon"));
  if (harr.length != 0) {
    let n = harr.length;
    minheight = harr[0];
    maxheight = harr[n - 1];
  }
  if (warr.length != 0) {
    let n = warr.length;
    minweight = warr[0];
    maxweight = warr[n - 1];
  }

  return (
    <>
      <nav className="nav-bar bg-dark">
        <div class="container-fluid">
          <span
            class="navbar-brand mb-0 h1"
            style={{ color: "white", fontSize: "25px" }}
          >
            Pokedex
          </span>
        </div>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/home">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/explore">
              Explore
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/find">
              Find
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div
        class=" text-center"
        style={{
          backgroundColor: "skyblue",
          marginRight: "0",
          marginLeft: "0",
        }}
      >
        <div class="row">
          <div
            class="col-8"
            style={{ fontSize: "50px", fontFamily: "initial" }}
          >
            Hello {fname}!
          </div>
          <div class="col-4">
            <table className="table table-dark" style={{ marginTop: "10px" }}>
              <tbody>
                <tr style={{ margin: "15px" }}>
                  <th>{collectionssize} Collections</th>
                  <th>{minheight} min height</th>
                  <th>{minweight} min weight</th>
                </tr>
                <tr style={{ margin: "15px" }}>
                  <td>{pokemon} pokemon</td>
                  <td>{maxheight} max height</td>
                  <td>{maxweight} max weight</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <div className="container d-flex justify-content-center">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-12">
            <label class="visually-hidden" for="specificSizeInputName">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="specificSizeInputName"
              placeholder="Enter the collection name"
              onChange={(e) => {
                let temp = e.target.value;
                setname(temp);
              }}
            />
          </div>

          <div class="col-12">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setbuttontext("created");
                setTimeout(() => {
                  setbuttontext("create");
                }, 1000);
                if (name !== "") {
                  let lis = [...tab];
                  lis.push({ name: name, ele: [] });
                  localStorage.setItem("collections", JSON.stringify(lis));
                  settab(lis);
                  setcollectionssize(lis.length);
                  axios.post("http://localhost:4000/pokemondata/update", {
                    email: email,
                    collections: lis,
                    heights: harr,
                    weights: warr,
                    pokemon: pokemon,
                  });
                } else {
                  window.alert("give a name to the collection");
                }
              }}
              class="btn btn-primary"
            >
              {buttontext}
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className="container text-center">
        <div className="row">
          {tab.map((item) => {
            return (
              <div className="col-sm-6 mt-3">
                <Create name={item.name} arr={item.ele} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Homepage;
