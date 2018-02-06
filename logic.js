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

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#firstTrainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };

  database.ref().push(newTrain);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var newTrainName = childSnapshot.val().name;
  var newDestination = childSnapshot.val().destination;
  var newTrainTime = childSnapshot.val().firstTrainTime;
  var newFrequency = childSnapshot.val().frequency;

  //convert new train time

  // First Time (pushed back 1 year to make sure it comes before current time)
  var newTimeConverted = moment(newTrainTime, "hh:mm").subtract(1, "years");
  console.log(newTimeConverted);

  // Difference between the times
  var diffTime = moment().diff(moment(newTimeConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % newFrequency;

  // Minute Until Train
  var tMinutesTillTrain = newFrequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" +
  newFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});