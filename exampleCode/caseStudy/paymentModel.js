//dummy values
let DATE = "3/3/23";
let PAYMENT_STATUS = 2;

class PaymentModel {
    verifyPaymentInfo(view, card, expiry, cvv) {
        if (PAYMENT_STATUS == 0) {
            view.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        } else {
            return true;
        }
    }

    async chargePayment(view, amount, card, expiry, cvv) {
        view.updatePaymentStatus(2, "Payment successful!");
        return true;
    }

    async verifyPaymentWithBank(view, amount, card, expiry, cvv) {
        if (PAYMENT_STATUS == 1) {
            view.updatePaymentStatus(1, "Payment invalidated by bank!");
            return false;
        } else {
            return true;
        }
    }

    async getDeliveryDate(view) {
        view.updateDeliveryDate(DATE);
        return true;
        // return Promise.resolve(view.updateDeliveryDate(DATE));
    }

    async emailDeliveryDate(email) {

    }
}

const paymentModel = new PaymentModel();

module.exports = {paymentModel}