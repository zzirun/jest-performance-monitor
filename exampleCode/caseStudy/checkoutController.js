const {stockModel} = require("../caseStudy/stockModel.js");
const { paymentModel } = require("./paymentModel.js");


class Controller {
    
    async getQuantities(view) {
        const timingStart = window.performance.now();
        let res = await stockModel.getQuantities(view);
        const timing = window.performance.now() - timingStart;
        console.log("getQuantities: " + timing);
        return res;
    }

    async changeQuantity(id, change) {
        const timingStart = window.performance.now();
        let res = await stockModel.changeQuantity(id, change);
        const timing = window.performance.now() - timingStart;
        console.log("changeQuantity: " + timing);
        return res;
        // return await stockModel.changeQuantity(id, change);
    }

    async getPrices(view) {
        const timingStart = window.performance.now();
        let res = await stockModel.getPrices(view);
        const timing = window.performance.now() - timingStart;
        console.log("getPrices: " + timing);
        return res;
        // return await stockModel.getPrices(view);
    }

    async verifyPaymentInfo(view, card, expiry, cvv) {
        const timingStart = window.performance.now();
        let res = await paymentModel.verifyPaymentInfo(view, card, expiry, cvv);
        const timing = window.performance.now() - timingStart;
        console.log("verifyPaymentInfo: " + timing);
        return res;
        // return await paymentModel.verifyPaymentInfo(view, card, expiry, cvv);
    }

    async chargePayment(view, amount, card, expiry, cvv) {
        const timingStart = window.performance.now();
        let res = await paymentModel.chargePayment(view, amount, card, expiry, cvv);
        const timing = window.performance.now() - timingStart;
        console.log("chargePayment: " + timing);
        return res;
        // return await paymentModel.chargePayment(view, amount, card, expiry, cvv);
    }

    async verifyPaymentWithBank(view, amount, card, expiry, cvv) {
        const timingStart = window.performance.now();
        let res = await paymentModel.verifyPaymentWithBank(view, amount, card, expiry, cvv);
        const timing = window.performance.now() - timingStart;
        console.log("verifyPaymentWithBank: " + timing);
        return res;
        // return await paymentModel.verifyPaymentWithBank(view, amount, card, expiry, cvv);
    }

    async getDeliveryDate(view) {
        const timingStart = window.performance.now();
        console.log("helloo")
        let res = await paymentModel.getDeliveryDate(view);
        const timing = window.performance.now() - timingStart;
        console.log("getDeliveryDate: " + timing);
        return res;
        // return await paymentModel.getDeliveryDate(view);
    }
}

const controller = new Controller();

module.exports = controller;