import axios from 'axios';

export const searchPhones = async (searchQuery) =>
  axios
    .get(`https://api-mobilespecs.azharimm.site/v2/search?query=${searchQuery}`)
    .then((response) => {
      const {
        data: {
          data: { phones },
        },
      } = response;

      return phones.map((e) => ({ name: `${e.brand} ${e.phone_name}`, detail: e.detail }));
    })
    .catch(console.error);

export const getPhoneResolution = async (slug) => {
  axios
    .get(slug)
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
};