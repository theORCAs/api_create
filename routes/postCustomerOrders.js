const e = require('express');
const fs = require('fs');
var dateTime = require("node-datetime");
var dt = dateTime.create();

const { inventoryFileName, customerFileName, apiToken } = require('../settings.js');

module.exports = {
    postCustomerOrders: (req, res) => {
        if (req.headers.authorization === apiToken) {
            //we are reading current customer and inventory data
            const rawdataCustomers = fs.readFileSync(customerFileName);
            const customers = JSON.parse(rawdataCustomers)//JSON.parse(rawdata);

            const rawdataInventories = fs.readFileSync(inventoryFileName);
            const inventories = JSON.parse(rawdataInventories)//JSON.parse(rawdata);
            try {
                //now we are reading posted payload 
                req.body.forEach(e => {
                    const custIndex = customers.findIndex(cust => +cust.id === +e.customerId)
                    if (custIndex === -1) {
                        // res.send("There is a problem with customer. We could not find Customer ID: " + e.customerId);
                        throw "There is a problem with customer. We could not find Customer ID: " + e.customerId; // break
                    } else {
                        e.orderDetails.forEach((od) => {
                            const invIndex = inventories.findIndex(inv => inv.item === od.inventory)
                            if (invIndex === -1) {
                                throw "There is a problem with inventory. We could not find inventory name: " + od.inventory; // break
                            } else {
                                if (inventories[invIndex].details.amount < od.quantity) {
                                    throw `Our stock quantity is lower than order quantity. Please order lower than stock quantity. Stock quantity=${inventories[invIndex].details.amount} 
and order quantity=${od.quantity}`; // break
                                } else {
                                    inventories[invIndex].details.amount = inventories[invIndex].details.amount - od.quantity;
                                    //if remaining quantity=0 then we delete related inventory from our list for working smoothly.
                                    if (inventories[invIndex].details.amount === 0) {
                                        delete inventories[invIndex];
                                    }
                                    //we are loggin in our customer transactions data per order
                                    customers[custIndex].last_transactions.push({ "date": dt.format("m/d/Y"), "amount": (od.quantity * inventories[invIndex].details.price).toString() });
                                }
                            }
                        });
                    }
                });

                res.send("Operations Completed!");
            }
            catch (e) {
                res.status(400).send(e);
            }

            // write back our data
            fs.writeFile(inventoryFileName, JSON.stringify(inventories), function (err) {
                err && console.log(err);
            });
            fs.writeFile(customerFileName, JSON.stringify(customers), function (err) {
                err && console.log(err);
            });
            res.send("Operations Completed!");
        } else {
            res.send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
}
