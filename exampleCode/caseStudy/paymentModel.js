const supabase = require('@supabase/supabase-js')

class PaymentModel {

    constructor() {
        this.supabase = supabase.createClient('https://ohmidvwmuxmfxouxiekr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obWlkdndtdXhtZnhvdXhpZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzkxNjIsImV4cCI6MjAwMTA1NTE2Mn0.-usktHgBo9kmeDKTugyatBelOXlds5I4wFNhhiNRi_Y')
    }

    async getRow (expiry) {
        let { data, error } = await this.supabase
            .from('Payment')
            .select('*');
        let id = parseInt(expiry.charAt(0)) % 3;
        let row = data[id];
        return row;
    }

    async verifyPaymentInfo(view, card, expiry, cvv) {
        let row = await this.getRow(expiry);
        let paymentStatus = row.payment_status;
        if (paymentStatus == 0) {
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
        let row = await this.getRow(expiry);
        let paymentStatus = row.payment_status;
        if (paymentStatus == 1) {
            view.updatePaymentStatus(1, "Payment invalidated by bank!");
            return false;
        } else {
            return true;
        }
    }

    async getDeliveryDate(view) {
        let row = await this.getRow(expiry);
        let deliveryDate = row.delivery_date;
        view.updateDeliveryDate(deliveryDate);
        return true;
        // return Promise.resolve(view.updateDeliveryDate(DATE));
    }

    async emailDeliveryDate(email) {

    }
}

const paymentModel = new PaymentModel();

module.exports = {paymentModel}