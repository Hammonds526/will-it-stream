$(document).ready(function () {

    // renders movie details on the screen
    function renderMovieDetails(poster, title, score, releaseDate, length, error) {
        // poster.append($('#movie-poster'))
        // title.append($('#movie-details'))
        // score.append($('#movie-details'))
        // releaseDate.append($('#movie-details'))
        // length.append($('#movie-details'))


        /*
            render poster
            render title
            render IMDB score
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
            const score = response.Ratings[0].Value
            const releaseDate = response.Released
            const length = response.Ratings.Runtime
            const error = response.Error



            renderMovieDetails(poster, title, score, releaseDate, length)



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
        $('#movie-info').empty()
        $('#inputBox').val("")

        getMovieDetails()
        getStreamingSites()
        renderMovieDetails()
    });

    // Search on 'Enter' keypress
    // $(document).keypress(function (event) {
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if (keycode == '13') {

    //         $('#movie-info').empty()
    //         $('#inputBox').val("")

    //         getMovieDetails()
    //         getStreamingSites()
    //         renderMovieDetails();
    //     }
    // });



});