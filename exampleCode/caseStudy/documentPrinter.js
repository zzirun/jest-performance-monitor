const {OrderView, PaymentView} = require("../caseStudy/checkoutView.js");

let orderView = new OrderView();
orderView.renderQuantities();
orderView.renderPrices();
orderView.renderTotalPrice();
let paymentView = new PaymentView();