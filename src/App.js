import React, { useState, useEffect } from "react";
import { WebMidi } from "webmidi";
import "./App.css";

function App() {
  const [midiOutput, setMidiOutput] = useState(null);
  const [eqValues, setEqValues] = useState({
    low: 64, // Valeur par défaut au centre (0-127)
    mid: 64, // Valeur par défaut au centre (0-127)
    high: 64, // Valeur par défaut au centre (0-127)
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
    return (value / 128) * 32 - 16; // Convertir 0-127 en -15 à +15
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setEqValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (midiOutput) {
      const channel = 1; // Canal MIDI 1
      const controlChangeNumber = 64; // Note 64
      console.log(channel, controlChangeNumber);
      midiOutput.channels[channel].sendControlChange(
        controlChangeNumber,
        parseInt(value, 10)
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
            {convertToEqValue(eqValues.high).toFixed(1)}
          </span>
          <input
            type="range"
            name="high"
            min="0"
            max="128"
            step="2"
            value={eqValues.high}
            onChange={handleRangeChange}
            orient="vertical"
          />
          <label>Aigus</label>
        </div>
      </div>
    </div>
  );
}

export default App;
