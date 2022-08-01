import axios from "axios";
import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import "./ProfileForm.scss";
import { validate } from "./validate";
import FileBase from "react-file-base64";
import { update_user } from "../../api_url/api_url";

export default function ProfileForm() {
  const history = useHistory();

  const [error, setError] = useState({
    allFields: "All fields are required",
  });
  const [values, setValues] = useState({
    fullName: "",
    // email: user.email,
    image: "",
    country: "",
    province: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let localUser = JSON.parse(localStorage.getItem("usuario"));
      if (localUser) {
        await axios.put(update_user + localUser, values);
        history.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    setError(
      validate({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div className="container">
      <div className="containerForm">
        {/* Preview */}
        {/* <div className="imageView">
          <img src={values.image?.length} alt="preview" />
        </div> */}

        <form className="form" onSubmit={handleSubmit}>
          <div className="container-input">
            {values?.image ? (
              <div>
                <img src={values.image} alt="" />
              </div>
            ) : (
              <label htmlFor="inputImage">Image:</label>
            )}
            <FileBase
              type="image"
              multiple={false}
              onDone={({ base64 }) => setValues({ ...values, image: base64 })}
            />
          </div>
          <div className="container-input">
            <label htmlFor="inputFullName">Name:</label>
            <input
              className="form-input"
              type="text"
              id="inputFullName"
              value={values.fullName}
              name="fullName"
              placeholder="Name..."
              onChange={onChange}
            />
          </div>

          {error.name && <small className="errors">{error.fullName}</small>}
          {error.name_length && (
            <small className="errors">{error.name_length}</small>
          )}

          <div className="container-input">
            <label htmlFor="inputCountry">Country:</label>
            <input
              className="form-input"
              type="text"
              id="inputCountry"
              value={values.country}
              name="country"
              placeholder="Country"
              onChange={onChange}
            />
          </div>
          {error.country && <small className="errors">{error.country}</small>}
          {error.country_length && (
            <small className="errors">{error.country_length}</small>
          )}

          <div className="container-input">
            <label htmlFor="inputProvince">Province:</label>
            <input
              className="form-input"
              type="text"
              id="inputProvince"
              value={values.province}
              name="province"
              placeholder="Province or State"
              onChange={onChange}
            />
          </div>
          {error.province && <small className="errors">{error.province}</small>}
          {error.province_length && (
            <small className="errors">{error.province_length}</small>
          )}

          <div className="container-input">
            <label htmlFor="inputCity">City:</label>
            <input
              className="form-input"
              type="text"
              id="inputCity"
              value={values.city}
              name="city"
              placeholder="City"
              onChange={onChange}
            />
          </div>
          {error.city && <small className="errors">{error.city}</small>}
          {error.city_length && (
            <small className="errors">{error.city_length}</small>
          )}
          <div className="container-input">
            <label htmlFor="inputStreet">Street:</label>
            <input
              className="form-input"
              type="text"
              id="inputStreet"
              value={values.street}
              name="street"
              placeholder="Street"
              onChange={onChange}
            />
          </div>
          {error.street && <small className="errors">{error.street}</small>}
          {error.street_length && (
            <small className="errors">{error.street_length}</small>
          )}
          <div className="container-input">
            <label htmlFor="inputPostalCode">Postal Code:</label>
            <input
              className="form-input"
              type="text"
              id="inputPostalCode"
              value={values.postalCode}
              name="postalCode"
              placeholder="Postal Code:"
              onChange={onChange}
            />
          </div>

          {error.postalCode && (
            <small className="errors">{error.postalCode}</small>
          )}
          {error.postalCode_length && (
            <small className="errors">{error.postalCode_length}</small>
          )}
          {Object.keys(error).length ? (
            <button className="btn-submit" type="submit" disabled={true}>
              Upload Changes
            </button>
          ) : (
            <button className="btn-submit" type="submit">
              Upload Changes
            </button>
          )}
          {error.allFields && (
            <small className="errors">{error.allFields}</small>
          )}
        </form>
      </div>
    </div>
  );
}
