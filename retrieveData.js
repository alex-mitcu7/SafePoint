/**
 * Created by mihai on 3/11/2017.
 */

if (typeof jQuery === 'undefined') {
    throw new Error('SafePoint\'s JavaScript requires jQuery')
}

var requestSpot = function(lat, long) {


    $.getJSON("https://data.police.uk/api/crimes-street/all-crime", {
        lat: lat,
        lng: long
    }, function(result , status, jsXHR){
        var count = 0;
        while (result[count]) {
            count++;
        }
        var results = create2DArray(count);
        $("body").append("Status " + status + " ");
        $.each(result, function(i, field){
            results[i].push(field.category);
            results[i].push(field.month);
            results[i].push(field.location.latitude);
            results[i].push(field.location.longitude);
            // $("body")
            //     .append("i: " + i + " ")
            //     .append("Category " + results[i][0] + " ")
            //     .append("Date " + results[i][1] + " ")
            //     .append("Latitude " + results[i][2] + " ")
            //     .append("Longitude " + results[i][3] + " ")
        });
    });

    return results;
}

var requestPoly = function(point1, point2, point3, point4) {


    $.getJSON("https://data.police.uk/api/crimes-street/all-crime", {
        poly: point1 + ":" + point2 + ":" + point3+ ":" + point4
    }, function(result , status, jsXHR){
        var count = 0;
        while (result[count]) {
            count++;
        }
        var results = create2DArray(count);
        $("body").append("Status " + status + " ");
        $.each(result, function(i, field){
            results[i].push(field.category);
            results[i].push(field.month);
            results[i].push(field.location.latitude);
            results[i].push(field.location.longitude);
        });
    });

    return results;
}

var create2DArray = function (rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }

    return arr;
}