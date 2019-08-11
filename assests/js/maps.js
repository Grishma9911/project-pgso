var geocoder; //To use later
var map; //Your map

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 40.706005, lng: -74.008827 }
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('submit').addEventListener('click', function () {
    codeAddress(zipCode);
  });
}

// function geocodeLatLng(geocoder, map, infowindow) {
//   var input = document.getElementById('latlng').value;
//   var latlngStr = input.split(',', 2);
//   var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
//   geocoder.geocode({ 'location': latlng }, function (results, status) {
//     if (status === 'OK') {
//       if (results[0]) {
//         map.setZoom(11);
//         var marker = new google.maps.Marker({
//           position: latlng,
//           map: map
//         });
//         infowindow.setContent(results[0].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert('No results found');
//       }
//     } else {
//       window.alert('Geocoder failed due to: ' + status);
//     }

//   });

// }
function codeAddress(zipCode) {
  var geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'address': zipCode }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //Got result, center the map and put it out there

        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
      $("#submit2").on("click", function () {

        var input = $("#zipCode").val()
      })