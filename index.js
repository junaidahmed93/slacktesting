var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var requestModule = require('request');

var app = express();


app.use(bodyParser.urlencoded());
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/static'));

app.post('/button', function (request, response) {

  var newParse = JSON.parse(request.body.payload);

  console.log("After Parsing ++++++++++++++");
  console.log("new parse", newParse.actions[0].name);
  console.log("After Parsing ++++++++++++++");


  if (newParse.actions[0].name == 'Auth Now') {
    console.log("hitting");
    // response.redirect(200, 'https://www.facebook.com/');
    response.send({
      "text": "Auth Now Clicked",
      "redirect" : "https://www.facebook.com"
    })

  }
  else {
    console.log("not hitting");
    // response.redirect(200 , 'https://www.facebook.com/');

    response.send({
      "text": "Auth Later clicked",
      "redirect" : "https://www.facebook.com"
    })
  }
})

app.get('/slack', function (request, response) {
  console.log("hitting slack");
})

app.post('/slackPost', function (request, response) {
  console.log(request.body);

  response.send({
    "text": "Would you like to play a game?",
    "attachments": [
      {
        "text": "You are not Authenticated on Nobly",
        "fallback": "You are unable to choose a game",
        "callback_id": "wopr_game",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "Auth Now",
            "text": "Auth Now",
            "type": "button",
            "value": "true"
          },
          {
            "name": "Auth Later",
            "text": "Auth Later",
            "type": "button",
            "value": "false"
          }
        ]
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
      response.redirect('http://www.nobly.com/');
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


