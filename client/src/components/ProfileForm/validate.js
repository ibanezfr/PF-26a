const checkUndefined = (input) => {
  if (input.fullName.length === 0) return true;
  if (input.street.length === 0) return true;
  if (input.city.length === 0) return true;
  if (input.province.length === 0) return true;
  if (input.postalCode.length === 0) return true;
  if (input.country.length === 0) return true;
  if (input.image.length === 0) return true;

  for (let key in input) {
    return input[key] === "";
  }
};

export const validate = (input) => {
  const { fullName, image, street, city, province, postalCode, country } =
    input;
  // letras numeros y espacios
  const namecheck = /^[A-Za-z0-9\s]+$/;

  // verifica que sea una imagen url jpg o png
  // const imgUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

  const errors = {};

  if (checkUndefined(input)) errors.allFields = "All fields are required";

  if (!namecheck.test(fullName)) {
    errors.fullName = "Only number, letters and spaces are accepted";
  } else if (fullName.length <= 2 || fullName.length > 20) {
    errors.name_length = "The name must contain between 3 and 20 characters";
  }

  if (!namecheck.test(street)) {
    errors.street = "Only number, letters and spaces are accepted";
  } else if (street.length <= 2 || street.length > 20) {
    errors.street_length =
      "The Street must contain between 3 and 20 characters";
  }

  if (!namecheck.test(city)) {
    errors.city = "Only number, letters and spaces are accepted";
  } else if (city.length <= 2 || city.length > 20) {
    errors.city_length = "The City must contain between 3 and 20 characters";
  }

  if (!namecheck.test(province)) {
    errors.city = "Only number, letters and spaces are accepted";
  } else if (province.length <= 2 || province.length > 20) {
    errors.province_length =
      "The province must contain between 3 and 20 characters";
  }

  if (!namecheck.test(country)) {
    errors.city = "Only number, letters and spaces are accepted";
  } else if (country.length <= 2 || country.length > 20) {
    errors.country_length =
      "The Country must contain between 3 and 20 characters";
  }

  if (!namecheck.test(postalCode)) {
    errors.city = "Only number, letters and spaces are accepted";
  } else if (postalCode.length <= 2 || postalCode.length > 20) {
    errors.postalCode_length =
      "The Postal code must contain between 3 and 20 characters";
  }

  // if (!imgUrl.test(image))
  //   errors.image = "Image url valid extensions are jpg, jpeg and png";

  return errors;
};
