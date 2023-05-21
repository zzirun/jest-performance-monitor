const controller = require("./checkoutController.js");
const documentEditor = require("./documentEditor.js");

class OrderView {

    constructor() {
        documentEditor.createOrderTable();
        // this.rows = new Map();
        this.quantities = new Map();
        this.prices = new Map();
    }

    async renderQuantities() {
        return controller.getQuantities(this);
    }

    async changeQuantity(id, change) {
        return controller.changeQuantity(this, id, change);
    }

    async renderPrices() {
        return controller.getPrices(this);
    }

    renderTotalPrice() {
        this.totalPrice = 0;
        for (let [id, info] of this.quantities) {
            let currSum = parseInt(info.qty) * this.prices.get(id);
            this.totalPrice += currSum;
        }
    }

    updateQuantities(quantities) {
        this.quantities = quantities;
        // this.rows = new Map();
        documentEditor.clearOrderTable();
        for (let [id, info] of quantities) {
            documentEditor.addQtyToOrderTable(id, info);
        }
    }

    updatePrices(prices) {
        this.prices = prices;
        for (let [id, price] of prices) {
            if (this.quantities.has(id)) {
                documentEditor.addPriceToOrderTable(id, price);
            }
        }
    }

}

class PaymentView {
    constructor() {
        documentEditor.createPaymentDiv();
    }

    async processPayment(amount, card, expiry, cvv, email, bankVerification) {
        let validPaymentInfo = await this.checkPaymentInfo(card, expiry, cvv);
        if (validPaymentInfo) {
            if (bankVerification) {
                let successfulPayment = await this.chargePaymentWithBankVerification(amount, card, expiry, cvv);
                if (successfulPayment) {
                    await this.getDeliveryDate(email);
                }
            } else {
                let delivery = this.getDeliveryDate(email);
                let payment = this.chargePayment(amount, card, expiry, cvv);
                await Promise.allSettled([payment, delivery]);
            }
        }
    }

    async checkPaymentInfo(card, expiry, cvv) {
        let syntaxCorrect = this.syntaxCheck(card, expiry, cvv);
        if (syntaxCorrect) {
            let encryptedCard = this.encryptCardInfo();
            return controller.verifyPaymentInfo(encryptedCard, expiry, cvv);
        } else {
            this.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        }
    }

    syntaxCheck(card, expiry, cvv) {
        let cardLen = card.length == 16;
        let expiryLen = expiry.length == 4;
        let cvvLen = cvv.length == 3;
        return cardLen && expiryLen && cvvLen;
    }

    encryptCardInfo(card) {
        let encryptedCard = card;
        for (var i = 0; i < 500000; i++) {
            encryptedCard ++;
        }
        return encryptedCard;
    }

    async chargePayment(amount, card, expiry, cvv) {
        let encryptedCard = this.encryptCardInfo(card);
        return await controller.chargePayment(amount, encryptedCard, expiry, cvv);
    }

    async chargePaymentWithBankVerification(amount, card, expiry, cvv) {
        let firstVerification = await controller.verifyPaymentWithBank(amount, card, expiry, cvv);
        let secondVerification = await controller.verifyPaymentWithBank(amount, card, expiry, cvv);
        if (firstVerification && secondVerification) {
            return await controller.chargePayment(amount, card, expiry, cvv);
        }
        return false;
    }

    async getDeliveryDate(email) {
        let displayed = controller.getDeliveryDate();
        let emailed = controller.emailDeliveryDate(email);
        return Promise.allSettled([displayed, emailed]);
    }

    updatePaymentStatus(status, message) {
        this.paymentStatus = status;
        documentEditor.addPaymentStatus(message);
    }

    updateDeliveryDate(date) {
        this.deliveryDate = date;
        documentEditor.addDeliveryDate(date);
    }

}

module.exports = {OrderView, PaymentView}