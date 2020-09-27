const fs = require('fs');
const geolib = require('geolib');
const { customerFileName, apiToken } = require('../settings.js');

module.exports = {
    getMyDistanceWithCustomer: (req, res) => {
        if (req.headers.authorization === apiToken) {
            //first we need to read our customer list
            const rawdata = fs.readFileSync(customerFileName);
            const customers = JSON.parse(rawdata)//JSON.parse(rawdata);
            //find which customer from our customer json. we search with name and surname
            const customerCoord = customers.find((e) => e.first_name === req.body.customer.first_name && e.last_name === req.body.customer.last_name).address.coordinates;
            // console.log(foundIndex)
            // console.log(customers[foundIndex].address.coordinates);
            // console.log(req.body.myLocation)

            // we calculate distance between points as km
            // for more points and addresses we can use mongodb geo tools. It is easy and very fast 
            const distanceToCustomer = geolib.getPreciseDistance(customerCoord, req.body.myLocation)

            res.status(200).send({ result: distanceToCustomer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km" });
        } else {
            res.send('we have a problem. Token is incorrect! Connect the administrator. Please');
        }
    }
};
