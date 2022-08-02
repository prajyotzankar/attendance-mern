import React, { useState, useEffect } from "react";
import axios from "axios";

const Address = (props) => {
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
      <h3>Enter Address</h3>
      <form className="row g-3">
        <div className="col-md-3">
          <label className="form-label">
            State: {JSON.stringify(props.address)}
          </label>
          <select
            className="form-select"
            id="chosenState"
            name="chosenState"
            onChange={onChangeStateOption}
            value={props.address.stateName}
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

        <div className="col-md-3">
          <button type="button" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
