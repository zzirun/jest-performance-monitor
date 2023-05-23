const {OrderView, PaymentView} = require("../caseStudy/checkoutView.js");

let orderView = new OrderView();
orderView.renderQuantities();
orderView.renderPrices();
let paymentView = new PaymentView();