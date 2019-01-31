//jshint esversion : 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // It refers to the static files. Add the parent folder name as public -- compulsory

app.listen(process.env.PORT || port, function(){
  console.log("Server started on port 3000");
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var data = {
    "members" : [{
      "email_address" : req.body.email,
      "status" : "subscribed",
      "merge_fields" : {
        FNAME : req.body.firstName,
        LNAME : req.body.lastName
      }
    }]
  };

  var options = {
    url : "https://us7.api.mailchimp.com/3.0/lists/d4168ecfe6",
    method : "post",
    headers : {
      "Authorization" : "dolton 60229f37b8f083f2c7376718086e13ec-us7",
    },
    body : JSON.stringify(data)
  };

  request(options, function(err, resp, body){
    if(err || resp.statusCode != 200){
      res.sendFile(__dirname + "/failure.html");
    }
    else {
      res.sendFile(__dirname + "/success.html");
    }
  });
});

// API key for mailchimp
//60229f37b8f083f2c7376718086e13ec-us7

// List id for mailchimp
//d4168ecfe6
