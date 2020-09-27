const fs = require('fs');
const { inventoryFileName, apiToken } = require('../settings.js');
module.exports = {
    addInventory: (req, res) => {
        if (req.headers.authorization === apiToken) {
            // Send message for default URL
            let rawdata = fs.readFileSync(inventoryFileName);
            let inventories = JSON.parse(rawdata);
            // let updatedInventories = inventories;
            inventories.push(req.body);
            // updatedInventories.push(inventories);

            fs.writeFile(inventoryFileName, JSON.stringify(inventories), function (err) {
                err && console.log(err);
                console.log('Writing inventories is completed!');
            });

            res.send(req.body)
        } else {
            res.send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
};
