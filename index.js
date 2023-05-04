const axios = require("axios");
const {add, sqrt} = require("mathjs")

class Registrar {

  addUp(a,b) {
    for (var i = 0; i < 50000000; i++) {
      var y = 1 + i;
    }
    add(b,a);
    return add(a,b);
  }

  async serialModifyIds(p) {
    const get1 = await axios.get(`https://swapi.dev/api/people/${1}/`);
    var modifiedIds = add(p, [get1.data.id]);
    var modifiedIds = sqrt(modifiedIds);
    await axios.put(`https://swapi.dev/api/people/`, {id: modifiedIds, name: test});
    const get2 = await axios.get(`https://swapi.dev/api/people/${1}/`);
    var modifiedIds = add(p, [get2.data.id]);
    var modifiedIds = sqrt(modifiedIds);
    await axios.put(`https://swapi.dev/api/people/`, {id: modifiedIds, name: test});
  }

  async modifyIds(p) {
    const get1 = await axios.get(`https://swapi.dev/api/people/${1}/`);
    const get2 = axios.get(`https://swapi.dev/api/people/${2}/`);
    var modifiedIds = add(p, [get1.data.id]);
    var modifiedIds = sqrt(modifiedIds);
    await axios.put(`https://swapi.dev/api/people/`, {id: modifiedIds, name: test});
  }

  async getId(id) {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return res.data.name;
  }
  
  async registerId(id, name) {
    await axios.put(`https://swapi.dev/api/people/`, {id: id, name: name});
  }

  async changeId(oldId, newId) {
    let res = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    const put = await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: res.data.name});
    return Promise.allSettled([put]);
  }

  async putAndGetId(oldId, newId) {
    const put = await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: 'Blah'});
    let res = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    return Promise.allSettled([put, res])
  }

  async getIdTogether(id) {
    const get1 = axios.get(`https://swapi.dev/api/people/${id}/`); //get 
    const get2 = axios.get(`https://swapi.dev/api/people/${id}/`); //get
    const get3 = axios.get(`https://swapi.dev/api/people/${id}/`); //get
    return Promise.allSettled([get1, get2, get3]);
  }

  async getAndDelayedPut(id) {
    const get1 = await axios.get(`https://swapi.dev/api/people/${id}/`); //get
    const get2 = axios.get(`https://swapi.dev/api/people/${id}/`);
    var res = get1.data.id;
    for (var i = 0; i < 50000000; i++) {
      res ++;
    }
    const put = axios.put(`https://swapi.dev/api/people/`, {id: res, name: 'blah'})
    return Promise.allSettled([put, get2]);
  }

}

module.exports = Registrar;