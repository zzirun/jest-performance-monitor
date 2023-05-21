const Registrar = require("../../exampleCode/codePatterns/index.js");
const mockAxios = require("axios"); //use prototype of mockaxios to make another one ?? 
const mockMath = require("mathjs");
const RuntimeContext = require("../../runtimeContext/runtimeContext.js");
const AsyncMode = require("../../runtimeContext/asyncModes.js");
const TimeUnit = require("../../runtimeContext/timeUnits.js")
const {timelinesProcessor} = require('../../runtimeContext/timelinesProcessor.js');

/* Mocks & Objects */
jest.mock("axios");
jest.mock("mathjs");
const registrar = new Registrar();

/* Mock implementations */
const getImplementation = () => 
  Promise.resolve({ data: { id: 1, name: "Zhai Zirun" } });

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
const runtimeCtx = new RuntimeContext(AsyncMode.Auto, TimeUnit.millisecond, 0.05);
runtimeCtx.mockWithModelAsync(mockAxios.get, "get", scalingPerfModel, getImplementation);
runtimeCtx.mockWithModelAsync(mockAxios.put, "put", randPerfModel, getImplementation);
runtimeCtx.mockWithModel(mockMath.add, "add", randPerfModel)

/* Tests */
describe("registrar", () => {
  afterEach(() => {
    jest.clearAllMocks();
    runtimeCtx.clearContext();
  });
  
  afterAll(() => {
    timelinesProcessor.writeResultsToFile();
  })

  test("Without perf testing", async () => {
    const result = await registrar.getId(1);
    expect(result).toBe("Zhai Zirun");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  test("Sync test code with 1 async mock call", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => await registrar.getId(1),
      "Sync test code with 1 async func");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimePercentile(50)).toBeLessThan(10);
  });

  test("Sync test code with multiple async mock calls", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.mixedIdCalls();
      },
      "Sync test code with multiple async mock calls");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 6);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs * 3);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Sync test code with sync and async mocks", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.serialModifyIds(1);
      },
      "Sync test code with sync and async mocks");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 2);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs * 2);
    expect(mockMath.add).toHaveBeenCalledTimes(runs * 2);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Sync test code with mocks and real time delay", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => {
        registrar.addUp(1, 2);
      },
      "Sync test code with mocks and real time delay");
    expect(mockMath.add).toHaveBeenCalledTimes(runs * 2);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Async test code with only parallel async mock calls", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.getIdTogether();
      },
      "Async test code with only parallel async mock calls");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 3);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Async test code with parallel async calls and a call awaiting all of them", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.doubleGetId(1);
        await registrar.getIdTogether();
        await registrar.getId(1);
      },
      "Async test code with parallel async calls and a call awaiting all of them");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 5);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Async test code with parallel async mock calls and a call awaiting one of them", async () => {
    const runs = 1;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.mixedIdCallsAsync();
        //PROBLEMATIC:(
      },
      "Async test code with parallel async mock calls and a call awaiting one of them");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 4);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Async test code with parallel execution involving real-time delays", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      async () => {
        await registrar.getAndDelayedPut(1);
      },
      "Async test code with parallel async calls involving real-time delays");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 2);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

  test("Async test code with parallel execution involving sync and async mock calls", async () => {
    const runs = 6;
    await runtimeCtx.repeat(runs, 
      ()=>registrar.modifyIds(10),
      "Async test code with parallel execution involving sync and async mock calls");
    expect(mockAxios.get).toHaveBeenCalledTimes(runs * 2);
    expect(mockAxios.put).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.runtimeMean()).toBeLessThan(10);
  });

});