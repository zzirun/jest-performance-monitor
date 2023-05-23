//dummy values
let QUANTITIES = new Map();
QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "1"});
QUANTITIES.set("5", {name: "Pride and Prejudice", qty: "4"});
QUANTITIES.set("110", {name: "Maurice", qty: "10"});

let MODIFIED_QUANTITIES = new Map();
MODIFIED_QUANTITIES.set("1", {name: "A Tale of Two Cities", qty: "4"});
MODIFIED_QUANTITIES.set("110", {name: "Maurice", qty: "14"});

const {order} = require("../caseStudy/checkoutView.js");

class StockModel {
    async getQuantities() {
        return order.updateQuantities(QUANTITIES);
    }

    async changeQuantity(id, change) {
        const oldInfo = QUANTITIES.get(id);
        const newQty = parseInt(oldInfo.qty) + parseInt(change);
        QUANTITIES.set(id, {name: oldInfo.name, qty: "" + newQty});
    }

    async getPrices() {
        return order.updatePrices(PRICES);
    }
}

const stockModel = new StockModel();
module.exports = {stockModel};