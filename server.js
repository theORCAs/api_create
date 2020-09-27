var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var cors = require("cors");
var indexRouter = require('./routes/index');
var schedule = require('node-schedule');
var morgan = require('morgan');
var winston = require('./config/winston');


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// error handler

//before api call system runs the codes below
//firt we get data from body as a json. it is very important.
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.raw());

app.use(morgan('combined', { stream: winston.stream }));
app.use(cors());

//reset data api
const { resetDataBase } = require('./routes/resetDataBase');
//1-Create an endpoint that will allow you to retrieve the first_name, last_name and email of each customer from the database.
const { getCustomers } = require('./routes/getCustomers');
// 2-As you can see, Jimbo's assistant, Mahmood, did a pretty bad job putting everything online so the 
// last_transactions are not ordered for the customers. Please write a script that orders these. Jimbo's also asking 
// if you could make sure that this script runs every wednesday at 1am (if the app is running of course).
const { autoReorderTransactions } = require('./routes/autoReorderTransactions');
// 3-In this kind of business you often get "troublesome" customers. Sometimes Jimbo needs to pay them a 
// little visit to remind them that he is un-f*ck-with-able. Please write an endpoint that will calculate the 
// distance between a given place and a customer to help Jimbo determine if it's worth it to visit them.
const { getMyDistanceWithCustomer } = require('./routes/getMyDistanceWithCustomer');
// 4-Create an endpoint that can update the currencies and prices of suppliers with real time conversion rates
const { updateCurrencyAndPrices } = require('./routes/updateCurrencyAndPrices');
// 5-Lastly, create an endpoint that can add items to the inventory
const { addInventory } = require('./routes/addInventory');
// Second chapter 1-Jimbo also wants his customers to benefit from this upgrade (but not too much).
// Create an endpoint that can process customer orders (make the relevant database updates).
const { postCustomerOrders } = require('./routes/postCustomerOrders');

// 6-I added passphrase every apis header. Before doing a process firstly i control passphrase ,f it is correct we proceed.
//Jimbo's rival, Bojim, knows a thing or two about computers so Jimbo's afraid that he might 
// use his app to mess up his inventory. He asks you to make sure that all the endpoints he mentioned until 
// now can only be accessed if you add the passphrase "Money4MeNot4u" somewhere in the request.

//global op.
app.use('/', indexRouter);
app.use("/resetDataBase", resetDataBase);
app.use("/getCustomers", getCustomers);
app.use("/autoReorderTransactions", autoReorderTransactions);
app.use("/addInventory", addInventory);
app.use("/updateCurrencyAndPrices", updateCurrencyAndPrices);
app.use("/getMyDistanceWithCustomer", getMyDistanceWithCustomer);
app.use("/postCustomerOrders", postCustomerOrders);

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
// 2-As you can see, Jimbo's assistant, Mahmood, did a pretty bad job putting everything online so the 
//last_transactions are not ordered for the customers. Please write a script that orders these. 
//Jimbo's also asking if you could make sure that this script runs every wednesday at 1am (if the app is running of course).
var j = schedule.scheduleJob('* * 1 * * 4', function () {
    autoReorderTransactions();
});

module.exports = server;