/****************
  MODULE IMPORT
****************/
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser')

/****************
 INITIALISATION
****************/
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../frontend/');
app.use(express.static(__dirname + '/../frontend/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/****************
  ROOTER SYSTEM
****************/
app.get('/', function(req, res){
  res.render('./views/index');
});

app.get('*', function(req, res){
  res.render('./views/404');
});

app.listen(8101, '0.0.0.0');
