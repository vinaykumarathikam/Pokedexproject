import React, { Component } from "react";

import axios from "axios";
import { useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
function Explorepage() {
  const [data, setdata] = useState([]);
  let arr = JSON.parse(localStorage.getItem("collections"));
  const fetchdata = async () => {
    const src = "https://pokeapi.co/api/v2/pokemon/";
    axios.get(src).then((res) => (console.log(res), setdata(res.data.results)));
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <div style={{ "background-color": "rgb(215, 215, 245)", margin: "0" }}>
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
          className="container text-center"
          style={{ "background-color": "rgb(215, 215, 245)" }}
        >
          <div className="row">
            {data.map((item) => {
              return <Card key={item.name} url={item.url} name={item.name} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Explorepage;
