
// Create array of movies
var movies = ["Cars","The Notebook","Mr. Nobody"];

function getMovieInfo() {

    // var movie = $(this).attr("data-name");
    var movie = movies[0];
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    // Create an AJAX call for the movie selected
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var title = response.Title;
        var released = response.Released;
        var rating = response.Rating;
        var plot = response.Plot;
        var imgURL = response.Poster;
        console.log("Title..",title);
    });
}

getMovieInfo();