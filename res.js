const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();

var express = require('express');
var app = express();

app.use('/css',express.static(__dirname +'/css'));
// app.set("view engine","ejs");
// app.use(express.static('public'));
app.get('/Home', function (req, res) {
  res.sendFile(__dirname+"/home.html");
})







app.get("/signupSubmit", function(req, res){
  console.log("First Name: " + req.query.fname);
  console.log("Last Name: " + req.query.lname);
  console.log("Phone Number: " + req.query.phone);
  console.log("Email: " + req.query.email);
  console.log("Password: " + req.query.psw);
  db.collection("Signup").add({
      FirstName: req.query.fname,
      LastName: req.query.lname,
      Email: req.query.email,
      PhoneNumber: req.query.phone,
      Password: req.query.psw,

  })

})

app.get("/loginSubmit", function(req, res){
  console.log("Email: " + req.query.email);
  console.log("Password: " + req.query.psw);
  db.collection("Login").add({
      Email: req.query.email,
      Password: req.query.psw,

  })

})

app.get('/Bookingsubmit', function (req, res) {
    db.collection('Booking Details').add({
        date: req.query.Date,
        time: req.query.Time,
        peopleCount: req.query.people,
    })
    console.log("Booking Details are sent")
})

app.get('/hangout.html', function (req, res) {
  res.sendFile(__dirname+"/hangout.html");
})

app.get('/CasualHandoutsubmit', function (req, res) {
  db.collection(' Casual Handout Table Details').add({
      name: req.query.fname,
      phone:req.query.mobile,
      EMail: req.query.email,
  })
  console.log(req.query.Date)
})
app.get('/spl.html', function (req, res) {
  res.sendFile(__dirname+"/spl.html");
})
app.get('/SpecialEventsubmit', function (req, res) {
  db.collection('Special Event Table Details').add({
    event:req.query.eventName,
    Desc:req.query.Description,
  })
  console.log(req.query.Date)
})

//Running on server.

app.listen(3000, function(){
  console.log("Server is running on 3000.");
})
