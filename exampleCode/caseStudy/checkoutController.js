const {stockModel} = require("../caseStudy/stockModel.js");
const { paymentModel } = require("./paymentModel.js");

class Controller {
    
    async getQuantities(view) {
        return await stockModel.getQuantities(view);
    }

    async changeQuantity(id, change) {
        return await stockModel.changeQuantity(id, change);
    }

    async getPrices(view) {
        return await stockModel.getPrices(view);
    }

    verifyPaymentInfo(view, card, expiry, cvv) {
        return paymentModel.verifyPaymentInfo(view, card, expiry, cvv);
    }

    async chargePayment(view, amount, card, expiry, cvv) {
        return await paymentModel.chargePayment(view, amount, card, expiry, cvv);
    }

    async verifyPaymentWithBank(view, amount, card, expiry, cvv) {
        return await paymentModel.verifyPaymentWithBank(view, amount, card, expiry, cvv);
    }

    async getDeliveryDate(view) {
        return await paymentModel.getDeliveryDate(view);
    }

    async emailDeliveryDate(email) {
        return await paymentModel.emailDeliveryDate(email);
    }
}

const controller = new Controller();

module.exports = controller;