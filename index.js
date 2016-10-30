var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/slack',function(request,response){
  console.log("hitting slack");
})

app.post('/slackPost',function(request,response){
  console.log(request.body);
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


