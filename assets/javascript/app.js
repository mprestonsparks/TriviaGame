
// TO DO
// Randomize the order of the movies in the movies array & change array references in pickRandomMovies() to randomized list
// Fix the answer column size (bootsrap isn't working), or get rid of "padding" columns and add padding to answer column

// ISSUES:
// On refresh, the first 2 guesses are correct (ie the console.log of correctAnswerDiv# matches the HTML on screen)
// But the 3rd+ one breaks every time

//There's a circular feedback loop bw checkAnswer() and changeQuestion(), so probably checkAnswer() never gets
//called again after refresh (?)
// --------------------------------------------------------------

// ********** VARIABLES **********
var movies = ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "The Godfather: Part II", "The Lord of the Rings: The Return of the King", "Pulp Fiction", "Schindler's List", "The Good, the Bad and the Ugly", "12 Angry Men", "Inception", "Fight Club", "The Lord of the Rings: The Fellowship of the Ring", "Forrest Gump", "Star Wars: Episode V", "The Lord of the Rings: The Two Towers", "The Matrix", "Goodfellas", "Seven Samurai", "Andhadhun", "Interstellar", "City of God", "Spirited Away", "Saving Private Ryan", "Life Is Beautiful", "The Usual Suspects", "Se7en", "Léon: The Professional", "The Silence of the Lambs", "Star Wars", "It's a Wonderful Life", "Dangal", "Whiplash", "The Prestige", "The Departed", "The Pianist", "Memento", "Gladiator", "The Green Mile", "American History X", "The Lion King", "Back to the Future", "Raiders of the Lost Ark", "Apocalypse Now"];
var correctMovie;
var incorrectMovieOne;
var incorrectMovieTwo;
var questionCategories = ["Actors", "Director", "Production", "Rated", "Released", "Runtime"]; // Categories of questions
var questionCategory; // The type of question to be asked (produced by, released date, etc.)
var questionGrammarSubject;
var answer; // 
var correctAnswer;
var incorrectAnswerOne;
var incorrectAnswerTwo;
var correctAnswerDiv; // The div holding the correct answer
var incorrectAnswer1Div;
var incorrectAnswer2Div;
var correctScore = 0;
var incorrectScore = 0;
// --------------------------------------------------------------

// ********** FUNCTIONS **********
// Function to pick a random # (used in pickRandomMovies and pickRandomQuestion functions)
function createRandom(min, max) {
    return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
}

function initializeNewGame() {
    pickRandomMovies();
    pickRandomQuestion();
    newAJAXRequest();
    randomizeAnswerDivs();
    checkAnswer();
    startTimer();
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
    var questionsArrayMax = questionCategories.length - 1; // # of items in questionCategories array
    questionCategory = questionCategories[createRandom(0, 4)];

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
        case "Production":
            questionGrammarSubject = "Which company produced ";
            break;
        case "Rated":
            questionGrammarSubject = "What is the rating of ";
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
        var rated = response.Rated
        var released = response.Released;
        var runtime = response.Runtime;
        var production = response.Production;
        var imgURL = response.Poster;
        switch (String(questionCategory)) {
            case "Actors":
                correctAnswer = actors;
                break;
            case "Director":
                correctAnswer = director;
                break;
            case "Production":
                correctAnswer = production;
                break;
            case "Rated":
                correctAnswer = rated;
            case "Released":
                correctAnswer = released;
                break;
            case "Runtime":
                correctAnswer = runtime;
        }
        $("#movieImage").empty();
        var image = $("<img>").attr("src", imgURL); // Create element to hold the image
        $("#movieImage").append(image); // Replace the image
        $("#questionText").text(questionGrammarSubject + title + "?");
        $(correctAnswerDiv).text(correctAnswer);
        console.log(response);
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
        var rated = response.Rated
        var released = response.Released;
        var runtime = response.Runtime;
        var production = response.Production;
        switch (String(questionCategory)) {
            case "Actors":
                incorrectAnswerOne = actors;
                break;
            case "Director":
                incorrectAnswerOne = director;
                break;
            case "Production":
                incorrectAnswerOne = production;
                break;
            case "Rated":
                incorrectAnswerOne = rated;
                break;
            case "Released":
                incorrectAnswerOne = released;
                break;
            case "Runtime":
                incorrectAnswerOne = runtime;
        }
        $(incorrectAnswer1Div).text(incorrectAnswerOne);
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
        var rated = response.Rated
        var released = response.Released;
        var runtime = response.Runtime;
        var production = response.Production;
        switch (String(questionCategory)) {
            case "Actors":
                incorrectAnswerTwo = actors;
                break;
            case "Director":
                incorrectAnswerTwo = director;
                break;
            case "Production":
                incorrectAnswerTwo = production;
                break;
            case "Rated":
                incorrectAnswerTwo = rated;
                break;
            case "Released":
                incorrectAnswerTwo = released;
                break;
            case "Runtime":
                incorrectAnswerTwo = runtime;
        }
        $(incorrectAnswer2Div).text(incorrectAnswerTwo);
    });
}


