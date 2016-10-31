var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var requestModule = require('request');

var app = express();


app.use(bodyParser.urlencoded());
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/static'));

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
    var a = {
      client_id: '97506057222.98232203285',
      client_secret: 'ed83bdf3ccef251efbefc23201402c0d',
      code: request.query.code,
      redirect_uri : 'https://spooky-pumpkin-11860.herokuapp.com'
    }

    requestModule.post({ url: 'https://slack.com/api/oauth.access', formData: a }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
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


