const fs = require('fs');
const { inventoryFileName, customerFileName, apiToken } = require('../settings.js');

module.exports = {
    resetDataBase: (req, res) => {
        if (req.headers.authorization === apiToken) {

            const rawdataInventory = fs.readFileSync('./inventory_base.json');
            const inventories = JSON.parse(rawdataInventory)//JSON.parse(rawdata);

            const rawdataCustomer = fs.readFileSync('./deli_customers_base.json');
            const customers = JSON.parse(rawdataCustomer);//JSON.parse(rawdata);

            fs.writeFile(inventoryFileName, JSON.stringify(inventories), function (err) {
                err && console.log(err);
            });

            fs.writeFile(customerFileName, JSON.stringify(customers), function (err) {
                err && console.log(err);
            });

            res.send("operation Completed");
        } else {
            res.status(200).send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
}
