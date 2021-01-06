$(document).ready(function () {

    let streamingRow = $(`<div class="columns">`);
    let streamingCol = $(`<div class="column" id="streaming">`);

    // renders movie details on the screen
    function renderMovieDetails(poster, title, score, releaseDate, length, plot, error) {

        $('#inputBox').val("");

        let posterImg = $('<img class="movie-poster">').attr('src', poster);
        let titleText = $('<h1>').addClass("movie-title").text(title);
        let scoreText = $('<p>').addClass("movie-details").text(`Score: ${score}`);
        let releaseText = $('<p>').addClass("movie-details").text(`Release Date: ${releaseDate}`);
        let lengthText = $('<p>').addClass("movie-details").text(`Movie Length: ${length}`);
        let plotText = $('<p>').addClass("movie-details").text(plot);
        // let errorText = $('<p>').addClass("error-message").text(`Movie not found!`);

        let newRow = $(`<div class="columns">`);
        let newCol1 = $(`<div class="column" id="col1">`);
        let newCol2 = $(`<div class="column" id="col2">`);

        newCol1.append(posterImg);
        newCol2.append(titleText);
        newCol2.append(scoreText);
        newCol2.append(releaseText);
        newCol2.append(lengthText);
        newCol2.append(plotText);

        newRow.append(newCol1, newCol2);

        $(".movie-screen").append(newRow);

        // error message
        // if (error === "Movie not found!") {
        //    $('#col2').append(errorText);
        // }

    }

    function renderStreamingSites(response) {

        for (let i = 0; i < response.results[0].locations.length; i++) {

            let streamingSites = response.results[0].locations[i].icon;
            let siteLocation = response.results[0].locations[i].url;
            let icons = $('<a>').attr({ href: siteLocation, target: "_blank" });
            let iconImage = $('<img class="site-icon">').attr('src', streamingSites);
            icons.append(iconImage);

            streamingCol.append(icons);

        };

        streamingRow.append(streamingCol);
        $(".movie-screen").append(streamingRow);
    };

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
        //$("#searchBtn").addClass("is-loading");

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

                    streamingCol.append(icons);

                };

                streamingRow.append(streamingCol);
                $(".movie-screen").append(streamingRow);

                getMovieDetails(movieID2);

            };

            //$("#searchBtn").removeClass("is-loading");

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

    // Search Button Function
    $('#search-form').submit(function (e) {

        $('.movie-screen').empty();
        streamingRow.empty();
        streamingCol.empty();

        e.preventDefault();

        getStreamingSites();
    });

});