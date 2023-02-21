const axios = require("axios");


const getter = (id) =>
  axios.get(`https://swapi.dev/api/people/${id}/`).then((res) => res.data.name);

module.exports = getter;