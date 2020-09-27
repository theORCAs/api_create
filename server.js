var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var cors = require("cors");
var indexRouter = require('./routes/index');
var schedule = require('node-schedule');

//before api call system runs the codes below
//firt we get data from body as a json. it is very important.
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.raw());

app.use(cors());

//global operations
const { getCustomers } = require('./routes/getCustomers');
const { autoReorderTransactions } = require('./routes/autoReorderTransactions');
const { addInventory } = require('./routes/addInventory');
const { updateCurrencyAndPrices } = require('./routes/updateCurrencyAndPrices');

//global op.
app.use('/', indexRouter);
app.use("/getCustomers", getCustomers);
app.use("/autoReorderTransactions", autoReorderTransactions);
app.use("/addInventory", addInventory);
app.use("/updateCurrencyAndPrices", updateCurrencyAndPrices);

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

var j = schedule.scheduleJob('* * 1 * * 4', function () {
    autoReorderTransactions();
});

