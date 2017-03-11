/**
 * Created by Maria on 11.03.2017.
 */

function drawMarker(array)
{

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var markers = array.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}