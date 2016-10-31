var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


app.use(bodyParser.urlencoded());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
var staticDIR = path.resolve(__dirname, "./static");
app.use(express.static(staticDIR));





app.get('/slack', function (request, response) {
  console.log("hitting slack");  
})

app.post('/slackPost', function (request, response) {
  console.log(request.body);
  
  response.send({
    "text": "It's 80 degrees right now.", "attachments": [
      {
        "text": "Partly cloudy today and tomorrow"
      }
    ]
  })  
  
})
app.get('/redirect',function(request,response){
  console.log("code : " ,request.query.code);
})
app.get('*',function(request,response){
  var indexViewPath = path.resolve(__dirname,"./static/index.html");
    response.sendFile(indexViewPath);
})
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


