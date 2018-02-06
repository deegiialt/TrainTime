  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7uWeljdVkI-dTT5T48pxGqYX0d5FxkLY",
    authDomain: "project-28f23.firebaseapp.com",
    databaseURL: "https://project-28f23.firebaseio.com",
    projectId: "project-28f23",
    storageBucket: "project-28f23.appspot.com",
    messagingSenderId: "294037184898"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = moment($("#firstTrainTime").val().trim(), "hh:mm");
  var frequency = moment($("#frequency").val().trim(), "minutes");

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newTrainName = childSnapshot.val().name;
  var newDestination = childSnapshot.val().destination;
  var newTrainTime = childSnapshot.val().firstTrainTime;
  var newFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(newTrainName);
  console.log(newDestination);
  console.log(newTrainTime);
  console.log(newFrequency);

  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + newTrainTime + "</td><td>" + newDestination + "</td><td>" +
  newTrainTime + "</td><td>" + newFrequency + "</td></tr>");
});