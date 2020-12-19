$(document).ready(function () {

    // renders movie details on the screen
    function renderMovieDetails(poster, title, releaseDate, length, error) {
        /*
            clear div
            render poster
            render title
            render length
            render description?

         */

        //error message
        if (error = "Movie not found!") {
            console.log(error);
        }
    }

    // renders possible streaming sites
    function renderStreamingSites(streamingSites) {
        console.log(streamingSites);
        // render available streaming sites


        // stop the loading icon
        $("#searchBtn").removeClass("is-loading");
    }


    function getMovieDetails() {
        // Movie Input Variable
        let movie = $("#inputBox").val();

        console.log("works")

        // API 1 URL
        var queryURLOMDB = `https://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`;
        // API 1 being called
        $.ajax({
            url: queryURLOMDB,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            const poster = response.Poster
            const title = response.Title
            const releaseDate = response.Ratings.Released
            const length = response.Ratings.Runtime
            const error = response.Error


            renderMovieDetails(poster, title, releaseDate, length, error)

        });
    }

    function getStreamingSites() {
        // Movie Input Variable
        let movie2 = $("#inputBox").val();

        // Change button to a loading button
        $("#searchBtn").addClass("is-loading");

        // API 2 for streaming sites
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${movie2}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "30665657c2msh03653ffece7aa3ap173f5fjsn540e48f69a45",
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
            }
        };

        // API 2 being called
        $.ajax(settings).then(function (response) {
            console.log(response);

            // get results from API
            // for (var i = 0; i < response.results[0].locations.length; i++) {
            var streamingSites = response.results[0].locations;
            renderStreamingSites(streamingSites);
            //  }
        });

    }




    // Search Button Function
    $('#searchBtn').on('click', function () {
        console.log("clicked");

        getMovieDetails()
        getStreamingSites()
        renderMovieDetails()
    });



});