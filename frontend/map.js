//javascript.js
//set map options
var myLatLng = { lat: 43.651070, lng: -79.347015 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById("right-panel"));
const control = document.getElementById("floating-panel");
control.style.display = "block";
map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //Get distance and time
            $("#output").html("<div class='alert-info'>From: " + document.getElementById("from").value +
                ".<br />To: " + document.getElementById("to").value, +
                ".<br /> Driving distance: " + result.routes[0].legs[0].distance.text +
                ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>");
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in Toronto
            map.setCenter(myLatLng);
            //show error message
            $("#output").html("<div class='alert-danger'>Could not retrieve driving distance.</div>");
        }
    });
}

//create a list of donee locations
let destinationList = ["Stockholm, Sweden", "Sollentuna, Sweden", "Galärvarvsvägen 14, 115 21 Stockholm, Sweden"];

//create an empty list of distances
let distanceList = [];

//calculate distance between origin donee and other donees around it
function calcDistance() {
    //loop through all the donees
    for (let i = 0; i < destinationList.length; i++) {
        //create request
        var request = {
                origin: document.getElementById("from").value,
                destination: destinationList[i],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            }
            //pass the request to the route method
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                distanceList[i] = result.routes[0].legs[0].distance;
            } else {
                //show error message
                $("#output").html("<div class='alert-danger'>Could not retrieve driving distance.</div>");
            }
        });
    }
}

//create a new array of donees within the 50 km radius 
let newDistanceList = [];

//create an array of donees within the 50 km radius from the origin donee
function restrictDistance() {
    for (let i = 0; i < distanceList.length; i++) {
        if (distanceList[i].value <= 50000) {
            newDistanceList.push(distanceList[i]);
        }
    }
}

//create autocomplete objects for all inputs
var options = {
    types: ['address']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);