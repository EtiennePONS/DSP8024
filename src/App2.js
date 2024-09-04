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
    return (value / 128) * 32 - 16; // Convertir 0-127 en -15 à +15
  };

  const handleRangeChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setEqValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (midiOutput) {
      // console.log(midiOutput);
      const channel = 14; // Canal MIDI 1
      const controlChangeNumber = 20; // Note 64

      // midiOutput.send([0xb0, controlChangeNumber, parseInt(value)]);
      console.log([0x19]);
      midiOutput.channels[channel].sendControlChange(
        controlChangeNumber,
        parseInt(value, 10)
      );
      // midiOutput.channels[channel].sendControlChange(
      //   controlChangeNumber,
      //   parseInt(value)
      // );
    }
  };

  return (
    <div className="App">
      <h1>Contrôleur MIDI pour Ultracurve Pro DSP8024</h1>
      <div className="slider-container">
        <div className="slider">
          <span className="value">
            {convertToEqValue(eqValues.master).toFixed(1)}
          </span>
          <input
            type="range"
            name="master"
            min="0"
            max="127"
            step="2"
            value={eqValues.master}
            onChange={handleRangeChange}
            orient="vertical"
          />
          <label>MASTER</label>
        </div>
      </div>
    </div>
  );
}

export default App;
