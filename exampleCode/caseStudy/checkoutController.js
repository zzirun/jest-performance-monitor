const {stockModel} = require("../caseStudy/stockModel.js");
const { paymentModel } = require("./paymentModel.js");


class Controller {
    /* Commented out code is to log time taken for code to run 
        for evaluation purposes */
    async getQuantities(view) {
        // const timingStart = window.performance.now();

        let res = await stockModel.getQuantities(view);

        // const timing = window.performance.now() - timingStart;
        // console.log("getQuantities: " + timing);

        return res;
    }

    async changeQuantity(id, change) {
        // const timingStart = window.performance.now();

        let res = await stockModel.changeQuantity(id, change);

        // const timing = window.performance.now() - timingStart;
        // console.log("changeQuantity: " + timing);

        return res;
    }

    async getPrices(view) {
        // const timingStart = window.performance.now();

        let res = await stockModel.getPrices(view);

        // const timing = window.performance.now() - timingStart;
        // console.log("getPrices: " + timing);
    
        return res;
    }

    async verifyPaymentInfo(view, card, expiry, cvv) {
        // const timingStart = window.performance.now();

        let res = await paymentModel.verifyPaymentInfo(view, card, expiry, cvv);

        // const timing = window.performance.now() - timingStart;
        // console.log("verifyPaymentInfo: " + timing);

        return res;
    }

    async chargePayment(view, amount, card, expiry, cvv) {
        // const timingStart = window.performance.now();

        let res = await paymentModel.chargePayment(view, amount, card, expiry, cvv);

        // const timing = window.performance.now() - timingStart;
        // console.log("chargePayment: " + timing);

        return res;
    }

    async verifyPaymentWithBank(view, amount, card, expiry, cvv) {
        // const timingStart = window.performance.now();

        let res = await paymentModel.verifyPaymentWithBank(view, amount, card, expiry, cvv);
        
        // const timing = window.performance.now() - timingStart;
        // console.log("verifyPaymentWithBank: " + timing);

        return res;
    }

    async getDeliveryDate(view) {
        // const timingStart = window.performance.now();

        let res = await paymentModel.getDeliveryDate(view);

        // const timing = window.performance.now() - timingStart;
        // console.log("getDeliveryDate: " + timing);
        
        return res;
    }
}

const controller = new Controller();

module.exports = controller;