/**
 * @jest-environment jsdom
 */

const RuntimeContext = require("../../runtimeContext/runtimeContext.js");
const AsyncMode = require("../../runtimeContext/asyncModes.js");
const TimeUnit = require("../../runtimeContext/timeUnits.js");
const {timelinesProcessor} = require('../../runtimeContext/timelinesProcessor.js');

const {OrderView, PaymentView} = require("../../exampleCode/caseStudy/checkoutView.js");

const mockController = require("../../exampleCode/caseStudy/checkoutController.js");
jest.mock("../../exampleCode/caseStudy/checkoutController.js");
// const mockCreateElement = jest.spyOn(document, "createElement");

const orderView = new OrderView();

/* Mock implementations */
let QUANTITIES = new Map();
QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "1"});
QUANTITIES.set("5", {name: "Pride and Prejudice", qty: "4"});
QUANTITIES.set("110", {name: "Maurice", qty: "10"});

let PRICES = new Map();
PRICES.set("1", 8);
PRICES.set("5", 13);
PRICES.set("10", 9);
PRICES.set("100", 10);
PRICES.set("110", 8);

let TOTAL_PRICE = 140;

const getQtyImp = async () => 
    Promise.resolve(orderView.updateQuantities(QUANTITIES));
    
const getPriceImp = async () =>
    Promise.resolve(orderView.updatePrices(PRICES));

/* Performance models */
const MAX = 1000000;
const MIN = 500000;
// returns random duration between MAX and MIN (excluded)
const randPerfModel = (run, args) => 
  (Math.floor(Math.random() * (MAX - MIN) ) + MIN + 1);

const runtimeCtx = new RuntimeContext(AsyncMode.Auto, TimeUnit.nanosecond, 50000);
// runtimeCtx.mockWithModel(mockCreateElement, 
//                         "document.createElement", 
//                         randPerfModel);
runtimeCtx.mockWithModelAsync(mockController.getQuantities, 
                                "controller.getQuantities", 
                                randPerfModel, 
                                getQtyImp);
runtimeCtx.mockWithModelAsync(mockController.getPrices, 
                                "controller.getPrices", 
                                randPerfModel, 
                                getPriceImp);
runtimeCtx.mockWithModelAsync(mockController.changeQuantity,
                                "controller.changeQuantity")



describe("order info view", () => {
    afterEach(() => {
        jest.clearAllMocks();
        runtimeCtx.clearContext();
    });
    
    afterAll(() => {
        timelinesProcessor.writeResultsToFile();
    })
    
    it("should display books and quantities selected", async () => {
        const runs = 10;
        await runtimeCtx.repeat(runs, async () => {
            await orderView.renderQuantities();
        }, "renders book quantities within average of ns")

        // should query controller
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs);
        // should receive and display update from stock model
        expect(orderView.quantities).toBe(QUANTITIES);
        // expect(mockCreateElement).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    it("should display price of each unique book selected", async () => {
        const runs = 10;
        orderView.quantities = QUANTITIES;
        await runtimeCtx.repeat(runs, async () => {
            await orderView.renderPrices();
        }, "renders book prices within average of ns")

        // should query controller
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);
        // should receive and display update from price model
        expect(orderView.prices).toBe(PRICES);
        // expect(mockCreateElement).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    it("should update payment amount with total price", () => {
        const runs = 10;
        orderView.quantities = QUANTITIES;
        orderView.prices = PRICES;
        runtimeCtx.repeat(runs, async () => {
            orderView.renderTotalPrice();
        }, "renders total price within average of ns")

        // should sum prices and quantities and display total
        expect(orderView.totalPrice).toBe(TOTAL_PRICE);
        // expect(mockCreateElement).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });
});

describe("payment view", () => {
    it("should check if payment information entered is complete and valid", async () => {
        // const runs = 10;
        // await runtimeCtx.repeat(runs, async () => {
        //     await paymentView.verifyPaymentInfo();
        // }, "renders book quantities within average of ns")

        // // should query controller
        // expect(mockController.getQuantities).toHaveBeenCalledTimes(runs);
        // // should receive and display update from stock model
        // expect(orderView.quantities).toBe(QUANTITIES);
        // expect(mockCreateElement).toHaveBeenCalledTimes(runs);
        
        // expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });
    
    it("should charge correct payment amount to card provided", () => {
        
    });

    it("should display that payment has been made", () => {
        
    });
});