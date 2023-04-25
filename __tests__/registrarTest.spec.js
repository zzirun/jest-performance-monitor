const Registrar = require("../index.js");
const mockAxios = require("axios"); //use prototype of mockaxios to make another one ?? 
const mockMath = require("mathjs");
const RuntimeContext = require("../runtimeContext");
const AsyncMode = require("../asyncModes.js");

/* Mocks & Objects */
jest.mock("axios");
jest.mock("mathjs");
const registrar = new Registrar();

/* Mock implementations */
const getImplementation = () => 
  Promise.resolve({ data: { id: 1, name: "Zhai Zirun" } });
const putImplementation = () => {

}
const perImplementation = () => {
  return 5;
}


/* Mock performance models */
const sMAX = 200;
const sMIN = 100;
const rMAX = 99;
const rMIN = 1;

// returns random duration between MAX and MIN (excluded)
const randPerfModel = (run, args) => 
  (Math.floor(Math.random() * (rMAX - rMIN) ) + rMIN + 1);

const scalingPerfModel = (run, args) => {
  if (run < 10) {
    return (Math.floor(Math.random() * (sMAX - sMIN) ) + sMIN + 1);
  } else if (run < 50) {
    return (Math.floor(Math.random() * (sMAX/2 - sMIN) ) + sMIN + 1);
  } else {
    return (Math.floor(Math.random() * (sMAX - sMIN) ) + sMIN + 1);
  }
}

/* Assigning mock implementations and models to mocks */
const runtimeCtx = new RuntimeContext(AsyncMode.Auto);
runtimeCtx.mockImpWithModelAsync(mockAxios.get, getImplementation, scalingPerfModel);
runtimeCtx.mockWithModelAsync(mockAxios.put, randPerfModel);
runtimeCtx.mockWithModel(mockMath.add, randPerfModel)

/* Tests */
describe("registrar", () => {
  afterEach(() => {
    jest.clearAllMocks();
    runtimeCtx.clearContext();
  });

  // Without perf testing
  // test("without perf testing", async () => {
  //   const result = await registrar.getter(1);
  //   expect(result).toBe("Zhai Zirun");
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // });

  // // Sync test sync test code (single function in tested code)
  // test("sync test with sync test code", async () => {
  //   const runs = 1;
  //   await runtimeCtx.repeat(runs, 
  //     async () => await registrar.getter(1));
  //   expect(mockAxios.get).toHaveBeenCalledTimes(runs);
  //   expect(runtimeCtx.runtimePercentile(50)).toBeLessThan(MAX/3 + MIN);
  // });

  // // Sync test sync test code (multiple functions in tested code)
  // test("multiple functions in tested code", async () => {
  //   const runs = 2;
  //   await runtimeCtx.repeat(runs, 
  //     async () => {
  //       await registrar.getter(1);
  //       await registrar.changeId(1, 2);
  //     });
  //   expect(mockAxios.get).toHaveBeenCalledTimes(runs * 2);
  //   expect(mockAxios.put).toHaveBeenCalledTimes(runs);
  //   expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  // });

  // Sync test async test code - serial test runs
  /*  right now this DOES execute properly 
      (ie it only records the time after all functionality has been executed) 
      but it adds up the runtimes of all mock calls serially. */
  // // todo: add up runtimes of mock calls taking their invocation time into consideration
  // test("should concurrently get and change ids within expected time on average", async () => {
  //   const runs = 1;
  //   // var res = -1;
  //   await runtimeCtx.repeat(runs, 
  //     async () => {
  //       // const get1 = registrar.getter(1); //get 
  //       // const change1 = registrar.putAndGet(1, 2); // get and then put
  //       // const change2 = registrar.changeId(1, 2); // get and then put
  //       // const get2 = registrar.getter(1); //get
  //       // return Promise.allSettled([get1, change1, change2, get2]);
        
  //       // await registrar.long(1, 2);
  //       // await registrar.getTogether(1);

  //       await registrar.mix(1);

  //       // return Promise.allSettled([change2, change1]);
  //     });
  //   // expect(mockAxios.get).toHaveBeenCalledTimes(runs * 4);
  //   // expect(mockAxios.put).toHaveBeenCalledTimes(runs * 2);
  //   // expect(res).toBe(50000001);
  //   expect(mockAxios.get).toHaveBeenCalledTimes(runs * 2);
  //   expect(mockAxios.put).toHaveBeenCalledWith(`https://swapi.dev/api/people/`, {id: 50000001, name: 'blah'})
  //   // // expect(mockAxios.put).toHaveBeenCalledTimes(runs * 2);
  //   expect(runtimeCtx.runtimePercentile(90)).toBeLessThan(10);
  // });

  // test("perf test with serial code", async () => {
  //   const runs = 1;
  //   await runtimeCtx.repeat(runs, 
  //     ()=>registrar.addUp(10, 20));
  //   expect(mockMath.add).toHaveBeenCalledTimes(runs * 2);
  //   expect(runtimeCtx.runtimePercentile(90)).toBeLessThan(10);
  // });

  test("mixing serial and async mocks", async () => {
    const runs = 1
    await runtimeCtx.repeat(runs, 
      ()=>registrar.modifiedIds(10));
    expect(mockAxios.get).toHaveBeenCalledTimes(runs*2);
    expect(mockMath.add).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimePercentile(90)).toBeLessThan(10);
  });

  // // Sync test async test code - concurrent test runs
  // // todo: set up monitors and mocks to keep track of individual run results
  // test("should concurrently get and change ids within expected time on average", async () => {
  //   const runs = 2;
  //   // await runtimeCtx.repeatConcurrently(runs, 
  //   //   async () => {
  //   //     const get1 = registrar.getter(1);
  //   //     const change1 = registrar.changeId(1, 2);
  //   //     const get2 = registrar.getter(1);
  //   //     return Promise.all([get1, change1, get2]);
  //   //   });
  //   // what if instead of doing the above we did the below
  //   // so a single async test run replaces multiple concurrent serial test runs 
  //   await runtimeCtx.repeat(1, 
  //     async() => {
  //       promises = []
  //       for (let i = 0; i < runs; i++) {
  //         const get1 = registrar.getter(1);
  //         const change1 = registrar.changeId(1, 2);
  //         const get2 = registrar.getter(1);
  //         promises.push([get1, change1, get2]); 
  //       }
  //       return Promise.all(promises);
  //     });
  //   expect(mockAxios.get).toHaveBeenCalledTimes(runs * 3);
  //   expect(mockAxios.put).toHaveBeenCalledTimes(runs);
  //   expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  // });


});