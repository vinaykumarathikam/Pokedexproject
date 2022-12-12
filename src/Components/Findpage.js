import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import idx2class1 from "./classIdxDict2";
import Newpage from "./Newpage";

import React, { useState, useEffect } from "react";
import { booleanMaskAsync } from "@tensorflow/tfjs";
function Findpage() {
  const [file, setFile] = useState(null);
  const [data, setdata] = useState([]);
  const [val, setval] = useState([]);
  const [d, setd] = useState(1);
  //   const [model, setModel] = useState(null);
  let arr = [];
  function getdata(item) {
    const pokedata = [];
    item.map((i) =>
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + i)
        .then((res) => pokedata.push(res.data))
    );
    return pokedata;
  }
  const [processing, setProcessing] = useState(false);
  const [topkPredNames, setPrediction] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [model, setModel] = useState(null);
  function readImage(file) {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  }
  function myFunction() {
    var x = document.getElementById("predictbutton");
    x.style.display = "block";
  }
  async function handleImgUpload(event) {
    const {
      target: { files },
    } = event;

    const _file = files[0];
    const fileData = await readImage(_file);
    setFile(fileData);
    setProcessing(true);
  }

  const MODEL_HTTP_URL = "api/pokeml/classify";
  const MODEL_INDEXEDDB_URL = "indexeddb://poke-model";

  const getTopKPred = (pred, k) => {
    const predIdx = [];
    const predNames = [];

    const topkPred = [...pred].sort((a, b) => b - a).slice(0, k);
    topkPred.map((i) => predIdx.push(pred.indexOf(i)));
    predIdx.map((i) => predNames.push(idx2class1[i]));

    return predNames;
  };

  const getTopKPredPokeObj = (pred, k) => {
    const foundPokeObj = [];
    const predPokeName = getTopKPred(pred, k);

    // predPokeName.map((name) =>
    //   foundPokeObj.push(pokeObjFromName(name, pokeObjList))
    // );

    return predPokeName;
  };

  useEffect(() => {
    async function fetchModel() {
      try {
        const localClassifierModel = await tf.loadLayersModel(
          MODEL_INDEXEDDB_URL
        );

        setModel(localClassifierModel);
        console.log("Model loaded from IndexedDB");
      } catch (e) {
        try {
          const classifierModel = await tf.loadLayersModel(MODEL_HTTP_URL);

          console.log(classifierModel);
          setModel(classifierModel);
          console.log("Model Loaded");
          await classifierModel.save(MODEL_INDEXEDDB_URL);
          console.log("Model saved to IndexedDB");
        } catch (e) {
          console.log("Unable to load model at all: ", e);
        }
      }
    }
    fetchModel();
  }, []);
  useEffect(() => {
    async function predict() {
      if (imageLoaded && file) {
        const imageElement = document.createElement("img");
        imageElement.src = file;

        imageElement.onload = async () => {
          const tensor = tf.browser
            .fromPixels(imageElement)
            .resizeNearestNeighbor([120, 120])
            .toFloat()
            .sub(127)
            .div(127)
            .expandDims();

          const y_pred = await model.predict(tensor).data();

          let topkPredNames = getTopKPredPokeObj(y_pred, 6);
          let poke = getdata(topkPredNames);
          setPrediction(topkPredNames);
          setdata(poke);
          console.log(data);
          console.log(topkPredNames);
          console.log("-----------");
          setProcessing(false);
          setImageLoaded(false);
          return topkPredNames;
        };
      }
    }

    predict();
  }, [imageLoaded, model, file]);

  return (
    <>
      <div
        style={{
          "background-color": "rgb(215, 215, 245)",
        }}
      >
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

        <nav
          class="navbar bg-light "
          style={{
            "background-color": "rgb(124, 124, 223)",
            padding: "0",
            height: "150px",
          }}
        >
          <div
            class="container-fluid "
            style={{
              "background-color": "rgb(124, 124, 223)",
              padding: "0",
              height: "150px",
            }}
          >
            <div
              class="nav-content"
              style={{
                "padding-left": "40%",
                "text-align": "center",
                "padding-top": "10px",
              }}
            >
              <h3>Find Pokemon by image</h3>
              <span>
                {" "}
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                      Upload image
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Capture image
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabindex="0"
                  >
                    <div className="input-group">
                      <input
                        id="image-selector"
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        className="File-selector"
                        onChange={(e) => {
                          handleImgUpload(e);
                          const reader = new FileReader();
                          reader.addEventListener("load", () => {
                            document.querySelector(
                              "#display_img"
                            ).style.backgroundImage = `url(${reader.result})`;
                          });
                          reader.readAsDataURL(e.currentTarget.files[0]);
                        }} 
                      />
                      <button
                        type="button"
                        className="btn btn-success"
                        id="predictbutton"
                        style={{ display: "none" }}
                        onClick={() => {
                          setd(Math.random());
                        }}
                      >
                        predict
                      </button>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    tabindex="0"
                  > 
                  </div>
                </div>
              </span>
              <br />
            </div>
          </div>
        </nav>

        <div
          class="container-fluid main-page"
          style={{
            backgroundColor: "aliceblue",
          }}
        >
          <div class="row">
            <div
              class="col-4"
              style={{
                margin: "10px",
                height: "50px",
                fontFamily: "Arvo",
                "background-color": "rgb(199, 195, 195)",
                "text-align": "center",
                color: "black",
              }}
            >
              <h3>Preview Image</h3> <br />
            </div>
            <div
              class="col-7"
              style={{
                padding: "0px",
                marginTop: "10px",
                marginLeft: "80px",
                height: "50px",
                fontFamily: "Arvo",
                "background-color": "rgb(199, 195, 195)",
                "text-align": "center",
                color: "black",
              }}
            >
              <h3>Search Result (top-6-matches)</h3>
              <br />
            </div>
          </div>
          <div className="row">
            <div
            class="col-4" 
            id="display_img"
              style={{ 
                margin:'10px',
                border:' 1px solid black',
                height: "450px", 
                backgroundSize:'cover',
                // alignItems: "center",
                // "text-align": "center",
                // color: "black",
              }}
            >
              <div 
                style={{ display: "none" }}
              >
                <img
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                  alt=""
                  src={file}
                />
              </div>
            </div>
            <div
              class="col-7" 
              id="displaypredictions"
              style={{
                padding: "0px", 
                border: '1px solid black',
                marginTop: "10px",
                marginLeft: "80px", 
                height: "450px",  
                "text-align": "center",
                color: "black",
              }}
            >
              <div className="container">
                {processing ? (
                  <p>Loading ...</p>
                ) : topkPredNames !== null ? (
                  <div className="row">
                    <p></p> <p></p>
                    {myFunction()}
                    {data.map((item) => {
                      return (
                        <div className="col-sm-6">
                          <Newpage
                            name={item.name}
                            type={item.types[0].type.name}
                            image={item.sprites.front_default}
                          />
                        </div>
                      );
                    })}
                    <p></p>
                  </div>
                ) : null}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Findpage;
