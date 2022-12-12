import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create(props) {
  const navigate = useNavigate();
  let arr = JSON.parse(localStorage.getItem("collections"));
  let harr = JSON.parse(localStorage.getItem("heights"));
  let warr = JSON.parse(localStorage.getItem("weights"));
  let no_of_pokemons = JSON.parse(localStorage.getItem("pokemon"));
  const [ans, setans] = useState("");
  let email = localStorage.getItem("email");
  let darr = [];
  let da = [];
  const [val, setval] = useState(0);
  return (
    // <div className="col-sm-6">
    <div className="card ">
      <div className="card-body main">
        <h3>
          {props.name}
          <button
            className="btn btn-danger l2"
            onClick={() => {
              let idx = arr.findIndex((item) => {
                return item.name == props.name;
              });
              let delarr = arr[idx].ele;
              for (let i in delarr) {
                no_of_pokemons--;
                harr.splice(harr.indexOf(i.height), 1);
                warr.splice(warr.indexOf(i.weight), 1);
              }
              arr.splice(idx, 1);
              localStorage.setItem("collections", JSON.stringify(arr));
              localStorage.setItem("heights", JSON.stringify(harr));
              localStorage.setItem("weights", JSON.stringify(warr));
              localStorage.setItem("pokemon", JSON.stringify(no_of_pokemons));
              axios.post("http://localhost:4000/pokemondata/update", {
                email: email,
                collections: arr,
                pokemon: no_of_pokemons,
                heights: harr,
                weights: warr,
              });
              window.location.reload();
            }}
          >
            delete
          </button>
          <button
            className="btn btn-primary l21"
            onClick={() => {
              let name = props.name;
              var z = document.getElementsByClassName(name);
              for (let i of z) {
                i.style.display = "inline-block";
              }
              var x = document.getElementById(name + "down");
              x.style.display = "inline-block";
              var y = document.getElementById(name + "update");
              y.style.display = "inline-block";
              let index = arr.findIndex((x) => {
                return x.name == props.name;
              });
              da = arr[index].ele;
            }}
          >
            edit
          </button>
        </h3>
        <br />
        <div className="container ">
          <div className="row">
            {props.arr.map((item) => {
              return (
                <div class="card mt-3 col-sm-6">
                  <div class="row g-0" style={{ maxheight: "105px" }}>
                    <input
                      className={"form-check-input mt-0  " + props.name}
                      style={{ display: "none" }}
                      type="checkbox"
                      value=""
                      aria-label="Checkbox for following text input"
                      onChange={(e) => {
                        let index = arr.findIndex((x) => {
                          return x.name == props.name;
                        });
                        let da = arr[index].ele;
                        let delind = da.findIndex((x) => {
                          return x.pname == item.pname;
                        });
                        if (e.target.checked) {
                          darr.push(delind);
                        } else {
                          let unchecked_indx = darr.findIndex((x) => {
                            return x == delind;
                          });
                          darr.splice(unchecked_indx, 1);
                        }
                      }}
                    />
                    <div class="col-md-4">
                      <img
                        src={item.image}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col md-8">
                      <div class="card-body">
                        <h3 class="card-title">{item.pname}</h3>
                        <h5 class="card-title">{item.ptype}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          id={props.name + "down"}
          style={{ display: "none", float: "left" }}
          class="btn btn-primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          cancel
        </button>
        <button
          className="btn btn-primary"
          id={props.name + "update"}
          style={{ display: "none", float: "right" }}
          onClick={() => {
            let index = arr.findIndex((x) => {
              return x.name == props.name;
            });
            for (let delind of darr) {
              let item = da[delind];
              da.splice(delind, 1);
              no_of_pokemons--;
              harr.splice(harr.indexOf(item.height), 1);
              warr.splice(warr.indexOf(item.weight), 1);
            }
            arr[index].ele = da;
            axios.post("http://localhost:4000/pokemondata/update", {
              email: email,
              collections: arr,
              pokemon: no_of_pokemons,
              heights: harr,
              weights: warr,
            });
            window.location.reload();
          }}
        >
          update
        </button>
      </div>
    </div>
  );
}

export default Create;
