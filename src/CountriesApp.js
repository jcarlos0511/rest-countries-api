import React, { useReducer } from "react";
import axiosConfig from "./api/config";
import { MainContext } from "./context/MainContext";
import { MainReducer } from "./context/MainReducer";
import MainRouter from "./routers/MainRouter";
import { GET_ALL_COUNTRIES, GET_CODE_COUNTRY } from "./types";

const CountriesApp = () => {
  const initialState = {
    countries: null,
    country: null,
  };

  const [state, dispatch] = useReducer(MainReducer, initialState);

  const getAllCountries = async () => {
    const url = "/all";

    const response = await axiosConfig.get(url);

    dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
  };

  const getCountryByCode = async (code) => {
    const url = `/alpha/${code}`;

    const response = await axiosConfig.get(url);

    console.log(response.data);

    dispatch({ type: GET_CODE_COUNTRY, payload: response.data });
  };

  return (
    <MainContext.Provider
      value={{
        countries: state.countries,
        country: state.country,
        getAllCountries,
        getCountryByCode,
      }}
    >
      <MainRouter />
    </MainContext.Provider>
  );
};

export default CountriesApp;
