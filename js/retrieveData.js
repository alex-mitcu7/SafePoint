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
        $("#displayResult")
            .append("Category " + array2[i][0] + " ")
            .append("Date " + array2[i][1] + " ")
            .append("Latitude " + array2[i][2] + " ")
            .append("Longitude " + array2[i][3] + " ")
    }
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
            $("body").append("Status " + status + " ");
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
        success: function(result , status, jsXHR){
            var count = 0;
            while (result[count]) {
                count++;
            }
            results = create2DArray(count);
            $("body").append("Status " + status + " ");
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

var create2DArray = function (rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }

    return arr;
}

var crimeSelection = function(array, crime) {

    var i = 0;
    var arraySelected = create2DArray(array.length);

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
    var finalArray = arraySelected.slice(0, i);
    return finalArray;
}