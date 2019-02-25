
// TO DO
// Randomize the order of the movies in the movies array & change array references in pickRandomMovies() to randomized list


// DECLARE VARIABLES
var correctMovie;
var incorrectMovieOne;
var incorrectMovieTwo;
// --------------------------------------------------------------

// WRITE FUNCTIONS
function createRandom(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}
  
// Create array of movies
var movies = ["Cars","The Notebook","Mr. Nobody","The Godfather"];

function pickRandomMovies() {
    var moviesArrayMin = 0; // First movie in movies array
    var moviesArrayMax = movies.length-1; // # of items in movies array
    correctMovie = movies[createRandom(moviesArrayMin,moviesArrayMax)];
    var correctMovieIndex = movies.indexOf(correctMovie);
    var correctMovieIsLast = (correctMovieIndex === movies.length-1);
    var correctMovieIsFirst = (correctMovieIndex === 0);
    if (correctMovieIsLast) {
        incorrectMovieOne = movies[correctMovieIndex-2];
        incorrectMovieTwo = movies[correctMovieIndex-3];
        } else {
        incorrectMovieOne = movies[correctMovieIndex+1];
            if (correctMovieIsFirst) {
                incorrectMovieTwo = movies[correctMovieIndex+2];
            } else {
            incorrectMovieTwo = movies[correctMovieIndex-1];
            }
        }
    }
 
    

// Function to pull movie info from OMDB API
function getMovieInfo() {

    // var correctMovie = movies[0];
    var queryURL = "https://www.omdbapi.com/?t=" + correctMovie + "&y=&plot=short&apikey=trilogy";
    
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
        console.log(response);
    });
}
// --------------------------------------------------------------

// CALL FUNCTIONS
pickRandomMovies();
getMovieInfo();
// --------------------------------------------------------------
console.log("correctMovie: " + correctMovie);
console.log("incorrectMovieOne: " + incorrectMovieOne);
console.log("incorrectMovieTwo: " + incorrectMovieTwo);
console.log(movies.length);