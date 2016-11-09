var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var requestModule = require('request');
var firebase = require('firebase');

var app = express();


app.use(bodyParser.urlencoded());
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/static'));


var config = {
    apiKey: "AIzaSyAjrcPQmUp3UppPrLaHipoSb7FBpFSxh1Q",
    authDomain: "slackapp-a4a5d.firebaseapp.com",
    databaseURL: "https://slackapp-a4a5d.firebaseio.com",
    storageBucket: "slackapp-a4a5d.appspot.com",
    messagingSenderId: "61401351341"
};
firebase.initializeApp(config);

// firebase.initializeApp({
//     serviceAccount: {       
//         projectId: 'slackapp-a4a5d',
//         clientEmail: 'slackinte@slackapp-a4a5d.iam.gserviceaccount.com',
//         privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3pG1zPqu9k+jg\nGtaS0e75Azsu+90B0YJncHvZrhJdfSLBtYY6jMseEEc4nKRUN5Sg7/yXNBjX8WLo\nnFSpXQQkYukiHKkTbwq24pxvG2rUvZx/DlzIdnjQmvYHzSUdGlWv1emkKy1dmpTd\nTMz2UxtUZ+4yBODis8VGxr/bKzflGA9nHCIN5MPIbgc1x9ZBPBi2sUUNtn1D/yL8\nwOYVtXbCYUy9KIWKorPgr8NwjYn/ZdONvsRw7CDbB1zU3DaVdvxGQfL1i8Gw2PiS\n/MpF8WSbdnzfTtwkKFI+/+vX9ptdkxSqyW7c5zYYSGZyFQYzLX9BvjjRD/Gg9c2h\n+/UdBAJlAgMBAAECggEAOPVn+TG8BN3mgfPxD7LLgzKsXaNC5jh8UOcDkv25toOE\njz5lNq3KpjV4UafMFE7064Hj/2XqOrgk7G7ol2tBSKPhGXJ4Qo3TbewVhySi2v9A\nlev3fTm5uUIHA15un3s2joYzpHa76Gd0ursCa3hVZrWhnKQEuGv3yT8F7M2X1Zc9\nVyywGERYdW8i2mjpP31IW0+Ubbmk668OTTpTlrwvNrmqIu8Ncbku8Q86CrIXZkKO\nIvd3EaWQWezGecPvonL84Ae0D3Q+9koB6vdBh2TrWnsBs0HtelxQjkkWN3VHuJAN\nuc9N3yPwjKC0E1o3aXLHHMJV8sj4UdvdvG9YG8I+IQKBgQDZBnq3PoTM5kUhEe/t\nNVYd4yqOHAmPFw5xQWUqE9pGOeos0WdM0VY6EMJb6Llp0vgjbpjza7Z4u49xOR1G\ngMw0iduytnFRgkETYwTUcQwvb/MA4Yielsa/ppplD/eLt8dnk7wp2dN7gsC18pjR\nnib8scUUEInEzvdIqIqGirsoPQKBgQDYnzKV+7AaoNOlX9T+KWZNiWksE+r8Y+A7\n5eSsFmmhHNzsp8txdoeSTf324KC6XwHDpgXW82TCNjL85KxLJMrT/WCrr0Zi5q52\nFSqLZAvzRc43ItftBaUKS2adqGdzhU5CtaLdvCMPTCDmdoO25bnXvfYPy0FcE1FB\nTXUNWzs9SQKBgE/esZT0vj0GVdSo3ErJQUs4ijXInb/6dUc7EPceXUtRDxy1aDX+\nKKSv/EeE64/Fo6qujj2vm3TtWgoKQfrrdbu0LJWlzSh5LmfrHiDtBdYDdkQRvIzY\n4oYv00x0Rt81oH4/AZXJY6pl4XRUtucWNDT1W5lZyMoUfS9RT8HaFqzlAoGAUGzq\nzxyfCYPkkGXAIo0kWm1GCwNqH0LFofd8qxe3KAYbUBIMSpgDRaKHQ/2qLwfPE+C0\nElZTdnfA/nu4LD4AwCw2lAeDTnzvERBSt2XxueSU54ucN3f9CpFsC+TWY+F+aO4f\nBcwwCCHvpSEjTeiE00DH9p00KwdRB7nGV6sjl2ECgYEAtrQsBvnt1fPlov8TApYB\n5xn9ZmKYeJ54UX+wcnDdyPxjL9WruBlWu+qKgrI+Co00zDF1MZmM9FcfvN3DGufG\nKtOvSZS1sRsacOk1yNGcN+jWThb5rhGhQnrjLQwU6oY3U5OHNbSNFS7cqwCbqTLC\nUCobpACbHHSzKvt7tPYsmm0=\n-----END PRIVATE KEY-----\n',
//     },
//     databaseURL: 'https://slackapp-a4a5d.firebaseio.com',
//     apiKey: "AIzaSyAjrcPQmUp3UppPrLaHipoSb7FBpFSxh1Q",
// })

app.post('/interactive', function (request, response) {

    var newParse = JSON.parse(request.body.payload);
    console.log("new Parse" , newParse);
    console.log("After Parsing ++++++++++++++");
    console.log("new parse", newParse.actions[0].name);
    console.log("After Parsing ++++++++++++++");


    if (newParse.actions[0].name == 'Auth Now') {
        console.log("hitting");      
        response.redirect(200,'https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=2443000990.97630919845');
        // response.send({
        //     "text": "Auth Now Clicked",
        //     "redirect": "https://www.facebook.com"
        // })

    }
    else {
        console.log("not hitting");      
        response.redirect(200,'https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=2443000990.97630919845');
        response.send({
            "text": "Auth Later clicked",
            "redirect": "https://www.facebook.com"
        })
        
    }
})

app.get('/slack', function (request, response) {
    console.log("hitting slack");
})

app.post('/slackPost', function (request, response) {
    console.log(request.body);

    response.send({
        "text": "Register on Nobly using /register [email]",
        // "attachments": [
        //   {
        //     "text": "Register using /register [email]",
        //     "fallback": "You are unable to choose a game",
        //     "callback_id": "wopr_game",
        //     "color": "#3AA3E3",
        //     "attachment_type": "default",
        //     "actions": [
        //       {
        //         "name": "Auth Now",
        //         "text": "Auth Now",
        //         "type": "button",
        //         "value": "true"
        //       },
        //       {
        //         "name": "Auth Later",
        //         "text": "Auth Later",
        //         "type": "button",
        //         "value": "false"
        //       }
        //     ]
        //   }
        // ]
    })

})       
////a
app.post('/register', function (request, response) {
    var password = '123456';    
    console.log(request.body.text)
    firebase.auth().createUserWithEmailAndPassword(request.body.text, password)
    .then(function(result){       
        console.log("UID" , result.uid);
        firebase.database().ref('/users').child(result.uid).update({
        email: request.body.text
    })
    })
    .catch(function (error) {
        // Handle Errors here.
        console.log("Inthe middle");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error in auth", error);
    });

    response.send({ "text": "Confirmation Email sended" });
});

app.post('/test', function (request, response) {
    console.log('hitting');
    response.send({ "text": "Confirmation Email sended" });
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

app.post('/interactive',function(request,response){
    console.log(request.body);
})

app.get('*', function (request, response) {
    var indexViewPath = path.resolve(__dirname, "./static/index.html");
    response.sendFile(indexViewPath);
})
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


