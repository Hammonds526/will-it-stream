$(document).ready(function () {

    // renders movie details on the screen
    function renderMovieDetails(poster, title, score, releaseDate, length) {
        $('#movie-info').empty()
        
        /*
            clear div
            render poster
            render title
            render length
            render description?

         */
    }

    // renders possible streaming sites
    function renderStreamingSites(streamingSites) {

        // render available streaming sites

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
            

                renderMovieDetails(poster, title, score, releaseDate, length)

        });
    }

    function getStreamingSites() {

        let movie2 = $("#inputBox").val();
        // API 2 for streaming sites
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
            const streamingSites = response.results

            renderStreamingSites(streamingSites)

        });

    }




    // Search Button Function
    $('#searchBtn').on('click', function () {
        console.log("clicked");

        getMovieDetails()
        getStreamingSites()
        renderMovieDetails()
        renderStreamingSites()
    });



});