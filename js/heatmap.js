/**
 * Created by Maria on 11.03.2017.
 */

var markers = [], markerCluster = null;

function drawMarker(array)
{
    if(markerCluster != null) {
        markerCluster.clearMarkers();
        markers = [];
    }

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    markers = array.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}