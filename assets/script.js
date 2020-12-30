$(document).ready(function () {

    // renders movie details on the screen
    function renderMovieDetails(poster, title, score, releaseDate, length, error) {
        $('#movie-screen').empty()
        $('#movie-poster').empty()
        $('#inputBox').val("")

        // $('#movie-screen').append(poster)
        $('#movie-screen').append(title)
        $('#movie-screen').append(score)
        $('#movie-screen').append(releaseDate)
        $('#movie-screen').append(length)

        /*
            render poster
            render title
            render IMDB score
            render length
            render description?

         */

        // error message
        if (error === "Movie not found!") {
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


    function getStreamingSites() {
        // API 2 for streaming sites
        let movie = $("#inputBox").val();

        // Change button to a loading button
        $("#searchBtn").addClass("is-loading");

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${movie}`,
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
            var streamingSites = response.results[0].locations;

            var movieID = response.results[0].external_ids.imdb.id;

            renderStreamingSites(streamingSites)

            getMovieDetails(movieID)

        });

    }

    function getMovieDetails(movieID) {
        // Movie Input Variable
        
        console.log("works")

        // API 1 URL
    var queryURLOMDB = `https://www.omdbapi.com/?i=${movieID}&y=&plot=short&apikey=trilogy`;
        // API 1 being called
        $.ajax({
            url: queryURLOMDB,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            const poster = response.Poster
            const title = response.Title
            const score = response.Ratings[0].Value
            const releaseDate = response.Released
            const length = response.Ratings.Runtime
            const error = response.Error


            renderMovieDetails(poster, title, score, releaseDate, length, error)

        });
    }

    // Search Button Function
    $('#search-form').submit(function (e) {
        console.log("clicked");
        e.preventDefault()

        getMovieDetails()
        getStreamingSites()
    });

});