const getter = require("../index.js");
const mockAxios = require("axios");
const RuntimeMonitor = require("../runtimeMonitor");

const MAX = 200;
const MIN = 10;
// returns random duration between MAX and MIN (excluded)
const randPerfModel = () => 
  (Math.floor(Math.random() * (MAX - MIN) ) + MIN + 1);

jest.mock("axios");
mockAxios.get.mockResolvedValue({ data: { name: "Zhai Zirun" } });

const getRuntimeMonitor = new RuntimeMonitor(mockAxios.get, randPerfModel);

describe("getter", () => {
  afterEach(jest.clearAllMocks);

  test("should return the first entry from the api", async () => {
    const result = await getter(1);

    expect(result).toBe("Zhai Zirun");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  test("should return within expected time on average", async () => {
    const runs = 100;
    getRuntimeMonitor.startMonitoring();
    for (let i = 0; i < runs; i++) {
        await getter(i);
    }
    getRuntimeMonitor.stopMonitoring();

    expect(mockAxios.get).toHaveBeenCalledTimes(runs);
    expect(getRuntimeMonitor.getRuntime()/runs).toBeLessThan(MAX/2 + 10);
    getRuntimeMonitor.resetRuntime();
  });

});