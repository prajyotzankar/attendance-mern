import React, { useState, useEffect } from "react";
import axios from "axios";

const StateAddress = (props) => {
  const [stateOptions, setStateOptions] = useState([]);

  useEffect( () => {
    const getStateOptions = async () => {
      var recStateOptions;
      await axios
        .get("http://localhost:5000/address/statesOfIndia")
        .then((response) => {
          recStateOptions = response.data;
        })
        .catch((error) => console.log(error));
      setStateOptions(recStateOptions);
    };
    getStateOptions();
  }, []);

  return (
    <div className="input-container">
      <label className="label filled"> State </label>
      <select
        className="form-select text-input"
        id="chosenState"
        name="state"
        required
        onChange={props.onChangeAddress}
        value={props.address.state}
      >
        <option value="">--Select State--</option>

        {(() => {
          if (typeof stateOptions !== "undefined") {
            return [stateOptions].map((stateOption, index) => {
              if (typeof stateOption !== "undefined")
                return Object.keys(stateOption).map((key) => {
                  return (
                    <option
                      style={{color:"white"}}
                      key={key + index}
                      value={stateOption[key].stateName}
                    >
                      {stateOption[key].stateName}
                    </option>
                  );
                });
              return stateOption;
            });
          }
        })()}
      </select>
    </div>
  );
};

export default StateAddress;
