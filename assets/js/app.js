var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 12
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      infoWindow.setPosition(pos);
      infoWindow.setContent('We found your location. The search will populate phsycians within a 25 mile radius.');
      infoWindow.open(map);
      map.setCenter(pos);


      $(document).ready(function () {


        $("#button").on("click", function () {
          $("#slide2").show()
          $("#results-div").empty();
          getDocotorInfo();
      
          function getDocotorInfo() {
      
            var specialties = $('#specialties').val().trim();
          
            var lng = pos.lng;
            var lat = pos.lat;
            var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e';
            var queryURL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' + lat + ',' + lng + ',25&skip=0&limit=5&query=' + specialties + ' &user_key=' + api_key;
     

            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function (response) {
      
              console.log(response);
              
              for (var i = 0; i < response.data.length; i++) {
                
                var docResults = $('#results-div');
      
                if (response.data[i].practices[0].name != "undefined" && response.data[i].practices[0].distance < 25) {
                  //==============================[ defines variables for response data ]==============================//
                  var docSpec = response.data[i].specialties[0].actor;
                  var docName = response.data[i].practices[0].name;
                  var docStreet = response.data[i].practices[0].visit_address.street;
                  var docCity = response.data[i].practices[0].visit_address.city;
                  var docZip = response.data[i].practices[0].visit_address.zip;
                  var docImage = response.data[i].profile.image_url;
                  // var docPic = $("<img>").attr("src", docImage)
                  
      
                  //=======================================[ console logs ]==========================================//
                  // console.log("data practices length num =" + i + " : " + response.data[i].practices.length)
                  // console.log("name: " + response.data[i].practices[0].name);
                  // console.log("address: " + response.data[i].practices[0].visit_address.street);
                  // console.log(docStreet + docCity + docZip)
                  

                  //=======================================[ constructing html ]==========================================//

                  docResults.append('<img src='+ docImage +'></img>' + '<br />' + docSpec + '<br />' + docName + '<br />' + docStreet + '<br />' + docCity + ', ' + docZip + '<br /><br />');
                }
                
              }
               
            });
      
          }
      
        });
      });


    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } 
  
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e';
var queryURL = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + api_key;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    console.log(response);

    for (var i = 0; i < response.data.length; i++) {
        // $("#conditions-div").empty();
        // var conditions = $('#conditions-div');

        // conditions.append(response.data[i].name);
    }

    $(document).ready(function () {
        var conditions = $('select');
        for (var i = 0; i < response.data.length; i++) {
            conditions.append('<option value="' + response.data[i].name + '">' + response.data[i].name + '</option>');
        }
    });
});