const Registrar = require("../index.js");
const mockAxios = require("axios"); //use prototype of mockaxios to make another one ?? 
const RuntimeContext = require("../runtimeContext");
const AsyncMode = require("../asyncModes.js");

/* Mocks & Objects */
jest.mock("axios");
const registrar = new Registrar();

/* Mock implementations */
const getImplementation = () => 
  Promise.resolve({ data: { name: "Zhai Zirun" } });

/* Mock performance models */
const MAX = 200;
const MIN = 10;
// returns random duration between MAX and MIN (excluded)
const randPerfModel = (run, args) => 
  (Math.floor(Math.random() * (MAX - MIN) ) + MIN + 1);

const scalingPerfModel = (run, args) => {
  if (run < 10) {
    return (Math.floor(Math.random() * (MAX/10 - MIN) ) + MIN + 1);
  } else if (run < 50) {
    return (Math.floor(Math.random() * (MAX/2 - MIN) ) + MIN + 1);
  } else {
    return (Math.floor(Math.random() * (MAX - MIN) ) + MIN + 1);
  }
}

/* Assigning mock implementations and models to mocks */
const runtimeCtx = new RuntimeContext(AsyncMode.Parallel);
runtimeCtx.mockImplementationWithModel(mockAxios.get, getImplementation, scalingPerfModel);
runtimeCtx.mockWithModel(mockAxios.put, randPerfModel);

/* Tests */
describe("registrar", () => {
  afterEach(() => {
    jest.clearAllMocks();
    runtimeCtx.clearContext();
  });

  // Without perf testing
  test("should get the first entry from the api", async () => {
    const result = await registrar.getter(1);
    expect(result).toBe("Zhai Zirun");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  // Sync test sync test code (single function in tested code)
  test("should get name within expected time on average", async () => {
    const runs = 100;
    await runtimeCtx.repeat(runs, 
      async () => await registrar.getter(1));
    expect(mockAxios.get).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimePercentile(50)).toBeLessThan(MAX/3 + MIN);
  });

  // Sync test sync test code (multiple functions in tested code)
  test("should change id for name within expected time on average", async () => {
    const runs = 2;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.getter(1);
        await registrar.changeId(1, 2);
      });
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 2);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  // Sync test async test code - serial test runs
  /*  right now this DOES execute properly 
      (ie it only records the time after all functionality has been executed) 
      but it adds up the runtimes of all mock calls serially. */
  // todo: add up runtimes of mock calls taking their invocation time into consideration
  test("should concurrently get and change ids within expected time on average", async () => {
    const runs = 2;
    await runtimeCtx.repeat(runs, 
      async () => {
        const get1 = registrar.getter(1); //get 
        const change1 = registrar.changeId(1, 2); // get and then put
        const get2 = registrar.getter(1); //get
        return Promise.all([get1, change1, get2]);
      });
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 3);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs);
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