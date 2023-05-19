const controller = require("./checkoutController.js");

class OrderView {

    constructor() {
        this.setup();
    }

    setup() {
        this.totalPrice = 0;

        this.orderTable = document.createElement("table");
        // this.orderTable.style.width = "100%";
        // this.orderTable.style.tableLayout = "fixed";
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
        for (let [id, info] of this.quantities) {
            this.totalPrice += info.qty * this.prices.get(id);
        }
    }

    updateQuantities(quantities) {
        this.quantities = quantities;
        this.rows = new Map();
        this.orderTable.replaceChildren();
        for (let [id, info] of quantities) {
            let row = document.createElement("tr");
            this.rows.set(id, row);

            let idCell = document.createElement("td");
            idCell.innerText = id;
            row.appendChild(idCell);

            let nameCell = document.createElement("td");
            nameCell.innerText = info.name;
            row.appendChild(nameCell);

            let qtyCell = document.createElement("td");
            qtyCell.innerText = info.qty;
            row.appendChild(qtyCell);

            this.orderTable.appendChild(row);
        }
    }

    updatePrices(prices) {
        this.prices = new Map();
        
        for (let [id, price] of prices) {
            if (this.quantities.has(id)) {
                this.prices.set(id, price);

                let row = this.rows.get(id);
                let priceCell = document.createElement("td");
                priceCell.innerText = price;
                row.appendChild(priceCell);
            }
        }
    }

}

class PaymentView {

}

module.exports = {OrderView, PaymentView}