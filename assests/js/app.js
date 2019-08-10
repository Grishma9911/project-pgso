$(document).ready(function () {


  $("#button").on("click", function () {
    $("#slide2").show() //on click this should go to new page

    getDocotorInfo();

    function getDocotorInfo() {

      var symptom = $('#symptom').val().trim();
      var location = $('#zip_code').val().trim();
      // var gmaps = $('#latlon').val();


      // var lon = 
      // var lat = 

      // var lat1= $('').val();
      // var lon1= $('').val();
      
      var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e';
      // console.log(lat)
      // console.log(lon)

      // queryURL commented out until we have a working Google Maps  API //
      // var queryURL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' + gmaps + ',3&skip=2&limit=5&query=' + symptom + ' &user_key=' + api_key;

      var queryURL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=40.730610,-73.935242,3&skip=2&limit=5&query=' + symptom + ' &user_key=' + api_key;
      // var lon = response.data[i].practices[0].lat;
      // var lat = response.data[i].practices[0].lon;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        console.log(response);

        console.log(response.data.length);



        for (var i = 0; i < response.data.length; i++) {

          var docResults = $('#results-div');

          if (response.data[i].practices[0].name != "undefined" && response.data[i].practices[0].distance < 3){
            //==============================[ defines variables for response data ]==============================//
            var docName = response.data[i].practices[0].name;
            var docStreet = response.data[i].practices[0].visit_address.street;
            var docCity = response.data[i].practices[0].visit_address.city;
            var docZip = response.data[i].practices[0].visit_address.zip;

            //=======================================[ console logs ]==========================================//
            console.log("data practices length num =" + i + " : " + response.data[i].practices.length)
            console.log("name: " + response.data[i].practices[0].name);
            console.log("address: " + response.data[i].practices[0].visit_address.street);
            console.log(docStreet + docCity + docZip);


            docResults.append(docName + '<br />' + docStreet + '<br />' + docCity + ', ' + docZip + '<br /><br />');

          }

        }
      });

    }

  });
  
});
