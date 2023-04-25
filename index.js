const axios = require("axios");
const percentile = require("percentile");
const {add, sqrt} = require("mathjs")

class Registrar {

  addUp(a,b) {
    for (var i = 0; i < 50000000; i++) {
      var y = 1 + i;
    }
    add(b,a);
    return add(a,b);
  }

  async modifiedIds(p) {
    const get1 = await axios.get(`https://swapi.dev/api/people/${1}/`);
    const get2 = axios.get(`https://swapi.dev/api/people/${2}/`);
    // const get3 = axios.get(`https://swapi.dev/api/people/${3}/`);
    // await Promise.allSettled([get1, get2, get3]);
    var modifiedIds = add(p, [get1.data.id]);
    var modifiedIds = sqrt(modifiedIds);
    await axios.put(`https://swapi.dev/api/people/`, {id: modifiedIds, name: test});
  }

  async getter(id) {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return res.data.name;
  }
  
  async register(id, name) {
    await axios.put(`https://swapi.dev/api/people/`, {id: id, name: name});
  }

  async changeId(oldId, newId) {
    let res = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    const put = await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: res.data.name});
    return Promise.allSettled([put]);
  }

  async putAndGet(oldId, newId) {
    const put = await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: 'Blah'});
    let res = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    return Promise.allSettled(res)
  }

  async getTogether(id) {
    const get1 = axios.get(`https://swapi.dev/api/people/${id}/`); //get 
    const get2 = axios.get(`https://swapi.dev/api/people/${id}/`); //get
    return Promise.allSettled([get1, get2]);
  }

  async long(oldId, newId) {
    let res1 = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    const put1 = await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: res1.data.name});
    let res = await axios.get(`https://swapi.dev/api/people/${oldId}/`);
    const put = await axios.put(`https://swapi.dev/api/people/`, {id: newId, name: res.data.name});
    // await this.getTogether(oldId);
    // await this.changeId(newId, oldId);
    // const get1 = axios.get(`https://swapi.dev/api/people/${oldId}/`); 
    // const get2 = axios.get(`https://swapi.dev/api/people/${oldId}/`);

    // return Promise.all([get1, get2]);
  }
  //todo: make async function with interleaving inside?

  async mix(id) {
    const get1 = await axios.get(`https://swapi.dev/api/people/${id}/`); //get
    const get2 = axios.get(`https://swapi.dev/api/people/${id}/`);
    var res = get1.data.id;
    for (var i = 0; i < 50000000; i++) {
      res ++;
    }
    const put = axios.put(`https://swapi.dev/api/people/`, {id: res, name: 'blah'})
    
    // return res;
    // const get2 = axios.get(`https://swapi.dev/api/people/${id}/`); //get
    return Promise.allSettled([put, get2]);
  }

}


  

module.exports = Registrar;