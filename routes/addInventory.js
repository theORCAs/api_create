const fs = require('fs');
module.exports = {
    addInventory: (req, res) => {
        // Send message for default URL
        let rawdata = fs.readFileSync('inventory.json');
        let inventories = JSON.parse(rawdata);
        // let updatedInventories = inventories;
        inventories.push(req.body);
        // updatedInventories.push(inventories);

        fs.writeFile('./inventory.json', JSON.stringify(inventories), function (err) {
            if (err) return console.log(err);
            console.log('Writing inventories is completed!');
        });

        res.send(req.body)

    }
};
