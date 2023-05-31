import { createClient } from '@supabase/supabase-js'

class StockModel {

    constructor() {
        this.supabase = createClient('https://ohmidvwmuxmfxouxiekr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obWlkdndtdXhtZnhvdXhpZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NzkxNjIsImV4cCI6MjAwMTA1NTE2Mn0.-usktHgBo9kmeDKTugyatBelOXlds5I4wFNhhiNRi_Y')
    }

    async getQuantities(view) {

        let { data, error } = await this.supabase
            .from('Books')
            .select('*');
        let quantities = new Map();
        for (let row of data) {
            quantities.set(row.id, {name: row.name, qty: row.qty});
        }
        return view.updateQuantities(quantities);
        
    }

    async changeQuantity(id, change) {
        let { data, error } = await this.supabase
            .from('Books')
            .select('*')
            .eq('id', parseInt(id));
        const oldInfo = data[0];
        console.log(oldInfo);
        const newQty = parseInt(oldInfo.qty ?? "0") + parseInt(change);
        console.log(newQty)
        const { deleteError } = await this.supabase
            .from('Books')
            .delete()
            .eq('id', parseInt(id));
        const { insertError } = await this.supabase
            .from('Books')
            .insert({ id: parseInt(id), name: oldInfo.name, qty: newQty.toString() });
        // QUANTITIES.set(id, {name: oldInfo.name, qty: newQty.toString()});
    }

    async getPrices(view) {
        let { data, error } = await this.supabase
            .from('Prices')
            .select('*');
        let prices = new Map();
        for (let row of data) {
            prices.set(row.id, row.price);
        }
        return view.updatePrices(prices);
    }
}

const stockModel = new StockModel();
module.exports = {stockModel};