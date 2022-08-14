import React, { useState, useEffect } from "react";
import axios from "axios";

const DistrictAddress = (props) => {
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    const getDistrictOptions = async () => {
      if (typeof props.address.state !== "undefined") {
        if (props.address.state.length > 0) { 
          await axios
            .get(
              "http://localhost:5000/address/stateName/" + props.address.state
            )
            .then((response) => {
              setDistrictOptions(response.data);
            })
            .catch((error) => console.log(error));
        }
      }
    };
    getDistrictOptions();
  }, [props.address.state]);

  return (
    <div className="input-container">
      <label className="label filled"> District </label>
      {(() => {
        if (
          props.address.state === "" ||
          typeof props.address.state === "undefined"
        ) {
          return (
            <input
              type="text"
              className="text-input"
              required
              placeholder=" District"
              name="district"
              value={props.address.district}
              onChange={props.onChangeAddress}
            />
          );
        }
        if (props.address.state.length > 0) {
          return (
            <select
              className="form-select text-input"
              id="district"
              name="district"
              required
              onChange={props.onChangeAddress}
              value={props.address.district}
            >
              <option value="">--Select District--</option>
              {(() => {
                if (typeof districtOptions !== "undefined") {
                  return districtOptions.map((districtOption, index) => {
                    return (
                      <option key={index} value={districtOption}>
                        {districtOption}
                      </option>
                    );
                  });
                }
              })()}
            </select>
          );
        }
      })()}
    </div>
  );
};

export default DistrictAddress;
