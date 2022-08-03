import React from 'react';
// import axios from 'axios';


const CityAddress = (props) => {

    const onChangeCityOption = (e) => {
        props.setAddress({
            ...props.address,
            [e.target.name]: e.target.value,
        });
    };

    return (
      <select
        className="form-select"
        id="chosenCity"
        name="city"
        onChange={onChangeCityOption}
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

};


export default CityAddress;