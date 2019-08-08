$(document).ready(function () {

    $(".button1").on("click", function () {
        $("#slide2").show()
        // $("#slide1").hide()
    });

    // $("#slide2").hide()


    function getDocotorInfo() {

    }


});

// Get your API key at developer.betterdoctor.com
var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e';
var queryURL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=40.730610,-73.935242,3&skip=2&limit=5&user_key=' + api_key;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    console.log(response.data[0].profile)


    // Constructing HTML containing the doctor's profile
    var docPic = $("<img>").attr("src", response.data[0].profile.image_url);
    var docName = $("<p>").text(response.data[0].profile.first_name + " " + response.data[0].profile.last_name + ", " + response.data[0].profile.title);
    var docGender = $("<p>").text(response.data[0].profile.gender);
    var docSpecial = $("<p>").text(response.data[0].specialties[0].name); 
    var docBio = $("<p>").text(response.data[0].profile.bio);  
    var docLoc = $("<p>").text(response.data[0].practices[0].visit_address.city + ", " + response.data[0].practices[0].visit_address.state);
    var docLandline = $("<p>").text(response.data[0].practices[0].phones[0].number);  


    // var docURL = $("<a>").attr("href", response.url).append(artistName);
    // var docImage = $("<img>").attr("src", response.thumb_url);

    $("#results-div").empty();
    $("#results-div").append(docPic);
    $("#results-div").append(docLoc);
    $("#results-div").append(docSpecial);
    $("#results-div").append(docName);
    $("#results-div").append(docGender);
    $("#results-div").append(docBio);
    $("#results-div").append(docLandline);

});


