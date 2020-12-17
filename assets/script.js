$(document).ready(function () {

    var titleOMDB = "space+jam";
    var queryURLOMDB = "https://www.omdbapi.com/?t=" + titleOMDB + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: queryURLOMDB,
        method: "GET"
    }).then(function (response) {
        console.log(response);

    });

    var titleUtelly = "the%20godfather";

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + titleUtelly,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "30665657c2msh03653ffece7aa3ap173f5fjsn540e48f69a45",
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    $('#searchBtn').on('click', function() {
        console.log("clicked");
        

    });

});