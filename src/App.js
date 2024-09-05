import React, { useState, useEffect } from "react";
import { WebMidi } from "webmidi";
import "./App.css";

function App() {
  const [midiOutput, setMidiOutput] = useState(null);
  const [eqValues, setEqValues] = useState({
    low: 64, // Valeur par défaut au centre (0-127)
    mid: 64, // Valeur par défaut au centre (0-127)
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
    console.log(0xbd);
    const { name, value } = e.target;
    setEqValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (midiOutput) {
      const channel = 14; // Canal MIDI 1
      const controlChangeNumberL = 20; // Note 64
      const controlChangeNumberR = 52; // Note 64
      midiOutput.channels[channel].sendControlChange(
        controlChangeNumberL,
        parseInt(value)
      );
      midiOutput.channels[channel].sendControlChange(
        controlChangeNumberR,
        parseInt(value)
      );
    }
  };

  return (
    <div className="App">
      <h1>Contrôleur MIDI pour Ultracurve Pro DSP8024</h1>
      <div className="slider-container">
        {/* <div className="slider">
          <span className="value">
            {convertToEqValue(eqValues.low).toFixed(1)}
          </span>
          <input
            type="range"
            name="low"
            min="0"
            max="127"
            step="2"
            value={eqValues.low}
            onChange={handleRangeChange}
            orient="vertical"
          />
          <label>Basses</label>
        </div> */}
        {/* <div className="slider">
          <span className="value">
            {convertToEqValue(eqValues.mid).toFixed(1)}
          </span>
          <input
            type="range"
            name="mid"
            min="0"
            max="127"
            step="2"
            value={eqValues.mid}
            onChange={handleRangeChange}
            orient="vertical"
          />
          <label>Médiums</label>
        </div> */}
        <div className="slider">
          <span className="value">
            {convertToEqValue(eqValues.master).toFixed(1)} dB
          </span>
          {/* <input
            type="range"
            name="master"
            className="form-range"
            id="customRange1"
            min="0"
            max="128"
            step="2"
            value={eqValues.master}
            onChange={handleRangeChange}
            orient="vertical"
          />
          <label htmlFor="customRange1" className="form-label">
            MASTER
          </label> */}
          <input
            type="range"
            name="master"
            className="form-range"
            min="0"
            max="128"
            step="2"
            id="customRange1"
            value={eqValues.master}
            onChange={handleRangeChange}
            orient="vertical"
          />{" "}
          <label htmlFor="customRange1" className="form-label">
            MASTER
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
