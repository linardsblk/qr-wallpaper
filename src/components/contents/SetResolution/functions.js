import axios from 'axios';

export const searchPhones = async (searchQuery) =>
  axios
    .get(`${process.env.REACT_APP_FETCH_PHONES_ENDPOINT}search`, {
      params: {
        query: searchQuery,
      },
    })
    .then(({ data }) => data)
    .catch(console.error);

export const getPhoneResolution = async (slug) =>
  axios
    .get(`${process.env.REACT_APP_FETCH_PHONES_ENDPOINT}getResolution`, {
      params: { slug },
    })
    .then(({ data }) => data)
    .catch(console.error);
