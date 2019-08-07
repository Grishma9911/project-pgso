$(document).ready(function() {

    $("#search").on("click", function() {
        $("#slide2").show() 
        $("#slide1").hide()
        
        console.log(this);
    });
    
    // $("#slide1").hide()
});

$("#search2").on("click", function() {
    $("#slide3").show()
    $("#slide2").hide()
    $("#slide1").hide()

    console.log(this);
});

$("#slide2").hide()