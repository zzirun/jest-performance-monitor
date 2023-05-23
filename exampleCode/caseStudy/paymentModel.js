//dummy values

let PRICES = new Map();
PRICES.set("1", 8);
PRICES.set("5", 13);
PRICES.set("10", 9);
PRICES.set("100", 10);
PRICES.set("110", 8);

let PAYMENT_STATUS = 0;

const {paymentView} = require("../caseStudy/checkoutView");

class PaymentModel {
    verifyPaymentInfo(card, expiry, cvv) {
        if (PAYMENT_STATUS == 0) {
            paymentView.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        } else {
            return true;
        }
    }

    async chargePayment(amount, card, expiry, cvv) {
        paymentView.updatePaymentStatus(2, "Payment successful!");
        return true;
    }

    async verifyPaymentWithBank(amount, card, expiry, cvv) {
        if (PAYMENT_STATUS == 1) {
            paymentView.updatePaymentStatus(1, "Payment invalidated by bank!");
            return false;
        } else {
            return true;
        }
    }

    async getDeliveryDate() {
        return paymentView.updateDeliveryDate(DATE);
    }

    async emailDeliveryDate(email) {

    }
}

const paymentModel = new PaymentModel();

module.exports = {paymentModel}