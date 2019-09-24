
var recordButton = $(".recordButton");
var stopButton = $(".stopButton");
var randomNumber = $("#number").text();
var blobFile;

recordButton.on("click", startRecording);
stopButton.on("click", stopRecording);
stopButton.css("pointer-events", "none");


var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext

var rec;
var input;


function startRecording() {

  recordButton.addClass("disabled");
  recordButton.css("pointer-events", "none");
  stopButton.removeClass("disabled");
  stopButton.css("pointer-events", "auto");


		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
		audioContext = new AudioContext();


		input = audioContext.createMediaStreamSource(gumStream);
		rec = new Recorder(input,{numChannels:1})
		rec.record()
		console.log("Recording started");



}


function stopRecording() {

  stopButton.addClass("disabled");
  stopButton.css("pointer-events", "none");
  rec.stop();
  gumStream.getAudioTracks()[0].stop();
  rec.exportWAV(createDownloadLink);



}

function createDownloadLink(blob) {
  blobFile = blob;
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = $("#number").text();

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//save to disk link
	link.href = url;


	//add the new audio element to li
	li.appendChild(au);


	//add the li element to the ol
	recordingsList.appendChild(li);

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
  if (this.readyState === 4) {
    console.log("Server returned: ", e.target.responseText);
    }
  };
  var fd = new FormData();
  fd.append("audio_data", blob, filename);
  xhr.open("POST", 'https://audiofile.free.beeceptor.com', true);
  xhr.send(fd);




}



//var xhr = new XMLHttpRequest();
//xhr.open('GET', 'blob:https://unipark.de/4646f635-bab4-4b08-ac93-51ed667ba393', true);
//xhr.responseType = 'blob';
//xhr.onload = function(e) {
//  if (this.status == 200) {
//    var myBlob = this.response;
    // myBlob is now the blob that the object URL pointed to.
//  }
//};
//xhr.send();
//xhr.response;
