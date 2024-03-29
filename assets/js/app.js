// var map, infoWindow
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 12
//   });
//   infoWindow = new google.maps.InfoWindow;
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('We found your location. The search will populate phsycians within a 10 mile radius.');
//       infoWindow.open(map);
//       map.setCenter(pos);
// ==========================================================================================================================================//
function initMap() {
  var options = {
    zoom: 8,
    center: { lat: 42.3601, lng: -71.0589 }
  };


  var map = new google.maps.Map(document.getElementById('map'), options);
  var infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('We found your location. The search will populate phsycians within a 10 mile radius.');
      infoWindow.open(map);
      map.setCenter(pos);


      // // Listen for click on map to add marker
      // google.maps.event.addListener(map, 'click', 
      // function(event){
      //   //Add marker
      //   addMarker({coords:event.latLng})
      // });


      //Add Marker
      // var marker = new google.maps.Marker({
      //   position: { lat: 42.4668, lng: -70.9495 },
      //   map: map
      // });

      // var infoWindow = new google.maps.InfoWindow({
      //   content:'<h1>Lynn MA</h1>'
      // });

      // marker.addListener('click', function(){
      //   infoWindow.open(map, marker);
      // });

      // ==========================================================================================================================================//
      $(document).ready(function () {
        $("#button").on("click", function () {
          $("#slide1").show()
          $("#results-div").empty();
          // $("#map").html(deleteMarkers);

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

                if (response.data[i].practices[0].name != "undefined" && response.data[i].practices[0].distance < 10) {
                  //==============================[ defines variables for response data ]==============================//
                  var docSpec = response.data[i].specialties[0].actor;
                  var docName = response.data[i].practices[0].name;
                  var docStreet = response.data[i].practices[0].visit_address.street;
                  var docCity = response.data[i].practices[0].visit_address.city;
                  var docZip = response.data[i].practices[0].visit_address.zip;
                  var docImage = response.data[i].profile.image_url;
                  var docMarklat = response.data[i].practices[0].visit_address.lat;
                  var docMarklon = response.data[i].practices[0].visit_address.lon;
                  // var docCoords = response.data[i].practices[0].lon;
                  // var docPic = $("<img>").attr("src", docImage)


                  //=======================================[ console logs ]==========================================//
                  // console.log("data practices length num =" + i + " : " + response.data[i].practices.length)
                  // console.log("name: " + response.data[i].practices[0].name);
                  // console.log("address: " + response.data[i].practices[0].visit_address.street);
                  // console.log(docStreet + docCity + docZip)

                  // console.log(docMarklng)
                  // console.log(docMarklat)


                  //=======================================[ constructing html ]==========================================//

                  docResults.append('<img src=' + docImage + '></img>' + '<br />' + docSpec + '<br />' + docName + '<br />' + docStreet + '<br />' + docCity + ', ' + docZip + '<br /><br />')

                };
              }

              //=======================================[ constructing maps markers and content ]==========================================//

              var docCoords = [
                {
                  coords: { lat: docMarklat, lng: docMarklon },
                },
              ];

              //Loop through markers
              for (var i = 0; i < docCoords.length; i++) {
                //Add markers
                addMarker(docCoords[i]);
                console.log(docCoords);

              }
              // Add markers function
              function addMarker(props) {
                var marker = new google.maps.Marker({
                  position: props.coords,
                  map: map
                });

                // Check content
                if (props.content) {
                  var infoWindow = new google.maps.InfoWindow({
                    content: props.content
                  });

                  marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                  });
                }

              }



              function deleteMarkers(props) {
                var deleteMarkers = new google.maps.Marker({
                  clearMarkers() {
                    marker = []
                  }
                })

              }
              function clearMarkers() {
                addMarker(null);
              }

            }
            )

          }
        })
      })
    })
  }
}





//               }
//               //Array of markers
//               var docLoc = [
//                 {
//                   coords: { lat: docMarklat, lng: docMarklon },
//                   // content: '<h1>Lynn MA</h1>'
//                 }
//               ];

//               for (var i = 0; i < docLoc[i].length; i++) {

//                 addMarker(docLoc);
//                 console.log(coords)
//                 console.log("this is the doctors coordinates " + docLoc)

//                 // console.log("this is the doctors coordinates " + docMarklat + docMarklng)
//                 // console.log(JSON.stringify(docLoc))

//               }
//               // Add markers function
//               function addMarker(props) {
//                 var marker = new google.maps.Marker({
//                   position: props.coords,
//                   map: map
//                 });

//                 // Check content
//                 if (props.content) {
//                   var infoWindow = new google.maps.InfoWindow({
//                     content: props.content
//                   });

//                   marker.addListener('click', function () {
//                     infoWindow.open(map, marker);
//                   });
//                 }

//               };
//             });
//           };
//         });
//       });
//     });
//   }
// }






      // ==========================================================================================================================================//



      //Loop through markers
      // for (var i = 0; i < markers.length; i++) {
      //   //Add markers
      //   addMarker(markers[i]);
      // }


      // for (var i = 0; i < response.data.length; i++) {

      //   addMarker()

//       // }

//     })
//       }
// }




// ==========================================================================================================================================//
//     }, function () {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } 

//   else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//     'Error: The Geolocation service failed.' :
//     'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }

// var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e';
// var queryURL = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + api_key;

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {

//   //  console.log(response);

//     for (var i = 0; i < response.data.length; i++) {
//         // $("#conditions-div").empty();
//         // var conditions = $('#conditions-div');

//         // conditions.append(response.data[i].name);
//     }

//     $(document).ready(function () {
//         var conditions = $('select');
//         for (var i = 0; i < response.data.length; i++) {
//             conditions.append('<option value="' + response.data[i].name + '">' + response.data[i].name + '</option>');
//         }
//     });
// });