
// TO DO
// Randomize the order of the movies in the movies array & change array references in pickRandomMovies() to randomized list
// --------------------------------------------------------------

// DECLARE VARIABLES
var movies = ["Cars", "The Notebook", "Mr. Nobody", "The Godfather"]; // Create array of movies
var correctMovie;
var incorrectMovieOne;
var incorrectMovieTwo;
var questionCategories = ["Actors","Director","Plot","Rated","Released","Runtime","Plot"]; // Categories of questions
var questionCategory; // The type of question to be asked (plot, released date, etc.)
var question;
var questionGrammarSubject;
// --------------------------------------------------------------

// WRITE FUNCTIONS
// Function to pick a random # (used in pickRandomMovies and pickRandomQuestion functions)
function createRandom(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Pick a random movie from the movies array
function pickRandomMovies() {
    var moviesArrayMin = 0; // First movie in movies array
    var moviesArrayMax = movies.length - 1; // # of items in movies array
    correctMovie = movies[createRandom(moviesArrayMin, moviesArrayMax)];
    var correctMovieIndex = movies.indexOf(correctMovie);
    var correctMovieIsLast = (correctMovieIndex === movies.length - 1);
    var correctMovieIsFirst = (correctMovieIndex === 0);
    if (correctMovieIsLast) {
        incorrectMovieOne = movies[correctMovieIndex - 2];
        incorrectMovieTwo = movies[correctMovieIndex - 3];
    } else {
        incorrectMovieOne = movies[correctMovieIndex + 1];
        if (correctMovieIsFirst) {
            incorrectMovieTwo = movies[correctMovieIndex + 2];
        } else {
            incorrectMovieTwo = movies[correctMovieIndex - 1];
        }
    }
}
// Pick a random category of question
function pickRandomQuestion() {
    var questionsArrayMin = 0; // First category in questionCategories array
    var questionsArrayMax = questionCategories.length -1; // # of items in questionCategories array
    questionCategory = questionCategories[createRandom(0,4)];

    switch (questionCategory) {
        case "Actors":
            questionGrammarSubject = "Who are the actors in ";
            break;
        case "Director":
            questionGrammarSubject = "Who was the director of ";
            break;
        case "Rated":
            questionGrammarSubject = "What was the rating of ";
            break;
        case "Released":
            questionGrammarSubject = "What was the release date of ";
            break;
        case "Runtime":
            questionGrammarSubject = "How long is ";
            break;
        case "Plot":
            questionGrammarSubject = "What is the plot of ";
    }
}

// Function to pull movie info from OMDB API
function getMovieInfo() {
    var queryURL = "https://www.omdbapi.com/?t=" + correctMovie + "&y=&plot=short&apikey=trilogy";
    // Create an AJAX call for the movie selected
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var title = response.Title;
        var actors = response.Actors;
        var director = response.Director;
        var released = response.Released;
        var rated = response.Rated;
        var runtime = response.Runtime;
        var plot = response.Plot;
        var imgURL = response.Poster;
        console.log(response);
        switch (String(questionCategory)) {
            case "Actors":
            question = actors;
            break;
            case "Director":
            question = director;
            break;
            case "Plot":
            question = plot;
            break;
            case "Rated":
            question = rated;
            break;
            case "Released":
            question = released;
            break;
            case "Runtime":
            question = runtime;
            break;
            case "Plot": 
            question = plot;
        }
        console.log("question2: " + question);
        $("#questionText").text(questionGrammarSubject + title + "?");
    });
}
// --------------------------------------------------------------

// SET VALUE OF VARIABLES



// CALL FUNCTIONS
pickRandomMovies();
getMovieInfo();
pickRandomQuestion();
// --------------------------------------------------------------

console.log("correctMovie: " + correctMovie);
console.log("incorrectMovieOne: " + incorrectMovieOne);
console.log("incorrectMovieTwo: " + incorrectMovieTwo);
console.log("questionCategory: " + questionCategory);
