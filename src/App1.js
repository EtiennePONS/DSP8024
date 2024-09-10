import React, { useState, useEffect } from "react";
import { WebMidi } from "webmidi";
import "./App.css";
import AudioAnalyzer from "./components/AudioAnalyzer";

function App() {
  const [midiOutput, setMidiOutput] = useState(null);
  const [eqValues, setEqValues] = useState({
    tranche1: 64,
    tranche2: 64,
    tranche3: 64,
    tranche4: 64,
    tranche5: 64,
    tranche6: 64,
    tranche7: 64,
    tranche8: 64,
    tranche9: 64,
    tranche10: 64,
    tranche11: 64,
    tranche12: 64,
    tranche13: 64,
    tranche14: 64,
    tranche15: 64,
    tranche16: 64,
    tranche17: 64,
    tranche18: 64,
    tranche19: 64,
    tranche20: 64,
    tranche21: 64,
    tranche22: 64,
    tranche23: 64,
    tranche24: 64,
    tranche25: 64,
    tranche26: 64,
    tranche27: 64,
    tranche28: 64,
    tranche29: 64,
    tranche30: 64,
    tranche31: 64,
    master: 64, // Valeur par défaut au centre (0-127)
  });

  useEffect(() => {
    WebMidi.enable((err) => {
      if (err) {
        console.error("WebMidi n'a pas pu être activé.", err);
      } else {
        console.log("WebMidi activé!");
        const output = WebMidi.outputs[0];
        if (output) {
          setMidiOutput(output);
        } else {
          console.log("Aucune sortie MIDI disponible.");
        }
      }
    });
  }, []);

  // Fonction de conversion des valeurs
  const convertToEqValue = (value) => {
    return (value / 128) * 32 - 16; // Convertir 0-127 en -16 à +16
  };

  const handleRangeChange = (e) => {
    // console.log(0xbd, e.target.id);
    const { name, value } = e.target;
    setEqValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (midiOutput) {
      const channel = 14; // Canal MIDI 1
      const controlChangeNumberL = parseInt(e.target.id);
      const controlChangeNumberR = parseInt(e.target.id) + 32;
      midiOutput.channels[channel].sendControlChange(
        controlChangeNumberL,
        parseInt(value)
      );
      midiOutput.channels[channel].sendControlChange(
        controlChangeNumberR,
        parseInt(value)
      );
      console.log(controlChangeNumberL, controlChangeNumberR, value);
    }
  };
  // Fonction pour remettre à zéro un slider
  const resetSlider = (sliderName, tranche) => {
    setEqValues((prevValues) => ({
      ...prevValues,
      [sliderName]: 64, // Valeur par défaut (centre)
    }));
    if (midiOutput) {
      const channel = 14; // Canal MIDI 1
      const controlChangeNumberL = tranche;
      const controlChangeNumberR = tranche + 32;
      midiOutput.channels[channel].sendControlChange(controlChangeNumberL, 64);
      midiOutput.channels[channel].sendControlChange(controlChangeNumberR, 64);
      console.log(controlChangeNumberL, controlChangeNumberR);
    }
  };

  return (
    <div className="App">
      <h1>Contrôleur MIDI pour Ultracurve Pro 8024</h1>
      <AudioAnalyzer />
      <div className="slider-container">
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche1", 1)}
          >
            /
          </button>{" "}
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche1).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche1"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="1"
              value={eqValues.tranche1}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="1" className="form-label">
              20Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche2", 2)}
          >
            /
          </button>{" "}
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche2).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche2"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="2"
              value={eqValues.tranche2}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="2" className="form-label">
              25Hz
            </label>
          </div>{" "}
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche3", 3)}
          >
            /
          </button>{" "}
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche3).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche3"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="3"
              value={eqValues.tranche3}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="3" className="form-label">
              31.5Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche4", 4)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche4).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche4"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="4"
              value={eqValues.tranche4}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="4" className="form-label">
              40Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche5", 5)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche5).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche5"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="5"
              value={eqValues.tranche5}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="5" className="form-label">
              50Hz
            </label>
          </div>{" "}
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche6", 6)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche6).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche6"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="6"
              value={eqValues.tranche6}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="6" className="form-label">
              63Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche7", 7)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche7).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche7"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="7"
              value={eqValues.tranche7}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="7" className="form-label">
              80Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche8", 8)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche8).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche8"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="8"
              value={eqValues.tranche8}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="8" className="form-label">
              100Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche9", 9)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche9).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche9"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="9"
              value={eqValues.tranche9}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="9" className="form-label">
              125Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche10", 10)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche10).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche10"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="10"
              value={eqValues.tranche10}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="10" className="form-label">
              160Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche11", 11)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche11).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche11"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="11"
              value={eqValues.tranche11}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="11" className="form-label">
              200Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche12", 12)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche12).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche12"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="12"
              value={eqValues.tranche12}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="12" className="form-label">
              250Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche13", 13)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche13).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche13"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="13"
              value={eqValues.tranche13}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="13" className="form-label">
              315Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche14", 14)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche14).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche14"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="14"
              value={eqValues.tranche14}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="14" className="form-label">
              400Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche15", 15)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche15).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche15"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="15"
              value={eqValues.tranche15}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="15" className="form-label">
              500Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche16", 16)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche16).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche16"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="16"
              value={eqValues.tranche16}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="16" className="form-label">
              630Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche17", 17)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche17).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche17"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="17"
              value={eqValues.tranche17}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="17" className="form-label">
              800Hz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche18", 18)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche18).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche18"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="18"
              value={eqValues.tranche18}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="18" className="form-label">
              1KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche19", 19)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche19).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche19"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="19"
              value={eqValues.tranche19}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="19" className="form-label">
              1.25KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche20", 20)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche20).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche20"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="20"
              value={eqValues.tranche20}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="20" className="form-label">
              1.6KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche21", 21)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche21).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche21"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="21"
              value={eqValues.tranche21}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="21" className="form-label">
              2KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche22", 22)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche22).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche22"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="22"
              value={eqValues.tranche22}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="22" className="form-label">
              2.5KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche23", 23)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche23).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche23"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="23"
              value={eqValues.tranche23}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="23" className="form-label">
              3.15KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche24", 24)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche24).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche24"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="24"
              value={eqValues.tranche24}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="24" className="form-label">
              4KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche25", 25)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche25).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche25"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="25"
              value={eqValues.tranche25}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="25" className="form-label">
              5KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche26", 26)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche26).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche26"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="26"
              value={eqValues.tranche26}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="26" className="form-label">
              6.3KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche27", 27)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche27).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche27"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="27"
              value={eqValues.tranche27}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="27" className="form-label">
              8KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche28", 28)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche28).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche28"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="28"
              value={eqValues.tranche28}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="28" className="form-label">
              10KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche29", 29)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche29).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche29"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="29"
              value={eqValues.tranche29}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="29" className="form-label">
              12.5KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche30", 30)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche30).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche30"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="30"
              value={eqValues.tranche30}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="30" className="form-label">
              16KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-primary"
            onClick={() => resetSlider("tranche31", 31)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.tranche31).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="tranche31"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="31"
              value={eqValues.tranche31}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="31" className="form-label">
              20KHz
            </label>
          </div>
        </div>
        <div className="tranche">
          <button
            className="btn btn-outline-danger"
            onClick={() => resetSlider("master", 32)}
          >
            /
          </button>
          <div className="slider">
            <span className="value">
              {convertToEqValue(eqValues.master).toFixed(1)} dB
            </span>
            <input
              type="range"
              name="master"
              className="form-range"
              min="0"
              max="128"
              step="2"
              id="32"
              value={eqValues.master}
              onChange={handleRangeChange}
              orient="vertical"
            />
            <label htmlFor="32" className="form-label">
              MASTER
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
