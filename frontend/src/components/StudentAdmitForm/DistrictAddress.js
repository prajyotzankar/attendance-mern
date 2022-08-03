import React, { useState, useEffect } from "react";
import axios from "axios";

const DistrictAddress = (props) => {
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    const getDistrictOptions = async () => {
      var recDistrictOptions;
      await axios
        .get("http://localhost:5000/address/stateName/" + props.address.state)
        .then((response) => {
          recDistrictOptions = response.data;
        })
        .catch((error) => console.log(error));

      setDistrictOptions(recDistrictOptions);
    };
    getDistrictOptions();
  }, [props.address.state]);

  const onChangeDistrictOption = (e) => {
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
          <select
            className="form-select"
            id="district"
            name="district"
            onChange={onChangeDistrictOption}
            value={props.address.district}
            // value={district}
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
        </div>
      </form>
    </div>
  );
};

export default DistrictAddress;
