var image = "./img/bird.png";
var timeout = 3000;
var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48, lng: 21},
    zoom: 3
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: image
  }, timeout);
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


$(document).ready(function () {
  setInterval(function(){
    $.ajax({ 
    		url: "http://93.186.254.61/getBirdsRealTime",
    		success: function(data){
		        var point, count = 0;
		        for(point in data){
		        	addMarker({lat: data[point].x, lng: data[point].y});
		        }
		        setMapOnAll(map);
		        timeout = getRandomArbitrary(1000, 3000)
		    }, 
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	console.log("Error is :" + textStatus);
		    },
		    dataType: "jsonp",
		  	crossDomain: true});
}, timeout);

 setInterval(function(){
  			setMapOnAll(null);
  			markers = [];
  			console.log("here")
}, timeout+2000);

});

