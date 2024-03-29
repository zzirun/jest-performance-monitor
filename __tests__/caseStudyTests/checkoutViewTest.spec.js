/**
 * @jest-environment jsdom
 */

const RuntimeContext = require("../../runtimeContext/runtimeContext.js");
const AsyncMode = require("../../runtimeContext/asyncModes.js");
const TimeUnit = require("../../runtimeContext/timeUnits.js");

const {OrderView, PaymentView} = require("../../exampleCode/caseStudy/checkoutView.js");

const mockController = require("../../exampleCode/caseStudy/checkoutController.js");
jest.mock("../../exampleCode/caseStudy/checkoutController.js");
const mockDocumentEditor = require("../../exampleCode/caseStudy/documentEditor.js");
jest.mock("../../exampleCode/caseStudy/documentEditor.js");

let orderView = new OrderView();

/* Mock implementations */
let QUANTITIES = new Map();
QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "1"});
QUANTITIES.set("5", {name: "Pride and Prejudice", qty: "4"});
QUANTITIES.set("110", {name: "Maurice", qty: "10"});

let MODIFIED_QUANTITIES = new Map();
MODIFIED_QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "4"});
MODIFIED_QUANTITIES.set("110", {name: "Maurice", qty: "14"});

let PRICES = new Map();
PRICES.set("1", 8);
PRICES.set("5", 13);
PRICES.set("10", 9);
PRICES.set("100", 10);
PRICES.set("110", 8);

let TOTAL_PRICE = 140;
let MODIFIED_TOTAL_PRICE = 144

const getQtyImp = () => 
    Promise.resolve(orderView.updateQuantities(QUANTITIES));
    
const getPriceImp = () =>
    Promise.resolve(orderView.updatePrices(PRICES));

const changeQtyImp = () => {
    QUANTITIES = MODIFIED_QUANTITIES;
}

/* Performance models */
// returns random duration between max and min (excluded)
function produceRandPerfModel(max, min) {
    const randPerfModel = (run, args) => (Math.floor(Math.random() * (max - min) ) + min + 1);
    return randPerfModel;
}

const runtimeCtx = new RuntimeContext(AsyncMode.Auto, TimeUnit.nanosecond, 5000);
runtimeCtx.mockWithModelAsync(mockController.getQuantities, 
                                "controller.getQuantities", 
                                produceRandPerfModel(5000000, 1500000), 
                                getQtyImp);
runtimeCtx.mockWithModelAsync(mockController.getPrices, 
                                "controller.getPrices", 
                                produceRandPerfModel(5500000, 5000000), 
                                getPriceImp);
runtimeCtx.mockWithModelAsync(mockController.changeQuantity,
                                "controller.changeQuantity",
                                produceRandPerfModel(4000000, 3000000),
                                changeQtyImp);

runtimeCtx.mockWithModel(mockDocumentEditor.addQtyToOrderTable,
                            "documentEditor.addQtyToOrderTable",
                            produceRandPerfModel(1500000, 1000000));
runtimeCtx.mockWithModel(mockDocumentEditor.addPriceToOrderTable,
                            "documentEditor.addPriceToOrderTable",
                            produceRandPerfModel(2000000, 1500000));

/* Models enhanced by empirical data */
// const runtimeCtx = new RuntimeContext(AsyncMode.Auto, TimeUnit.nanosecond, 5000);
// runtimeCtx.mockWithModelAsync(mockController.getQuantities, 
//                                 "controller.getQuantities", 
//                                 produceRandPerfModel(397000000, 63700000), 
//                                 getQtyImp);
// runtimeCtx.mockWithModelAsync(mockController.getPrices, 
//                                 "controller.getPrices", 
//                                 produceRandPerfModel(306000000, 55800000), 
//                                 getPriceImp);
// runtimeCtx.mockWithModelAsync(mockController.changeQuantity,
//                                 "controller.changeQuantity",
//                                 produceRandPerfModel(377000000, 209000000),
//                                 changeQtyImp);

