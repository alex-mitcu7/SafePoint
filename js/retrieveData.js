/**
 * Created by mihai on 3/11/2017.
 */

if (typeof jQuery === 'undefined') {
    throw new Error('SafePoint\'s JavaScript requires jQuery')
}

var requestWithCrime = function(lat, long, crime) {

    var array1 = requestSpot(lat, long);

    var array2 = crimeSelection(array1, crime);

    return array2;
}

var requestWithCrimePoly = function(point1, point2, point3, point4, crime) {

    var array1 = requestPoly(point1, point2, point3, point4);

    var array2 = crimeSelection(array1, crime);

    return array2;
}

var requestSpot = function(lat, long) {

    // var results = create2DArray(5000);
    var url = "https://data.police.uk/api/crimes-street/all-crime" + "?lat=" + lat + "&lng=" + long;
    var results = null;
    $.ajax({
        async: false,
        url: url,
        success: function(result , status, jsXHR){
            var count = 0;
            while (result[count]) {
                count++;
            }
            results = create2DArray(count);
            $.each(result, function(i, field){
                results[i].push(field.category);
                results[i].push(field.month);
                results[i].push(field.location.latitude);
                results[i].push(field.location.longitude);
            });
        }
    });
    return results;

}

var requestPoly = function(point1, point2, point3, point4) {

    var url = "https://data.police.uk/api/crimes-street/all-crime" + "?poly=" + point1 + ":" + point2 + ":" + point3 + ":" + point4;
    var results = null;
    $.ajax({
        async: false,
        url: url,
        statusCode: {
            503: function(xhr) {
                results = [];
            },
            200: function(result , status, jsXHR){
                var count = 0;
                while (result[count]) {
                    count++;
                }

                results = create2DArray(count);


                $.each(result, function(i, field){

                    results[i].push(field.category);
                    results[i].push(field.month);
                    results[i].push(field.location.latitude);
                    results[i].push(field.location.longitude);
                });
            }
        }
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

var createObjectArray = function (rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = new Object();
    }

    return arr;
}

var crimeSelection = function(array, crime) {

    var i = 0;
    var results = createObjectArray(array.length);

    for (var j = 0; j < array.length; j++)
    {
        if (array[j][0] == crime)
        {
            results[i].category = array[j][0];
            results[i].date = array[j][1];
            results[i].latitute = array[j][2];
            results[i].longitude = array[j][3];
            i++;
        }
    }

    var finalArrayJson = JSON.stringify(results.slice(0, i));
    return finalArrayJson;
}