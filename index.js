var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var requestModule = require('request');

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
app.get('/redirect', function (request, response) {
  console.log("code : ", request.query.code);
  if (request.query.code) {
    requestModule({
      url: 'https://slack.com/api/oauth.access',
      
      method: 'POST',
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      // headers: {
      //   'Content-Type': 'MyContentType',
      //   'Custom-Header': 'Custom Value'
      // },
      body: {
        client_id : '97506057222.98232203285',
        client_secret : 'ed83bdf3ccef251efbefc23201402c0d',
        code : request.query.code
      }
    }, function (error, response, body) {
      if (error) {
        console.log("error in request" , error);
      } else {
        console.log( "response : ", response.statusCode, body);
      }
    });
  }

})
app.get('*', function (request, response) {
  var indexViewPath = path.resolve(__dirname, "./static/index.html");
  response.sendFile(indexViewPath);
})
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


