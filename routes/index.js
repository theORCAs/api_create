var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
     res.render('index', { title: 'Express' });
});

module.exports = router;


// // Import express
// let express = require('express')
// // Initialize the app
// let app = express();
// // Setup server port
// var port = process.env.PORT || 8080;
// // Send message for default URL
// app.get('/', (req, res) => res.send('Hello World'));
// // Launch app to listen to specified port
// app.listen(port, function () {
//      console.log("Running API test bed on port " + port);
// });