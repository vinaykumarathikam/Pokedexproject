import React from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function Card(props) {
  const [data, setdata] = useState({
    types: [{ type: { name: "default" } }],
    sprites: { front_shiny: "" },
  });
  const [buttontext, setbuttontext] = useState("add");
  const fetchdata = async () => {
    axios.get(props.url).then((res) => (console.log(res), setdata(res.data)));
  };
  useEffect(() => {
    fetchdata();
  }, []);
  let arr = JSON.parse(localStorage.getItem("collections"));
  let cnt = 0;
  let [ele, setele] = useState([]);
  let [idx, setidx] = useState(0);
  return (
    <>
      <div class="col-sm-3" style={{ margin: "50px" }}>
        <div
          class="card mb3"
          style={{
            width: "18rem",
            "background-color": "rgb(215, 215, 245)",
            border: "1px solid black",
            "border-radius": "10px",
            "box-shadow": "black",
          }}
        >
          <img
            src={data.sprites.front_default}
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{data.name}</h5>
          </div>
          <div>
            <button
              style={{
                "background-color": "green",
                float: "center",
                width: "120px",
                margin: "20px",
                "border-radius": "10px",
              }}
            >
              {data.types[0].type.name}
            </button>
          </div>
          <ul class="list-group list-group-flush">
            <div
              style={{
                "background-color": "rgb(41, 36, 36)",
                "border-radius": "10px",
              }}
            >
              <li
                class="list-group-item"
                style={{
                  "background-color": "rgb(41, 36, 36)",
                  color: "white",
                }}
              >
                Height:{data.height}
              </li>
            </div>
            <br />
            <div
              style={{
                "background-color": "rgb(41, 36, 36)",
                "border-radius": "10px",
              }}
            >
              <li
                class="list-group-item"
                style={{
                  "background-color": "rgb(41, 36, 36)",
                  color: "white",
                }}
              >
                Weight:{data.weight}
              </li>
            </div>
            <br />
            <div
              style={{
                "background-color": "rgb(41,36,36",
                "border-radius": "10px",
              }}
            >
              <li
                class="list-group-item"
                style={{
                  "background-color": "rgb(41, 36, 36)",
                  color: "white",
                }}
              >
                Base_experience:{data.base_experience}
              </li>
            </div>
          </ul>
          <div class="card-body">
            <div className="col-mb-3">
              <select
                name="dropdown"
                onChange={(e) => {
                  setidx(e.target.value);
                }}
              >
                {arr.map((item) => (
                  <option value={cnt++}>{item.name}</option>
                ))}
              </select>
              <button
                type="button"
                class="btn btn-primary"
                style={{ marginLeft: "10px" }}
                onClick={(e) => {
                  let arr = JSON.parse(localStorage.getItem("collections"));
                  setbuttontext("added");
                  setTimeout(() => {
                    setbuttontext("add");
                  }, 1000);
                  let no_of_pokemons = JSON.parse(
                    localStorage.getItem("pokemon")
                  );
                  let harr = JSON.parse(localStorage.getItem("heights"));
                  let warr = JSON.parse(localStorage.getItem("weights"));
                  const name = data.name;
                  const height = data.height;
                  const weight = data.weight;
                  const base_experience = data.base_experience;
                  const image = data.sprites.front_default;
                  const ptype = data.types[0].type.name;
                  const email = localStorage.getItem("email");
                  const NewUser = {
                    image: image,
                    pname: name,
                    ptype: ptype,
                    height: height,
                    weight: weight,
                    base_experience: base_experience,
                  };
                  harr.push(height);
                  warr.push(weight);
                  harr.sort(function (a, b) {
                    return a - b;
                  });
                  warr.sort(function (a, b) {
                    return a - b;
                  });
                  arr[idx].ele.push(NewUser);
                  no_of_pokemons++;
                  localStorage.setItem("collections", JSON.stringify(arr));
                  localStorage.setItem("heights", JSON.stringify(harr));
                  localStorage.setItem("weights", JSON.stringify(warr));
                  localStorage.setItem(
                    "pokemon",
                    JSON.stringify(no_of_pokemons)
                  );
                  axios.post("http://localhost:4000/pokemondata/update", {
                    email: email,
                    collections: arr,
                    pokemon: no_of_pokemons,
                    heights: harr,
                    weights: warr,
                  });
                }}
              >
                {buttontext}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
