import express from 'express';
var app = express();
var port = process.env.port || 8080;
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function(){
    console.log('app running'); 
})