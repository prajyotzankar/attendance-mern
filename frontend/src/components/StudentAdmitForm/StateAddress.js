import React, { useState, useEffect } from "react";
import axios from "axios";

const StateAddress = (props) => {
  const [stateOptions, setStateOptions] = useState([]);
  // const [chosenState, setChosenState] = useState("");

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

  // const onChangeStateOption = (e) => {
  //   setChosenState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const onChangeStateOption = (e) => {
    props.setAddress({
      ...props.address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form className="row g-3">
        <div className="col-md-3">
          <label className="form-label">
          </label>
          <select
            className="form-select"
            id="chosenState"
            name="state"
            onChange={onChangeStateOption}
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
      </form>
    </div>
  );
};

export default StateAddress;
