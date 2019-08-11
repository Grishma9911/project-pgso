// This code depends on jQuery Core and Handlebars.js 

var api_key = 'a6adddec4df7db9f9b37cd18dbb4a61e'; // Get your API key at developer.betterdoctor.com
var resource_url = 'https://api.betterdoctor.com/2016-03-01/conditions?user_key=' + api_key;
$.get(resource_url, function (data) {
    // data: { meta: {<metadata>}, data: {<array[Condition]>} }

    var template = Handlebars.compile(document.getElementById('conditions-template').innerHTML);
    document.getElementById('content-placeholder').innerHTML = template(data);
    console.log(data)
});
