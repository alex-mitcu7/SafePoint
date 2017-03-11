/**
 * Created by mihai on 3/11/2017.
 */

if (typeof jQuery === 'undefined') {
    throw new Error('SafePoint\'s JavaScript requires jQuery')
}

var requestWithCrime = function(lat, long, crime) {

    var array1 = requestSpot(lat, long);

    var array2 = crimeSelection(array1, crime);

    for (var i = 0; i < array2.length; i++) {
        $("body")
            .append("Category " + array2[i][0] + " ")
            .append("Date " + array2[i][1] + " ")
            .append("Latitude " + array2[i][2] + " ")
            .append("Longitude " + array2[i][3] + " ")
    }
}

var requestWithCrimePoly = function(point1, point2, point3, point4, crime) {

    var array1 = requestPoly(point1, point2, point3, point4);

    var array2 = crimeSelection(array1, crime);

    for (var i = 0; i < array2.length; i++) {
        $("body")
            .append("Category " + array2[i][0] + " ")
            .append("Date " + array2[i][1] + " ")
            .append("Latitude " + array2[i][2] + " ")
            .append("Longitude " + array2[i][3] + " ")
    }
}

var requestSpot = function(lat, long) {

    // var results = create2DArray(5000);
    var url = "https://data.police.uk/api/crimes-street/all-crime" + "?lat=" + lat + "&lng=" + long;
    var results = create2DArray(5000);
    $.ajax({
        async: false,
        url: url,
        success: function(result , status, jsXHR){
            var count = 0;
            while (result[count]) {
                count++;
            }
            //var results = create2DArray(count);
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
        }
    });
    return results;

    // $.getJSON("https://data.police.uk/api/crimes-street/all-crime", {
    //     lat: lat,
    //     lng: long
    // }, function(result , status, jsXHR){
    //     var count = 0;
    //     while (result[count]) {
    //         count++;
    //     }
    //     var results = create2DArray(count);
    //     $("body").append("Status " + status + " ");
    //     $.each(result, function(i, field){
    //         results[i].push(field.category);
    //         results[i].push(field.month);
    //         results[i].push(field.location.latitude);
    //         results[i].push(field.location.longitude);
    //         // $("body")
    //         //     .append("i: " + i + " ")
    //         //     .append("Category " + results[i][0] + " ")
    //         //     .append("Date " + results[i][1] + " ")
    //         //     .append("Latitude " + results[i][2] + " ")
    //         //     .append("Longitude " + results[i][3] + " ")
    //     });
    //     //resultsWide = results;
    // });
    // $("body")
    //     .append("Category " + results[0][0] + " ")
    //     .append("Date " + results[0][1] + " ")
    //     .append("Latitude " + results[0][2] + " ")
    //     .append("Longitude " + results[0][3] + " ")
    // return results;
}

var requestPoly = function(point1, point2, point3, point4) {

    var url = "https://data.police.uk/api/crimes-street/all-crime" + "?poly=" + point1 + ":" + point2 + ":" + point3 + ":" + point4;
    var results = create2DArray(5000);
    $.ajax({
        async: false,
        url: url,
        success: function(result , status, jsXHR){
            var count = 0;
            while (result[count]) {
                count++;
            }
            //var results = create2DArray(count);
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
        }
    });
    return results;


    // $.getJSON("https://data.police.uk/api/crimes-street/all-crime", {
    //     poly: point1 + ":" + point2 + ":" + point3+ ":" + point4
    // }, function(result , status, jsXHR){
    //     var count = 0;
    //     while (result[count]) {
    //         count++;
    //     }
    //     var results = create2DArray(count);
    //     $("body").append("Status " + status + " ");
    //     $.each(result, function(i, field){
    //         results[i].push(field.category);
    //         results[i].push(field.month);
    //         results[i].push(field.location.latitude);
    //         results[i].push(field.location.longitude);
    //     });
    // });

    // return results;
}

var create2DArray = function (rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }

    return arr;
}

var crimeSelection = function(array, crime) {

    var i = 0;
    var arraySelected = create2DArray(5000);

    for (var j = 0; j < array.length; j++)
    {
        if (array[j][0] == crime)
        {
            arraySelected[i].push(array[j][0]);
            arraySelected[i].push(array[j][1]);
            arraySelected[i].push(array[j][2]);
            arraySelected[i].push(array[j][3]);
            i++;
        }
    }
    return arraySelected;
}