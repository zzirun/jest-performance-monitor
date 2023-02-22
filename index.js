const axios = require("axios");

class Registrar {
  async getter(id) {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return res.data.name;
  }
  
  async register(id, name) {
    await axios.put(`https://swapi.dev/api/people/`, {id: id, name: name});
  }

  async changeId(oldId, newId) {
    let res = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: res.data.name});
  }

}
  

module.exports = Registrar;