import React, { useEffect } from "react";
import axios from "axios";

const PincodeAddress = (props) => {
//   const [pincodeAdds, setPincodeAdds] = useState([]);

  useEffect(() => {
    const getPincodeAddress = async () => {
      var zipcode = 0;
      if (typeof props.address.pinCode !== "undefined") {
        if (props.address.pinCode.length === 6) {
          zipcode = props.address.pinCode;
          await axios
            .get("http://localhost:5000/address/pincode/" + zipcode)
            .then((response) => {
                var pinAdds;
                pinAdds = response.data;
                var cities = Object.keys(pinAdds).map((keys) => {
                    return (pinAdds[keys]['CityTown'])
                })
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
            }).catch((error) => console.log(error));
        }
      }
    };
    getPincodeAddress();
  }, [props.address.pinCode]);

  const onChangePincode = (e) => {
    props.setAddress({
      ...props.address,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-3">
          <label className="form-label"></label>
          <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="Pin Code"
            name="pinCode"
            value={props.address.pinCode}
            onChange={onChangePincode}
          />
        </div>
      </form>
    </div>
  );
};

export default PincodeAddress;
