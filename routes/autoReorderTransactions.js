const fs = require('fs');
const cron = require("node-cron");
const { customerFileName, apiToken } = require('../settings.js');

module.exports = {
    autoReorderTransactions: (req, res) => {
        if (req.headers.authorization === apiToken) {
            // Send message for default URL
            let rawdata = fs.readFileSync(customerFileName);
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

            customers.forEach(e =>
                e.last_transactions = e.last_transactions.sort(reorderTransactions)
            );

            fs.writeFile(customerFileName, JSON.stringify(customers), function (err) {
                err && console.log(err);
                console.log('Writing is completed!');
            });
            res.send("1");
        } else {
            res.send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
}
