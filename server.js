var express = require('express');
var app = express();
var port = process.env.port || 5000;
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('app running');
});
