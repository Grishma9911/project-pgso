$(document).ready(function (){

$("#button1").on("click", function() {
    $("#slide2").show()
    
    getDocotorInfo();
    console.log('im working')

});
var symptom1=$('#symptom').val();
var symptom= response[i].data.specialties[0].name
// $("#slide2").hide()

 function getDocotorInfo(){

    var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e'; //GOT API key at developer.betterdoctor.com
    var queryURL ='https://api.betterdoctor.com/2016-03-01/doctors?query='+ symptom +'location=40.730610,-73.935242,3&skip=2&limit=10&user_key='+ api_key;
    
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    console.log(response);
    
    
  
    var results= response.data;
    console.log(results)

      console.log(response.data.length);
      

    for (var i = 0; i < response.data.length; i++) {
      
      var docInfo=$('<div>');

    

      if( response.data[i].practices[0].name != "undefined" & response.data[i].practices[0].distance < 3 & symptom===symptom1){
      var docStreet= response.data[i].practices[0].visit_address.street;
      var docCity= response.data[i].practices[0].visit_address.city;
      var docZip= response.data[i].practices[0].visit_address.zip;
      

      
      console.log("data practices length num =" + i + " : " + response.data[i].practices.length)
      console.log("name: " + response.data[i].practices[0].name);
      console.log("address: " + response.data[i].practices[0].visit_address.street);
      console.log(docStreet + docCity+ docZip);
      docInfo.append(docName + "\n" + docStreet + docCity + docZip )
      $('#slide2').append(docInfo);
      $('#slide1').hide();
      }

    }
  });

  }
});



