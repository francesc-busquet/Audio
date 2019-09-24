var gumStream;
var recordButton = $(".recordButton");
recordButton.css("pointer-events", "none");



$(function () {
  if (window.navigator.vendor == "Google Inc.") {
    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {
        navigator.mediaDevices.getUserMedia({audio:true})
              .then(  function(stream) {recordButton.removeClass("disabled"); recordButton.removeClass("btn-primary");
              recordButton.css("pointer-events", "auto"); recordButton.addClass("btn-success");gumStream = stream;})

      } else if (result.state == 'prompt') {
        navigator.mediaDevices.getUserMedia({audio:true})
              .then(  function(stream) {recordButton.removeClass("disabled"); recordButton.removeClass("btn-primary");
              recordButton.css("pointer-events", "auto"); recordButton.addClass("btn-success");gumStream = stream;}).catch((err) => {
              window.alert("Allowing audio recording is mandatory in order to proceed with the survey. Thus, we ask you to allow audio recording and to refresh the page after that.");
            })


      } else if (result.state == 'denied') {
        window.alert("Allowing audio recording is mandatory in order to proceed with the survey. Thus, we ask you to allow audio recording and to refresh the page after that.");
      }
      result.onchange = function() {

      };
    });
  }
  else {
    navigator.mediaDevices.getUserMedia({audio:true})
          .then(  function(stream) {recordButton.removeClass("disabled"); recordButton.removeClass("btn-primary");
          recordButton.css("pointer-events", "auto");  recordButton.addClass("btn-success");gumStream = stream;}).catch((err) => {
          window.alert("Allowing audio recording is mandatory in order to proceed with the survey. Thus, we ask you to allow audio recording and to refresh the page after that.");
        })
  }

});
