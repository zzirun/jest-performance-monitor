const getter = require("../index.js");
const mockAxios = require("axios");
const RuntimeContext = require("../runtimeContext");

/* Mocks */
jest.mock("axios");

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
const runtimeCtx = new RuntimeContext();
runtimeCtx.mockImplementationWithModel(mockAxios.get, getImplementation, scalingPerfModel);
runtimeCtx.mockWithModel(mockAxios.put, randPerfModel);

/* Tests */
describe("getter", () => {
  afterEach(jest.clearAllMocks);

  test("should return the first entry from the api", async () => {
    const result = await getter(1);

    expect(result).toBe("Zhai Zirun");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  test("should return within expected time on average", async () => {
    const runs = 100;
    runtimeCtx.repeat(runs, 
      async () => await getter(1));
    expect(mockAxios.get).toHaveBeenCalledTimes(runs);
    expect(runtimeCtx.getMeanRuntime()).toBeLessThan(MAX/3 + MIN);
  });

  test("should get and put name within expected time on average", async() => {

  });

});