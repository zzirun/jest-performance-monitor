const controller = require("./checkoutController.js");
const documentEditor = require("./documentEditor.js");

class OrderView {

    constructor() {
        documentEditor.createOrderTable(this);
        this.quantities = new Map();
        this.prices = new Map();
        this.pricesAdded = false;
    }

    async renderQuantities() {
        return controller.getQuantities(this);
    }

    async changeQuantity(id, change) {
        return controller.changeQuantity(id, change);
    }

    async renderPrices() {
        return controller.getPrices(this);
    }

    async startingRender() {
        let quantities = this.renderQuantities();
        let prices = this.renderPrices();
        await Promise.allSettled([quantities, prices]);
        this.renderTotalPrice();
    }

    renderTotalPrice() {
        this.totalPrice = 0;
        for (let [id, info] of this.quantities) {
            let currSum = parseInt(info.qty) * this.prices.get(id);
            this.totalPrice += currSum;
        }
        documentEditor.addTotalPrice(this.totalPrice);
    }

    updateQuantities(quantities) {
        this.quantities = quantities;
        documentEditor.clearOrderTable();
        console.log("Updating quantities");
        for (let [id, info] of quantities) {
            documentEditor.addQtyToOrderTable(id, info);
            if (this.prices.has(id) && !this.pricesAdded) {
                documentEditor.addPriceToOrderTable(id, this.prices.get(id));
            }
        }
    }

    updatePrices(prices) {
        this.prices = prices;
        console.log("Updating prices");
        for (let [id, price] of prices) {
            if (this.quantities.has(id)) {
                this.pricesAdded = true;
                documentEditor.addPriceToOrderTable(id, price);
            }
        }
    }

}

class PaymentView {
    constructor() {
        documentEditor.createPaymentDiv(this);
    }

    async processPayment(amount, card, expiry, cvv, email, bankVerification) {
        console.log(cvv)
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
        console.log(cvv)
        let syntaxCorrect = this.syntaxCheck(card, expiry, cvv);
        if (syntaxCorrect) {
            let encryptedCard = this.encryptCardInfo();
            return await controller.verifyPaymentInfo(this, encryptedCard, expiry, cvv);
        } else {
            this.updatePaymentStatus(0, "Payment method invalid!");
            return false;
        }
    }

    syntaxCheck(card, expiry, cvv) {
        console.log(cvv.length)
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
        return await controller.chargePayment(this, amount, encryptedCard, expiry, cvv);
    }

    async chargePaymentWithBankVerification(amount, card, expiry, cvv) {
        let firstVerification = await controller.verifyPaymentWithBank(this, amount, card, expiry, cvv);
        let secondVerification = await controller.verifyPaymentWithBank(this, amount, card, expiry, cvv);
        if (firstVerification && secondVerification) {
            return await controller.chargePayment(this, amount, card, expiry, cvv);
        }
        return false;
    }

    async getDeliveryDate(email) {
        let displayed = controller.getDeliveryDate(this);
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