const {stockModel} = require("../caseStudy/stockModel.js");
const { paymentModel } = require("./paymentModel.js");

class Controller {
    
    async getQuantities() {
        return await stockModel.getQuantities();
    }

    async changeQuantity(id, change) {
        return await stockModel.changeQuantity(id, change);
    }

    async getPrices() {
        return await stockModel.getPrices();
    }

    verifyPaymentInfo(card, expiry, cvv) {
        return paymentModel.verifyPaymentInfo(card, expiry, cvv);
    }

    async chargePayment(amount, card, expiry, cvv) {
        return await paymentModel.chargePayment(amount, card, expiry, cvv);
    }

    async verifyPaymentWithBank(amount, card, expiry, cvv) {
        return await paymentModel.verifyPaymentWithBank(amount, card, expiry, cvv);
    }

    async getDeliveryDate() {
        return await paymentModel.getDeliveryDate();
    }

    async emailDeliveryDate(email) {
        return await paymentModel.emailDeliveryDate(email);
    }
}

const controller = new Controller();

module.exports = controller;