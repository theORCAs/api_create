const fs = require('fs');
const cron = require("node-cron");

module.exports = {
    autoReorderTransactions: (req, res) => {
        // Send message for default URL
        let rawdata = fs.readFileSync('deli_customers.json');
        let customers = JSON.parse(rawdata);

        function reorderTransactions(a, b) {
            const pkA = Date.parse(a.date);
            const pkB = Date.parse(b.date);

            let comparison = 0;

            if (pkA > pkB) {
                comparison = 1;
            } else if (pkA < pkB) {
                comparison = -1;
            }
            return comparison;
        }

        for (i = 0; i < customers.length; i++) {
            let sortedTransactions = customers[i].last_transactions.sort(reorderTransactions);
            customers[i].last_transactions = sortedTransactions;
        }
        fs.writeFile('./deli_customers.json', JSON.stringify(customers), function (err) {
            if (err) return console.log(err);
            console.log('Writing is completed!');
        });
        // res.send(customers)
    }
}
