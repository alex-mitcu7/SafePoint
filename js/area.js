/**
 * Created by alex on 11/03/17.
 */
    function calculateArea() {

        $("#error").hide();
        var radius = parseFloat(document.getElementById("radius").value);
        var crimeType = document.getElementById("crime").value;
        var centerPoint = marker.getPosition();

        params = calculateSurroundings(centerPoint, radius);

        var largerAreaResult = requestWithCrimePoly(params[0], params[1], params[2], params[3], crimeType);
        while(largerAreaResult.length == 0 && radius > 0) {
            radius -= 5;
            $("#warning").show();
            $("#displayWarning").text('Trying with radius ' + radius);
            params = calculateSurroundings(centerPoint, radius);
            largerAreaResult = requestWithCrimePoly(params[0], params[1], params[2], params[3], crimeType);
        }

        $("#warning").hide();

        if(largerAreaResult.length != 0)
            drawMarker(largerAreaResult);
        else {
            $("#error").show();
            $("#displayError").append('<strong>Too many crimes!<strong>');
        }
    }

    function calculateSurroundings(centerPoint, radius) {
        // Calculate points which will define the area of interest
        var north = centerPoint.destinationPoint(0, radius);
        var east = centerPoint.destinationPoint(90, radius);
        var south = centerPoint.destinationPoint(180, radius);
        var west = centerPoint.destinationPoint(270, radius);
        var northStr, southStr, eastStr, westStr;
        northStr = north.lat() + ',' + north.lng();
        eastStr = east.lat() + ',' + east.lng();
        southStr = south.lat() + ',' + south.lng();
        westStr = west.lat() + ',' + west.lng();

        result = [];
        result.push(northStr);
        result.push(eastStr);
        result.push(southStr);
        result.push(westStr);

        return result;
    }

    google.maps.LatLng.prototype.destinationPoint = function (brng, dist) {
        dist = dist / 6371;
        brng = brng.toRad();

        var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

        var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                Math.cos(lat1),
                Math.cos(dist) - Math.sin(lat1) *
                Math.sin(lat2));

        if (isNaN(lat2) || isNaN(lon2)) return null;

        return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
    }

    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }

    Number.prototype.toDeg = function () {
        return this * 180 / Math.PI;
    }



