import axios from 'axios';
import { get } from 'lodash-es';

export const searchPhones = async (searchQuery) =>
  axios
    .get(`${process.env.REACT_APP_FETCH_PHONES_ENDPOINT}search`, {
      params: {
        query: searchQuery
      }
    })
    .then((response) => {

      const phones = get(response, "data.data.phones", []);

      return phones.map((e) => ({ name: `${e.brand} ${e.phone_name}`, slug: e.slug }));
    })
    .catch(console.error);

export const getPhoneResolution = async (slug) =>
  axios
    .get(`${process.env.REACT_APP_FETCH_PHONES_ENDPOINT}${slug}`)
    .then((res) => {
      const { specifications } = res.data.data || {};

      const display = specifications.find((e) => e.title === 'Display').specs;
      const resolution = display.find((e) => e.key === 'Resolution').val[0];

      const width = parseInt(resolution.substr(0, resolution.indexOf('x')));
      const height = parseInt(
        resolution.substr(resolution.indexOf('x') + 1, resolution.indexOf('p') - resolution.indexOf('x') - 1)
      );

      return { width, height };
    })
    .catch(console.error);