console.log("correct", correctAnswer);
console.log("incorrect1", incorrectAnswerOne);
var answerOrder=[];
function randomizeAnswerDivs() {
    // var answerOrder = [] // Create an array to set random positions of answers
    answerOrder.length = 0;
    var pickRandom = createRandom(0, 2);
    answerOrder.push(pickRandom); // Pick one random number as the first position in answerOrder[]
    for (var i = 0; i <= 2; i++) {
        if (answerOrder.indexOf(i) == -1)
            answerOrder.push(i);
    }
    correctAnswerDiv = "#answerDiv" + answerOrder[0];
    correctAnswerButton = "#answerButton" + answerOrder[0];
    incorrectAnswer1Div = "#answerDiv" + answerOrder[1];
    incorrectAnswer1Button = "#answerButton" + answerOrder[1];
    incorrectAnswer2Div = "#answerDiv" + answerOrder[2];
    incorrectAnswer2Button = "#answerButton" + answerOrder[2];
}

$(".modal-buttons").click(function() {
    console.log("*****************************");
    console.log("answerOrder:", answerOrder);
    console.log("correct ans",correctAnswer);
    console.log("*********");
    console.log("correctAnswerDiv= ",correctAnswerDiv);
    console.log("incorrectAnswer1Div=",incorrectAnswer1Div);
    console.log("incorrectAnswer2Div",incorrectAnswer2Div);
})

function checkAnswer() { // When an answer is selected..
    $(correctAnswerButton).click(function () {
        displayCorrectAnswerModal();
        correctScore = correctScore + 1; // Update score
        $("#correct-score-display").text(correctScore); // Push score to HTML
        changeQuestion(); // Change question *** CIRCULAR REFERENCE TO CHANGE QUESTION OR ELSE THIS DOESNT RUN
    });
    $(incorrectAnswer1Button).click(function () {
        displayIncorrectAnswerModal();
        incorrectScore = incorrectScore + 1;
        $("#incorrect-score-display").text(incorrectScore);
        changeQuestion();
    });
    $(incorrectAnswer2Button).click(function () {
        displayIncorrectAnswerModal();
        incorrectScore = incorrectScore + 1;
        $("#incorrect-score-display").text(incorrectScore);
        changeQuestion();
    });
}

function newAJAXRequest() {
    correctMovieInfo();
    incorrectMovieOneInfo();
    incorrectMovieTwoInfo();
}

function changeQuestion() {
    pickRandomMovies();
    pickRandomQuestion();
    newAJAXRequest();
    randomizeAnswerDivs();
}

// ********** COUNTER FUNCTIONS **********
var counter = 0;
var timeLimit = 10;

function convertSeconds(s) {
    var min = Math.floor(s / 60);
    var sec = s % 60;
    if (sec < 10) {
        return min + ":0" + sec;
    }
    return min + ":" + sec;
}

var timerPaused = false;

var timeLeft = timeLimit;
function startTimer() {
    $("#timer-display").text(convertSeconds(timeLimit));
        function counting() {
            counter++;
            timeLeft = timeLimit - counter;
            $("#timer-display").text(convertSeconds(timeLeft));
            if (timeLeft === 0) {
                showTimesUp();
            }
        }
    setInterval(counting, 1000);
}

function resetTimer() {
    counter = 0;
    timeLeft = timeLimit;
    $("#timer-display").text(convertSeconds(timeLeft));
}

// ********** MODAL FUNCTIONS **********
// Modals appear in 3 cases:
//      - At the beginning of a new game
//      - The answer is selected
//      - The question's time limit runs out

// Displays at beginning of new game and calls initializeNewGame function
function newGameModal() {
    $("#new-game-modal-title").text("Welcome to Movie Trivia!");
    $("#new-game-display-text").text("You'll have one minute to answer as many questions as you can. The time begins once you click continue.")
    $("#new-game-modal").modal("show");
}

// Modal to display if time runs out
function showTimesUp() {
    $("#timesup-modal-title").text("You ran out of time!");
    $("#timesup-display-text").text("You got " + correctScore + " questions right and " + incorrectScore + " wrong.");
    $("#timesup-modal").modal("show"); // Displays the modal
    incorrectScore = incorrectScore + 1;
    $("#incorrect-score-display").text(incorrectScore);
}

//Modal to display if correct answer selected
function displayCorrectAnswerModal() {
    $("#correct-answer-modal-title").text("Nice!");
    $("#correct-answer-display-text").text("That was the correct answer.");
    $("#correct-answer-modal").modal("show");
}

//Modal to display if incorrect answer selected
function displayIncorrectAnswerModal() {
    $("#incorrect-answer-modal-title").text("Sorry!");
    $("#incorrect-answer-display-text").text("That was the wrong answer.");
    $("#incorrect-answer-modal").modal("show");
}
// --------------------------------------------------------------

// CALL FUNCTIONS
initializeNewGame();
newGameModal();

// --------------------------------------------------------------

