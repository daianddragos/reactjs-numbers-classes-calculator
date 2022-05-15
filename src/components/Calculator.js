import React, { useRef, useState } from "react";

import "./Calculator.css";

// create an array with all of the letter's character codes
const ALPHA = Array.from(Array(26)).map((element, index) => index + 65);
// map all the values to the coresponding letter
const ALPHABET = ALPHA.map((element) => String.fromCharCode(element));

const Calculator = ({setTableValues}) => {
  const numbersRef = useRef();
  const [maximumValues, setMaximumValues] = useState(null);
  const [moduloValues, setModuloValues] = useState(null);
  const calculateMaximumValues = () => {
    const numbers = numbersRef.current.value.split(",");
    const classes = {};
    for (let number of numbers) {
      number = parseInt(number);
      const numberClass = Math.floor(number / 100) * 100;
      if (isNaN(numberClass) || numberClass < 100 || numberClass > 900) {
        continue;
      }
      if (!(numberClass in classes) || number > classes[numberClass]) {
        classes[numberClass] = number;
      }
    }
    const maxValues = Object.values(classes).sort();
    setMaximumValues(maxValues);
    // calculate the modulo values
    const modValues = maxValues.map((element) => ALPHABET[element % 26]);
    setModuloValues(modValues);
    setTableValues(modValues);
  };
  return (
    <div className="calculator">
      <div>
        Introduceti un sir de numere intre 100 si 999, separate prin virgula:
      </div>
      <div>
        <input type="text" ref={numbersRef} />
        <button onClick={calculateMaximumValues}>Calculate</button>
      </div>
      {maximumValues && moduloValues && (
        <div className="result">
          <div>
            Maximele din clase: <span className="result-values">{`[${maximumValues.join(",")}]`}</span>
          </div>
          <div>
            Modulo: <span className="result-values">{`[${moduloValues.join(",")}]`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
