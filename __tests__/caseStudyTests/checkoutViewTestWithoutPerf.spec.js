/*  This file contains the same test suite as the one in checkoutViewTest, 
    but without performance testing with QuiP (i.e. just vanilla Jest) 
    It is used to evaluate the effect of QuiP on test turnaround time. */ 

/**
 * @jest-environment jsdom
 */

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

const getQtyImp = async () => 
    Promise.resolve(orderView.updateQuantities(QUANTITIES));
    
const getPriceImp = async () =>
    Promise.resolve(orderView.updatePrices(PRICES));

const changeQtyImp = async () => {
    QUANTITIES = MODIFIED_QUANTITIES;
}

mockController.getQuantities.mockImplementation(getQtyImp);
mockController.getPrices.mockImplementation(getPriceImp);
mockController.changeQuantity.mockImplementation(changeQtyImp);

const runs = 10; 

describe("order info view", () => {
    afterEach(() => {
        orderView = new OrderView();
        QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "1"});
        QUANTITIES.set("5", {name: "Pride and Prejudice", qty: "4"});
        QUANTITIES.set("110", {name: "Maurice", qty: "10"});

        jest.clearAllMocks();
    });
    
    // Single async mock call
    it("should display books and quantities selected", async () => {
        for (let i = 0; i < runs; i++) {
            await orderView.renderQuantities();
        }
        

        // should query controller
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs);
        // should receive and display update from stock model
        expect(orderView.quantities).toBe(QUANTITIES);
        expect(mockDocumentEditor.addQtyToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
    });

    // Serial async mock calls
    it("should display price of each unique book selected", async () => {
        for (let i = 0; i < runs; i++) {
            await orderView.renderQuantities();
            await orderView.renderPrices();
        }

        // should query controller
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);
        // should receive and display update from price model
        expect(orderView.prices).toBe(PRICES);
        expect(mockDocumentEditor.addPriceToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
    });

    // Parallel async mock calls
    it("should get book quantities and prices independently", async () => {
        for (let i = 0; i < runs; i++) {
            let qty = orderView.renderQuantities();
            let price = orderView.renderPrices();
            await Promise.allSettled([qty, price]);
        }

        // should query controller
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs);
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);
        // should receive and display updates from models
        expect(orderView.quantities).toBe(QUANTITIES);
        expect(orderView.prices).toBe(PRICES);
        expect(mockDocumentEditor.addQtyToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
        expect(mockDocumentEditor.addPriceToOrderTable).toHaveBeenCalledTimes(QUANTITIES.size * runs);
    });

    // No mock calls, just real time
    it("should calculate total price correctly", async () => {

        orderView.quantities = QUANTITIES;
        orderView.prices = PRICES;
        for (let i = 0; i < runs; i++) {
            orderView.renderTotalPrice();
        }

        // should calculate total price correctly
        expect(orderView.totalPrice).toBe(TOTAL_PRICE);
    });

    // Order display flow
    it("should render quantities, prices, and total price on page load", async () => {

        for (let i = 0; i < runs; i++) {
            orderView.startingRender();
        }

        // should calculate total price correctly
        expect(orderView.quantities).toBe(QUANTITIES);
        expect(orderView.prices).toBe(PRICES);
        expect(orderView.totalPrice).toBe(TOTAL_PRICE);
    });

    // Parallel async mock calls awaited by another mock call
    it("should display new quantities after order changes", async () => {
        for (let i = 0; i < runs; i++) {
            let qty = orderView.renderQuantities();
            let price = orderView.renderPrices();
            await Promise.allSettled([qty, price]);

            let change1 = orderView.changeQuantity("1", 3);
            let change2 = orderView.changeQuantity("5", -4);
            let change3 = orderView.changeQuantity("10", 4);
            await Promise.allSettled([change1, change2, change3]);

            await orderView.renderQuantities();
            orderView.renderTotalPrice();
        }

        // should query controller
        expect(mockController.changeQuantity).toHaveBeenCalledTimes(runs * 3);
        expect(mockController.getQuantities).toHaveBeenCalledTimes(runs * 2);
        expect(mockController.getPrices).toHaveBeenCalledTimes(runs);

        // should receive and display updates from models
        expect(orderView.quantities).toBe(MODIFIED_QUANTITIES);
        expect(orderView.prices).toBe(PRICES);
        expect(orderView.totalPrice).toBe(MODIFIED_TOTAL_PRICE);
        
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



mockController.verifyPaymentInfo.mockImplementation(verifyPaymentImp);
mockController.chargePayment.mockImplementation(chargePaymentImp);
mockController.verifyPaymentWithBank.mockImplementation(verifyPaymentWithBankImp);
mockController.getDeliveryDate.mockImplementation(getDeliveryDateImp);


describe("payment view", () => {
    afterEach(() => {
        paymentView = new PaymentView();
        PAYMENT_STATUS = 0;

        jest.clearAllMocks();
    });

    it("should check if payment information entered is complete and valid", async () => {
        for (let i = 0; i < runs; i++) {
            await paymentView.checkPaymentInfo(CARD, EXPIRY, CVV);
        }

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
    });
    
    it("should be able to charge payment without bank verification", async () => {
        PAYMENT_STATUS = 2;
        for (let i = 0; i < runs; i++) {
            await paymentView.chargePayment(AMOUNT, CARD, EXPIRY, CVV);
        }

        // should query controller
        expect(mockController.chargePayment).toHaveBeenCalledTimes(runs);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(0);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
    });

    it("should be able to charge payment with bank verification", async () => {
        PAYMENT_STATUS = 2;
        for (let i = 0; i < runs; i++) {
            await paymentView.chargePaymentWithBankVerification(AMOUNT, CARD, EXPIRY, CVV);
        }

        // should query controller
        expect(mockController.chargePayment).toHaveBeenCalledTimes(runs);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(runs * 2);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
    });

    it("should be able to get delivery date and display it", async () => {
        for (let i = 0; i < runs; i++) {
            await paymentView.getDeliveryDate();
        }

        // should query controller
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(runs);
        // should receive and display update
        expect(paymentView.deliveryDate).toBe(DATE);
        expect(mockDocumentEditor.addDeliveryDate).toHaveBeenCalledTimes(runs);
        
    });

    it("handles invalid payment method in overall payment flow", async () => {
        PAYMENT_STATUS = 0;
        for (let i = 0; i < runs; i++) {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, true);
        }

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        expect(mockController.chargePayment).toHaveBeenCalledTimes(0);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(0);
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(0);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs);
        
    });

    // Sync test code with real-time delay
    it("handles payment invalidated by bank in overall payment flow", async () => {
        PAYMENT_STATUS = 1;
        for (let i = 0; i < runs; i++) {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, true);
        }

        // should query controller
        expect(mockController.verifyPaymentInfo).toHaveBeenCalledTimes(runs);
        expect(mockController.chargePayment).toHaveBeenCalledTimes(0);
        expect(mockController.verifyPaymentWithBank).toHaveBeenCalledTimes(runs * 2);
        expect(mockController.getDeliveryDate).toHaveBeenCalledTimes(0);
        // should receive and display update
        expect(paymentView.paymentStatus).toBe(PAYMENT_STATUS);
        expect(mockDocumentEditor.addPaymentStatus).toHaveBeenCalledTimes(runs * 2);
        
    });

    // Async test code with nested async mock calls
    it("handles successful payment with bank validation in overall payment flow", async () => {
        PAYMENT_STATUS = 2;
        for (let i = 0; i < runs; i++) {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, true);
        }

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
    });

    // Async test code with real-time delay
    it("handles successful payment without bank validation in overall payment flow", async () => {
        PAYMENT_STATUS = 2;
        for (let i = 0; i < runs; i++) {
            await paymentView.processPayment(AMOUNT, CARD, EXPIRY, CVV, false);
        }

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
        
    });
    
});