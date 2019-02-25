
// TO DO
// Randomize the order of the movies in the movies array & change array references in pickRandomMovies() to randomized list
// Fix the answer column size (bootsrap isn't working), or get rid of "padding" columns and add padding to answer column
// Randomize the display order of the answers on the page
// Add the score counter
// Add the timer
// --------------------------------------------------------------

// DECLARE VARIABLES
var movies = ["Cars", "The Notebook", "Mr. Nobody", "The Godfather"]; // Create array of movies
var correctMovie;
var incorrectMovieOne;
var incorrectMovieTwo;
var questionCategories = ["Actors","Director","Plot","Released","Runtime","Plot"]; // Categories of questions
var questionCategory; // The type of question to be asked (plot, released date, etc.)
var questionGrammarSubject;
var answer;
var correctAnswerDiv; // The div holding the correct answer
var incorrectAnswer1Div;
var incorrectAnswer2Div;
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
function correctMovieInfo() {
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
        var runtime = response.Runtime;
        var plot = response.Plot;
        var imgURL = response.Poster;
        console.log(response);
        switch (String(questionCategory)) {
            case "Actors":
                answer = actors;
                break;
            case "Director":
                answer = director;
                break;
            case "Plot":
                answer = plot;
                break;
            case "Released":
                answer = released;
                break;
            case "Runtime":
                answer = runtime;
                break;
            case "Plot": 
                answer = plot;
        }
        console.log("answer: " + answer);
        var image = $("<img>").attr("src", imgURL); // Create element to hold the image
        $("#movieImage").append(image); // Append the image
        $("#questionText").text(questionGrammarSubject + title + "?");
        $(correctAnswerDiv).text(answer);
    });
}

function incorrectMovieOneInfo() {
    var queryURL = "https://www.omdbapi.com/?t=" + incorrectMovieOne + "&y=&plot=short&apikey=trilogy";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var title = response.Title;
        var actors = response.Actors;
        var director = response.Director;
        var released = response.Released;
        var runtime = response.Runtime;
        var plot = response.Plot;
        switch (String(questionCategory)) {
            case "Actors":
                answer = actors;
                break;
            case "Director":
                answer = director;
                break;
            case "Plot":
                answer = plot;
                break;
            case "Released":
                answer = released;
                break;
            case "Runtime":
                answer = runtime;
                break;
            case "Plot": 
                answer = plot;
        }
        console.log("incorrectAnswerOne: " + answer);
        $(incorrectAnswer1Div).text(answer);
    });
}

function incorrectMovieTwoInfo() {
    var queryURL = "https://www.omdbapi.com/?t=" + incorrectMovieTwo + "&y=&plot=short&apikey=trilogy";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var title = response.Title;
        var actors = response.Actors;
        var director = response.Director;
        var released = response.Released;
        var runtime = response.Runtime;
        var plot = response.Plot;
        switch (String(questionCategory)) {
            case "Actors":
                answer = actors;
                break;
            case "Director":
                answer = director;
                break;
            case "Plot":
                answer = plot;
                break;
            case "Released":
                answer = released;
                break;
            case "Runtime":
                answer = runtime;
                break;
            case "Plot": 
                answer = plot;
        }
        console.log("incorrectAnswerTwo: " + answer);
        $(incorrectAnswer2Div).text(answer);
    });
}

function callMovieInfoFunctions() {
    correctMovieInfo();
    incorrectMovieOneInfo();
    incorrectMovieTwoInfo();
}

function randomizeAnswerDivs() {
    var answerOrder = [] // Create an array to store positions of answers
    var pickRandom = createRandom(0,2); 
    answerOrder.push(pickRandom); 
    for (var i=0; i<=2; i++) {
        if (answerOrder.indexOf(i) == -1)
        answerOrder.push(i);
    }
    correctAnswerDiv = "#answerDiv" + answerOrder[0];
    incorrectAnswer1Div = "#answerDiv" + answerOrder[1];
    incorrectAnswer2Div = "#answerDiv" + answerOrder[2];
console.log("answerOrder: "+answerOrder)
}
// --------------------------------------------------------------

// CALL FUNCTIONS
pickRandomMovies();
randomizeAnswerDivs();
callMovieInfoFunctions();
pickRandomQuestion();
// --------------------------------------------------------------

console.log("correctMovie: " + correctMovie);
console.log("incorrectMovieOne: " + incorrectMovieOne);
console.log("incorrectMovieTwo: " + incorrectMovieTwo);
console.log("questionCategory: " + questionCategory);
// console.log("randomanswerdiv: " + correctAnswerDiv);
