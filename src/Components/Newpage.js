import React from "react";

export default function Newpage(props) {
  return (
    <div class="card mb-4">
      <div class="row g-0">
        <div class="col-md-8" style={{ width: "100px" }}>
          <img src={props.image} class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col md-4">
          <div class="card-body">
            <h3 class="card-title">{props.name}</h3>
            <h5 class="card-title">{props.type}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
