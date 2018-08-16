var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : 'parol', //mysql database password
  database : 'mysql' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

app.use(express.static(__dirname + "/public"));

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
  //console.log('example %s, %s', "pr1", 'pr2');

});

//rest api to get all customers
app.get('/customer', function (req, res) {
   //connection.query("SELECT id,word,transfer,grade FROM learn WHERE theme='english'", function (error, results, fields) {
	 connection.query("SELECT id,word,transfer,grade FROM learn", function (error, results, fields) {
    if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
app.get('/customer/:id', function (req, res) {
   connection.query('select id,word,transfer,grade from learn where id=?', [req.params.id], function (error, results, fields) {
	  var customer=JSON.stringify(results);
    //console.log('customer='+customer);
    if (error) throw error;
	  res.end(customer);
	});
});

//rest api to create a new customer record into mysql database
app.post('/customer', function (req, res) {
    var params  = req.body;
    //console.log(params);
   /*console.log('post customer='+params);
   for (var key in params){
      console.log(key+'  '+params[key]);
   }*/
  connection.query('INSERT INTO learn SET ?', params, function (error, results, fields) {
  if (error) throw error;
     res.end("error post/customer");
   });


});

//rest api to update record into mysql database
app.put('/customer', function (req, res) {
   connection.query('UPDATE learn SET word=?, transfer=? where id=?', [req.body.word, req.body.transfer, req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end("error");
	});
});

//rest api to delete record from mysql database
app.delete('/customer/:id', function (req, res) {
   //console.log('app.delete');
   //connection.query('DELETE FROM table1 WHERE id=?', [req.body.id], function (error, results, fields) {
	  connection.query('DELETE FROM learn WHERE id=?', [req.params.id], function (error, results, fields) {
    
    if (error) throw error;
	  res.end('Record has been deleted!');
	});
});