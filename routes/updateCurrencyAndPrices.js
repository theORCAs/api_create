const fs = require('fs');
module.exports = {
    updateCurrencyAndPrices: (req, res) => {
        const { invUpdateList } = req.body;
        var foundIndex = -1;
        // Send message for default URL
        let rawdata = fs.readFileSync('inventory.json');
        let inventories = JSON.parse(rawdata);
        const resp = invUpdateList.map((ul) => {
            return inventories.find((e) => e.item === ul.item);
            //console.log('test')
        })

        invUpdateList.map((ul) => {
            var foundIndex = inventories.findIndex((e) => e.item === ul.item);
            // console.log(foundIndex)
            foundIndex != -1 ? (
                inventories[foundIndex].details.price = ul.price,
                inventories[foundIndex].supplier_details.currency = ul.currency
            )
                :
                console.log('does not match!');

        })

        fs.writeFile('./inventory.json', JSON.stringify(inventories), function (err) {
            if (err) return console.log(err);
            console.log('Writing inventories is completed!');
        });

        res.send(inventories);
    }
};
