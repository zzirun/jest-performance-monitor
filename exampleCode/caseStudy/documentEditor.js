class DocumentEditor {
    constructor() {
        this.rows = new Map();
    }

    createOrderTable() {
        this.orderTable = document.createElement("table");
    }

    clearOrderTable() {
        this.orderTable.replaceChildren();
    }

    addQtyToOrderTable(id, info) {
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

    addPriceToOrderTable(id, price) {
        let row = this.rows.get(id);
        let priceCell = document.createElement("td");
        priceCell.innerText = price;
        row.appendChild(priceCell);
    }

    createPaymentDiv() {
        this.paymentView = document.createElement("div");
    }

    addPaymentStatus(message) {
        let confirmation = document.createElement("div");
        confirmation.innerText = message;
        this.paymentView.appendChild(confirmation);
    }

    addDeliveryDate(date) {
        let delivery = document.createElement("div");
        delivery.innerText = "Delivery date: " + date;
        this.paymentView.appendChild(delivery);
    }

}

const documentEditor = new DocumentEditor();

module.exports = documentEditor;