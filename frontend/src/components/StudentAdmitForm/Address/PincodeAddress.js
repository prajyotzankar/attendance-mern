import React, { useEffect } from "react";
import axios from "axios";

const PincodeAddress = (props) => {

  useEffect(() => {
    const getPincodeAddress = async () => {
      if (typeof props.address.pinCode !== "undefined") {
        if (props.address.pinCode.length === 6) {
          await axios
            .get(
              "http://localhost:5000/address/pincode/" + props.address.pinCode
            )
            .then((response) => {
              var pinAdds;
              pinAdds = response.data;
              var cities = Object.keys(pinAdds).map((keys) => {
                return pinAdds[keys]["CityTown"];
              });
              props.setCityOptions(cities);
              if (typeof pinAdds !== "undefined") {
                if (typeof pinAdds[0] !== "undefined") {
                  props.setAddress({
                    ...props.address,
                    district: pinAdds[0]["District"],
                    state: pinAdds[0]["StateName"],
                  });
                }
              }
            })
            .catch((error) => console.log(error));
        }
      }
    };
    getPincodeAddress();
  }, [props.address.pinCode]);

  return (
    <div className="input-container">
      <label className="label filled"> Pin Code </label>
      <input
        type="text"
        required
        className="text-input"
        autoComplete="off"
        placeholder=" Pin Code"
        name="pinCode"
        value={props.address.pinCode}
        onChange={props.onChangeAddress}
      />
    </div>
  );
};

export default PincodeAddress;