// runtimeCtx.mockWithModel(mockDocumentEditor.addQtyToOrderTable,
//                             "documentEditor.addQtyToOrderTable",
//                             produceRandPerfModel(300000, 100000));
// runtimeCtx.mockWithModel(mockDocumentEditor.addPriceToOrderTable,
//                             "documentEditor.addPriceToOrderTable",
//                             produceRandPerfModel(200000, 100000));

const runs = 1; 

describe("order info view", () => {
    afterEach(() => {
        orderView = new OrderView();
        QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "1"});
        QUANTITIES.set("5", {name: "Pride and Prejudice", qty: "4"});
        QUANTITIES.set("110", {name: "Maurice", qty: "10"});

        jest.clearAllMocks();
        runtimeCtx.clearContext();
    });
    
    afterAll(() => {
        runtimeCtx.writeResultsToFile("../orderTimelineData.txt");
    })
    
    // Single async mock call
    it("should display books and quantities selected", async () => {
        await runtimeCtx.repeat(runs, async () => {
            await orderView.renderQuantities();
        }, "renders book quantities within average of 15000000 ns")

        // should query controller
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs);
        // should receive and display update from stock model
        expect(orderView.quantities).toBe(QUANTITIES);
        expect(mockDocumentEditor.addQtyToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
        expect(runtimeCtx.runtimeMean()).toBeLessThan(15000000);
        expect(runtimeCtx.runtimePercentile(100)).toBeLessThan(20000000);
    });

    // Serial async mock calls
    it("should display price of each unique book selected", async () => {
        await runtimeCtx.repeat(runs, async () => {
            await orderView.renderQuantities();
            await orderView.renderPrices();
        }, "renders book prices within average of 30000000ns")

        // should query controller
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);
        // should receive and display update from price model
        expect(orderView.prices).toBe(PRICES);
        expect(mockDocumentEditor.addPriceToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
        expect(runtimeCtx.runtimeMean()).toBeLessThan(30000000);
    });

    // Parallel async mock calls
    it("should get book quantities and prices independently", async () => {
        await runtimeCtx.repeat(runs, async () => {
            let qty = orderView.renderQuantities();
            let price = orderView.renderPrices();
            await Promise.allSettled([qty, price]);
        }, "concurrently renders book quantities and prices within average of 30000000ns")

        // should query controller
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs);
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);
        // should receive and display updates from models
        expect(orderView.quantities).toBe(QUANTITIES);
        expect(orderView.prices).toBe(PRICES);
        expect(mockDocumentEditor.addQtyToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
        expect(mockDocumentEditor.addPriceToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
        expect(runtimeCtx.runtimeMean()).toBeLessThan(30000000);
    });

    // No mock calls, just real time
    it("should calculate total price correctly", async () => {
        orderView.quantities = QUANTITIES;
        orderView.prices = PRICES;
        await runtimeCtx.repeat(runs, () => {
            orderView.renderTotalPrice();
        }, "renders total prices within average of ns")

        // should calculate total price correctly
        expect(orderView.totalPrice).toBe(TOTAL_PRICE);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    // Order display flow
    it("should render quantities, prices, and total price on page load", async () => {
        await runtimeCtx.repeat(10, () => {
            orderView.startingRender();
        }, "Full order display flow")

        // should calculate total price correctly
        expect(orderView.quantities).toBe(QUANTITIES);
        expect(orderView.prices).toBe(PRICES);
        expect(orderView.totalPrice).toBe(TOTAL_PRICE);
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    // Parallel async mock calls awaited by another mock call
    it("should display new quantities after order changes", async () => {
        await runtimeCtx.repeat(runs, async () => {
            
            let change1 = {id: "1", change: 2};
            let change2 = {id: "5", change: -4};
            let change3 = {id: "10", change: 4};
            await orderView.changeQuantities([change1, change2, change3]);

            await orderView.renderQuantities();
            
        }, "performs quantity changes and re-renders quantities within average of ns")

        // should query controller
        expect(mockController.changeQuantity).toHaveBeenCalledTimes(runs * 3);
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs * 2);
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);

        // should receive and display updates from models
        expect(orderView.quantities).toBe(MODIFIED_QUANTITIES);
        expect(orderView.prices).toBe(PRICES);
        expect(orderView.totalPrice).toBe(MODIFIED_TOTAL_PRICE);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

});

let paymentView = new PaymentView();
let PAYMENT_STATUS = 0;
let DATE = "1/1/11";
let AMOUNT = 140;
let CARD = "1234567890123456";
let EXPIRY = "0222";
let CVV = "123";

const verifyPaymentImp = () => {
    if (PAYMENT_STATUS == 0) {
        paymentView.updatePaymentStatus(0, "Payment method invalid!");
        return false;
    } else {
        return true;
    }
}

const verifyPaymentWithBankImp = () => {
    if (PAYMENT_STATUS == 1) {
        paymentView.updatePaymentStatus(1, "Payment invalidated by bank!");
        return false;
    } else {
        return true;
    }
}

const chargePaymentImp = async () => {
    paymentView.updatePaymentStatus(2, "Payment successful!");
    return true;
}

const getDeliveryDateImp = () => 
    Promise.resolve(paymentView.updateDeliveryDate(DATE));


runtimeCtx.mockWithModelAsync(mockController.verifyPaymentInfo, 
    "controller.verifyPaymentInfo", 
    produceRandPerfModel(8000000, 7000000), 
    verifyPaymentImp);
runtimeCtx.mockWithModelAsync(mockController.chargePayment, 
    "controller.chargePayment", 
    produceRandPerfModel(7000000, 6000000), 
    chargePaymentImp);
runtimeCtx.mockWithModelAsync(mockController.verifyPaymentWithBank,
    "controller.verifyPaymentWithBank",
    produceRandPerfModel(10000000, 5000000),
    verifyPaymentWithBankImp);
runtimeCtx.mockWithModelAsync(mockController.getDeliveryDate,
    "controller.getDeliveryDate",
    produceRandPerfModel(4000000, 3000000),
    getDeliveryDateImp);

runtimeCtx.mockWithModel(mockDocumentEditor.addPaymentStatus,
                            "documentEditor.addPaymentStatus",
                            produceRandPerfModel(700000, 600000));
runtimeCtx.mockWithModel(mockDocumentEditor.addDeliveryDate,
                            "documentEditor.addDeliveryDate",
                            produceRandPerfModel(700000, 600000));

/* Models enhanced by empirical data */
// runtimeCtx.mockWithModelAsync(mockController.verifyPaymentInfo, 
//     "controller.verifyPaymentInfo", 
//     produceRandPerfModel(117000000, 60100000), 
//     verifyPaymentImp);
// runtimeCtx.mockWithModelAsync(mockController.chargePayment, 
//     "controller.chargePayment", 
//     produceRandPerfModel(1400000, 100000), 
//     chargePaymentImp);
// runtimeCtx.mockWithModelAsync(mockController.verifyPaymentWithBank,
//     "controller.verifyPaymentWithBank",
//     produceRandPerfModel(155000000, 58700000),
//     verifyPaymentWithBankImp);
// runtimeCtx.mockWithModelAsync(mockController.getDeliveryDate,
//     "controller.getDeliveryDate",
//     produceRandPerfModel(87600000, 54800000),
//     getDeliveryDateImp);

// runtimeCtx.mockWithModel(mockDocumentEditor.addPaymentStatus,
//                             "documentEditor.addPaymentStatus",
//                             produceRandPerfModel(200000, 100000));
// runtimeCtx.mockWithModel(mockDocumentEditor.addDeliveryDate,
//                             "documentEditor.addDeliveryDate",
//                             produceRandPerfModel(200000, 100000));

describe("payment view", () => {
    afterEach(() => {
        paymentView = new PaymentView();
        PAYMENT_STATUS = 0;

        jest.clearAllMocks();
        runtimeCtx.clearContext();
    });
    
    afterAll(() => {
        runtimeCtx.writeResultsToFile("../paymentTimelineData.txt");
    })

    it("should check if payment information entered is complete and valid", async () => {
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.checkPaymentInfo(CARD, EXPIRY, CVV);
        }, "checks payment info within average of ns")

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });
    
    it("should be able to charge payment without bank verification", async () => {
        PAYMENT_STATUS = 2;
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.chargePayment(AMOUNT, CARD, EXPIRY, CVV);
        }, "charges payment without bank verification within average of ns")

        // should query controller
        expect(mockController.chargePayment).toHaveBeenCalledTimes(runs);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(0);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    it("should be able to charge payment with bank verification", async () => {
        PAYMENT_STATUS = 2;
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.chargePaymentWithBankVerification(AMOUNT, CARD, EXPIRY, CVV);
        }, "charges payment with bank verification within average of ns")

        // should query controller
        expect(mockController.chargePayment).toHaveBeenCalledTimes(runs);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(runs * 2);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    it("should be able to get delivery date and display it", async () => {
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.getDeliveryDate();
        }, "gets delivery date and displays it within average of ns")

        // should query controller
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(runs);
        // should receive and display update
        expect(paymentView.deliveryDate).toBe(DATE);
        expect(mockDocumentEditor.addDeliveryDate).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    it("handles invalid payment method in overall payment flow", async () => {
        PAYMENT_STATUS = 0;
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, true);
        }, "performs overall payment flow for invalid payment method within average of ns")

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        expect(mockController.chargePayment).toHaveBeenCalledTimes(0);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(0);
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(0);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    // Sync test code with real-time delay
    it("handles payment invalidated by bank in overall payment flow", async () => {
        PAYMENT_STATUS = 1;
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, true);
        }, "performs overall payment flow for payment invalidated by bank within average of ns")

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        expect(mockController.chargePayment).toHaveBeenCalledTimes(0);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(runs * 2);
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(0);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs * 2);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    // Async test code with nested async mock calls
    it("handles successful payment with bank validation in overall payment flow", async () => {
        PAYMENT_STATUS = 2;
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, true);
        }, "performs overall payment flow for successful payment with bank validation within average of ns")

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        expect(mockController.chargePayment).toHaveBeenCalledTimes(runs);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(runs * 2);
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(runs);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        expect(paymentView.deliveryDate).toBe(DATE);
        expect(mockDocumentEditor.addDeliveryDate).toHaveBeenCalledTimes(runs);
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });

    // Async test code with real-time delay
    it("handles successful payment without bank validation in overall payment flow", async () => {
        PAYMENT_STATUS = 2;
        await runtimeCtx.repeat(runs, async () => {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, false);
        }, "performs overall payment flow for successful payment without bank validation within average of ns")

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        expect(mockController.chargePayment).toHaveBeenCalledTimes(runs);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(0);
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(runs);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        expect(paymentView.deliveryDate).toBe(DATE);
        expect(mockDocumentEditor.addDeliveryDate).toHaveBeenCalledTimes(runs);
        
        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    });
    
});

describe("full page rendering", () => {
    afterEach(() => {
        jest.clearAllMocks();
        runtimeCtx.clearContext();
    });
    
    afterAll(() => {
        runtimeCtx.writeResultsToFile("../paymentTimelineData.txt");
    })

    it("should be able to render the full page", async () => {
        await runtimeCtx.repeat(runs, async() => {
            let orderView = new OrderView();
            orderView.startingRender();
            let paymentView = new PaymentView();
        })

        expect(runtimeCtx.runtimeMean()).toBeLessThan(1000000);
    })
})