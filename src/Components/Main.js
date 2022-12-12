import React from "react";
import { Link } from "react-router-dom";
import pokemon from "./../pokemon.jpg";
export default function Main() {
  return (
    <div id="display_image" style={{ backgroundImage: `url(${pokemon})`, height: "100vh" }}>
      <div
        className="container d-flex justify-content-center align-items-center center"
        style={{ paddingTop: "50vh" }}
      >
        <p style={{ marginLeft: "25px" }}>
          <button
            class="btn btn-primary btn-lg"
            style={{ "background-color": "black" }}
          >
            <Link to="sign-in">login</Link>
          </button>
        </p>
        <p style={{ marginLeft: "25px" }}>
          <button
            class="btn btn-primary btn-lg"
            style={{ "background-color": "black" }}
          >
            <Link to="sign-up">sign up</Link>
          </button>
        </p>
      </div>
    </div>
  );
}
