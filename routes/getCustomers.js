const fs = require('fs');
module.exports = {
    getCustomers: (req, res) => {
        // Send message for default URL
        let rawdata = fs.readFileSync('deli_customers.json');
        let customers = JSON.parse(rawdata)//JSON.parse(rawdata);
        let customerSummary = [];
        customers.map((cust) =>
            customerSummary.push({
                first_name: cust.first_name,
                last_name: cust.last_name,
                email: cust.email
            }))
        res.send(customerSummary);
    }
}
