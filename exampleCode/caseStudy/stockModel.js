//dummy values
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

class StockModel {
    async getQuantities(view) {
        return view.updateQuantities(QUANTITIES);
    }

    async changeQuantity(id, change) {
        console.log(QUANTITIES);
        console.log(id)
        const oldInfo = QUANTITIES.get(id);
        console.log(oldInfo);
        const newQty = parseInt(oldInfo.qty ?? "0") + parseInt(change);
        console.log(newQty)
        QUANTITIES.set(id, {name: oldInfo.name, qty: newQty.toString()});
    }

    async getPrices(view) {
        return view.updatePrices(PRICES);
    }
}

const stockModel = new StockModel();
module.exports = {stockModel};