$(document).ready(function () {

    // renders movie details on the screen
    function renderMovieDetails(poster, title, score, releaseDate, length, plot, error) {

        $('#inputBox').val("");

        let posterImg = $('<img class="movie-poster">').attr('src', poster);
        let titleText = $('<h1>').addClass("movie-title").text(title);
        let scoreText = $('<p>').addClass("movie-details").text(`Score: ${score}`);
        let releaseText = $('<p>').addClass("movie-details").text(`Release Date: ${releaseDate}`);
        let lengthText = $('<p>').addClass("movie-details").text(`Movie Length: ${length}`);
        let plotText = $('<p>').addClass("movie-plot").text(plot);
        let errorText = $('<p>').addClass("error-message").text(`Movie not found!`);

        $('#col1').append(posterImg);
        $('#col2').append(titleText);
        $('#col2').append(scoreText);
        $('#col2').append(releaseText);
        $('#col2').append(lengthText);
        $('#col2').append(plotText);

        // $('.columns').css(`z-index`, `0`)

        // error message
        if (error === "Movie not found!") {
            $('#col2').append(errorText);
        }

    }

    function renderStreamingSites(response) {

        for (let i = 0; i < response.results[0].locations.length; i++) {

            let streamingSites = response.results[0].locations[i].icon;
            let siteLocation = response.results[0].locations[i].url;
            let icons = $('<a>').attr({ href: siteLocation, target: "_blank" });
            let iconImage = $('<img class="site-icon">').attr('src', streamingSites);
            icons.append(iconImage);

            $('#col2').append(icons);

        }
    }

    // function renderStreamingSites2() {

    //     for (let i = 0; i < response.results[1].locations.length; i++) {

    //         let streamingSites = response.results[1].locations[i].icon;
    //         let siteLocation = response.results[1].locations[i].url;
    //         let icons = $('<a>').attr({ href: siteLocation, target: "_blank" });
    //         let iconImage = $('<img class="site-icon">').attr('src', streamingSites);
    //         icons.append(iconImage);

    //         $('#col2').append(icons);

    //     }
    // }

    function getStreamingSites() {

        // API 1 for streaming sites
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

        // API 1 being called
        $.ajax(settings).then(function (response) {

            console.log(response);

            renderStreamingSites(response);

            var movieID = response.results[0].external_ids.imdb.id;
            getMovieDetails(movieID);

            let movieID2 = response.results[1].external_ids.imdb.id;

            if (response.results[0].name === response.results[1].name) {

                console.log("yes");

                for (let i = 0; i < response.results[1].locations.length; i++) {

                    let streamingSites = response.results[1].locations[i].icon;
                    let siteLocation = response.results[1].locations[i].url;
                    let icons = $('<a>').attr({ href: siteLocation, target: "_blank" });
                    let iconImage = $('<img class="site-icon">').attr('src', streamingSites);
                    icons.append(iconImage);

                    $("#col2").append(icons);

                };

                getMovieDetails(movieID2);

            };

            $("#searchBtn").removeClass("is-loading");

        });

    };

    function getMovieDetails(movieID) {

        // API 2 URL
        var queryURLOMDB = `https://www.omdbapi.com/?i=${movieID}&y=&plot=short&apikey=trilogy`;

        // API 2 being called
        $.ajax({
            url: queryURLOMDB,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            const poster = response.Poster;
            const title = response.Title;
            const score = response.Ratings[0].Value;
            const releaseDate = response.Released;
            const length = response.Runtime;
            const plot = response.Plot;
            const error = response.Error;

            renderMovieDetails(poster, title, score, releaseDate, length, plot, error);

        });
    };

    //$("#search-form").on("click", function () {

    //   $('.columns').css(`z-index`, `-1`);

    // });

    // Search Button Function
    $('#search-form').submit(function (e) {

        $('#col1').empty();
        $('#col2').empty();

        e.preventDefault();

        getStreamingSites();
    });

});