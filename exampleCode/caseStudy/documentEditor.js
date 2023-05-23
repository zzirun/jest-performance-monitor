const {orderView, paymentView} = require("../caseStudy/checkoutView.js");

let BANK_VERIFICATION = true;

function submitPayment(event) {
    event.preventDefault();
    let card = document.getElementById("card").value;
    let exp = document.getElementById("exp").value;
    let cvv = document.getElementById("cvv").cvv;
    paymentView.processPayment(this.totalPrice, card, exp, cvv, "", BANK_VERIFICATION);
}

function submitQtyChange(event) {
    event.preventDefault();
    let id = document.getElementById("id").value;
    let change = document.getElementById("change").value;
    orderView.changeQuantity(id, change);
    orderView.renderQuantities();
    orderView.renderTotalPrice();
}

class DocumentEditor {
    constructor() {
        this.rows = new Map();
    }

    createOrderTable() {
        this.orderTable = document.createElement("table");
        let order = document.getElementById("order");
        order.appendChild(this.orderTable);

        let changeForm = document.createElement("form");

        let id = document.createElement("input");
        id.id = "id";
        id.setAttribute("type", "text");
        id.setAttribute("name", "Book id");
        id.setAttribute("placeholder", "Book id");
        changeForm.appendChild(id);

        let change = document.createElement("input");
        change.id = "change";
        change.setAttribute("type", "text");
        change.setAttribute("name", "Change");
        change.setAttribute("placeholder", "Change");
        changeForm.appendChild(change);

        var s = document.createElement("input");
        s.setAttribute("type", "Submit Change");
        s.setAttribute("value", "Submit Change");
        s.addEventListener("submit", submitQtyChange);
        changeForm.appendChild(s);

        order.appendChild(changeForm);
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

    addTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
        let totalPriceInfo = document.createElement("div");
        totalPriceInfo.innerHTML = "Total price: " + totalPrice;
    }

    createPaymentDiv() {
        this.paymentView = document.createElement("div");
        this.paymentView.innerText = "Enter Card Details:";

        let form = document.createElement("form");

        let card = document.createElement("input");
        card.id = "card";
        card.setAttribute("type", "text");
        card.setAttribute("name", "Card number");
        card.setAttribute("placeholder", "Card number");
        form.appendChild(card);

        let exp = document.createElement("input");
        exp.id = "exp";
        exp.setAttribute("type", "text");
        exp.setAttribute("name", "Expiry");
        exp.setAttribute("placeholder", "MMYY");
        form.appendChild(exp);

        let cvv = document.createElement("input");
        cvv.id = "cvv";
        cvv.setAttribute("type", "text");
        cvv.setAttribute("name", "CVV");
        cvv.setAttribute("placeholder", "CVV");
        form.appendChild(cvv);

        var s = document.createElement("input");
        s.setAttribute("type", "Pay");
        s.setAttribute("value", "Pay");
        s.addEventListener("submit", submitPayment);
        form.appendChild(s);

        this.paymentView.appendChild(form);
        let payment = document.getElementById("payment");
        payment.appendChild(this.paymentView);
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
