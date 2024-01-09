import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import {
  setRegion,
  setCountry,
  addLocation,
} from "../redux/actions/locationActions";

const ModalOverlay = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.span`
  font-size: 18px;
  cursor: pointer;
  margin-left: 100%;
`;

const InputField = styled.div`
  margin-bottom: 15px;
  min-width: 330px;
`;

const Select = styled.select`
  width: 80%;
  padding: 8px 15px;
  border-radius: 23px;
  margin-bottom: 10px;
`;

const Heading = styled.h3`
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
`;

const Error = styled.div`
  font-size: 10px;
  color: #fd4949;
  text-align: left;
  padding-left: 1.2rem;
`;

const AddLocationButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 40px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  font-size: 14px;
`;

const AddLocationForm = ({ visible, onClose }) => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const modalRef = useRef(null);
  const dispatch = useDispatch();



  const formik = useFormik({
    initialValues: {
      region: "",
      country: "",
      currency: "",
      callingCode: "",
    },
    validationSchema: Yup.object({
      region: Yup.string().required("Region is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setRegion(values.region));
        dispatch(setCountry(values.country));
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${values.country}`
        );
        const data = await response.json();
        const countryName = data[0]?.name?.common || "";
        const currency =
          data[0]?.currencies[Object.keys(data[0]?.currencies || {})[0] || ""]
            ?.name || "";
        const callingCode =
          data[0]?.idd?.root && data[0]?.idd?.suffixes[0]
            ? `${data[0].idd.root}${data[0].idd.suffixes[0]}`
            : "";
        const countryRegion = data[0]?.region || "";

        dispatch(
          addLocation({
            countryName,
            currency,
            callingCode,
            countryRegion,
          })
        );

        formik.resetForm();
        onClose();
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    },
  });
  useEffect(() => {
    const sampleRegions = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
    setRegions(sampleRegions);
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => {
          const filteredCountries = data.filter(
            (country) => country.region === selectedRegion
          );
          setCountries(filteredCountries);
        })
        .catch((error) => {
          console.error(
            `Error fetching countries for ${selectedRegion}:`,
            error
          );
        });
    }
  }, [selectedRegion]);

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    formik.handleChange(event);
    setSelectedRegion(selectedRegion);
  };

  return (
    <ModalOverlay ref={modalRef} visible={visible}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Heading>Add a Location</Heading>
        <form onSubmit={formik.handleSubmit}>
          <InputField>
            <Select
              id="region"
              name="region"
              onChange={handleRegionChange}
              onBlur={formik.handleBlur}
              value={formik.values.region}
            >
              <option value="" label="Select a region" disabled />
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
            {formik.touched.region && formik.errors.region && (
              <Error>{formik.errors.region}</Error>
            )}
          </InputField>
          <InputField>
            <Select
              id="country"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            >
              <option value="" label="Select a country" disabled />
              {countries.map((country) => (
                <option key={country.cca3} value={country.cca3}>
                  {country.name.common}
                </option>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <Error>{formik.errors.country}</Error>
            )}
          </InputField>
          <AddLocationButton type="submit">Add</AddLocationButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddLocationForm;
