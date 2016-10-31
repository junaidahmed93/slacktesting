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
      
    }

    requestModule.post({ url: 'https://slack.com/api/oauth.access', formData: a }, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    });    
  }

});

app.get('/tryme_redirect', function (request, response) {


  console.log("code : ", request.query.code);
  if (request.query.code) {
    var a = {
      client_id: '98238798470.98312577572',
      client_secret: 'bab50037a5bc69afcf11dba603bdba57',
      code: request.query.code,
      
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


