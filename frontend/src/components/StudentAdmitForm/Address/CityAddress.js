import React from "react";

const CityAddress = (props) => {
  return (
    <div className="input-container">
      <label className="label filled"> City </label>
      {(() => {
        if (props.address.pinCode.length === 6) {
          return (
            <select
              className="form-select text-input"
              id="chosenCity"
              name="city"
              required
              onChange={props.onChangeAddress}
              value={props.address.city}
            >
              <option value="">--Select City/Town--</option>
              {(() => {
                if (typeof props.cityOptions !== "undefined") {
                  return props.cityOptions.map((cityoption, index) => {
                    return (
                      <option key={index} value={cityoption}>
                        {cityoption}
                      </option>
                    );
                  });
                }
              })()}
            </select>
          );
        }
        // if (
        //   props.address.city === "" ||
        //   typeof props.address.city === "undefined"
        // )
        else{
          return (
            <input
              type="text"
              className="text-input"
              required
              placeholder=" City"
              name="city"
              value={props.address.city}
              onChange={props.onChangeAddress}
            />
          );
        }
      })()}
    </div>
  );
};

export default CityAddress;
