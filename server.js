const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      htmlController = require('./controllers/htmlController'),
      apiController = require('./controllers/apiController')
      port = process.env.PORT || 8000;

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

htmlController(app, __dirname);
apiController(app, __dirname);

console.log(require('./work/work').openDoors());

app.listen(port);
