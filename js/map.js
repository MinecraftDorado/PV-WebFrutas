var BingMapsKey = 'At1ENroLlCSDmuDGpSSdKBny4edxYd85KB3Fat-siwZneCM4q3ifpDNjxacHwd6w';

function geocode() {
    var location = document.getElementById('location')
    
    var query = (location.value != '') ? location.value : 'Argentina';

    var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(query) + "&jsonp=GeocodeCallback&key=" + BingMapsKey;

    CallRestService(geocodeRequest, GeocodeCallback);
}

function GeocodeCallback(response) {
    var output = document.getElementById('map');

    if (response &&
        response.resourceSets &&
        response.resourceSets.length > 0 &&
        response.resourceSets[0].resources) {

        var results = response.resourceSets[0].resources;

        var latitude = results[0].point.coordinates[0];
        var longitude = results[0].point.coordinates[1]

        var map = new Microsoft.Maps.Map('#map', {credentials: BingMapsKey});

        var loc = new Microsoft.Maps.Location(latitude,longitude);

        //Add a pushpin at the user's location.
        var pin = new Microsoft.Maps.Pushpin(loc);
        map.entities.push(pin);

        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 10 });

    } else {
        output.innerHTML = "No se encontro la dirección.";
    }
}

function CallRestService(request) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    document.body.appendChild(script);
}