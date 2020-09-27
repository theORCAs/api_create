const fs = require('fs');
const { customerFileName, apiToken } = require('../settings.js');

module.exports = {
    getCustomers: (req, res) => {
        if (req.headers.authorization === apiToken) {
            const rawdata = fs.readFileSync(customerFileName);
            const customers = JSON.parse(rawdata)//JSON.parse(rawdata);
            const customerSummary = [];
            customers.map((cust) =>
                customerSummary.push({
                    first_name: cust.first_name,
                    last_name: cust.last_name,
                    email: cust.email
                }))
            res.send(customerSummary);
        } else {
            res.send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
}
