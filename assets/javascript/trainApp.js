// Initialize Firebase
    var config = {
    apiKey: "AIzaSyAg3Cp3Bno8Ph7lOwMiYtTputc2Bk6GI28",
    authDomain: "train-schedule-fbb58.firebaseapp.com",
    databaseURL: "https://train-schedule-fbb58.firebaseio.com",
    storageBucket: "train-schedule-fbb58.appspot.com",
  };
  
  firebase.initializeApp(config);

  var database = firebase.database().ref();
  
  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";
  var minutesAway = "";


  function clearForm() {
  	$('#trainNameInput').val('');
  	$('#destinationInput').val('');
  	$('#trainTimeInput').val('');
  	$('#frequencyInput').val('');
  }

  // Submit button for train info
  $("button").on('click', function(){
  	var trainName = $('#trainNameInput').val();
  	var destination = $('#destinationInput').val();
  	var trainTime = $('#trainTimeInput').val();
  	var frequency = $('#frequencyInput').val();


  var trainSchedule = {
  	name: trainName,
  	trainDestination: destination,
  	time: trainTime,
  	trainFrequency: frequency,
  	minutesAway: minutesAway,
  	// nextTrain: moment(nextTrain).format("hh:mm"),
  	// dateAdded: firebase.database.ServerValue.TIMESTAMP

  };



  database.push(trainSchedule);

  
clearForm();
  // console.log(trainSchedule.name);
  // console.log(trainSchedule.trainDestination);
  // console.log(trainSchedule.time);
  // console.log(trainSchedule.trainFrequency);
  return false;
});

  database.on('child_added', function (snapshot){
  	var recentTrain = snapshot.val();
  	var row = $('<tr>');

  	 console.log(recentTrain);

  	var td = $('<td>').text(recentTrain.name);
  	row.append(td);

  	td = $('<td>').text(recentTrain.trainDestination);
  	row.append(td);


  	var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
  	console.log(firstTimeConverted);
  	
  	var currentTime = moment();
  	console.log('CURRENT TIME:' + moment(currentTime).format("hh:mm"));
  	td = $('<td>').text(recentTrain.trainTime)
  	row.append(td);
  	
  	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  	console.log('DIFFERENCE IN TIME:' + diffTime);

  	var timeRemaining = diffTime % recentTrain.trainFrequency;
  	console.log(timeRemaining)
  	td = $('<td>').text(recentTrain.trainFrequency);
  	row.append(td);
  	console.log(frequency)

  	var minutesAway = recentTrain.trainFrequency - timeRemaining;
  	console.log ("MINUTES TILL NEXT ARRIVAL: " + minutesAway);
  	td = $('<td>').text(recentTrain.minutesAway);
  	row.append(td);

  	var nextTrain = moment().add(minutesAway, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
	td = $('<td>').text(recentTrain.nextTrain);
  	row.append(td);

	console.log(row);

  	$('tbody').append(row);
  })
