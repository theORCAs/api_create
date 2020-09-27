const fs = require('fs');
const { inventoryFileName, apiToken } = require('../settings.js');

module.exports = {
    updateCurrencyAndPrices: (req, res) => {
        if (req.headers.authorization === apiToken) {
            // read api request
            const { invUpdateList } = req.body;
            // read my current data
            const rawdata = fs.readFileSync(inventoryFileName);
            const inventories = JSON.parse(rawdata);

            //find which item's info is going to be changed
            invUpdateList.map((ul) => {
                const foundIndex = inventories.findIndex((e) => e.item === ul.item);
                // console.log(foundIndex)
                foundIndex != -1 ? (
                    inventories[foundIndex].details.price = ul.price,
                    inventories[foundIndex].supplier_details.currency = ul.currency
                )
                    :
                    console.log('does not match!');
            })
            // write back our data
            fs.writeFile(inventoryFileName, JSON.stringify(inventories), function (err) {
                err && console.log(err);
                console.log('Writing inventories is completed!');
            });
            res.send(inventories);
        } else {
            res.send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
};
