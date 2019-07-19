
const gameQuestions = [
    {
        question: "What is my full name?",
        choices: ["Lockridge", "Justin Lockridge", "Michael Lockridge", "Thomas"],
        correctAnswer: "Justin Lockridge"


    },


    {
        question: "What is your favorite sport?",
        choices: ["Basketball", "Track and Field", "Soccer", "Football"],
        correctAnswer: "Football"


    },

    {
        question: "What town did you grow up in?",
        choices: ["Greenville", "Dallas", "Las Vegas", "Plano"],
        correctAnswer: "Greenville"


    }
];

const funImages = [
    './assets/images/win1.gif',
    './assets/images/win2.gif',
    './assets/images/win3.gif'
];

const sadImages = [
    './assets/images/loss1.gif',
    './assets/images/loss2.gif',
    './assets/images/loss3.gif'
];


// Initial values
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;


function nextQuestion() {

    const isQuestionOver = (gameQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // TODO
        console.log('Game over!!!');
        displayResult();
    } else {

        currentQuestion++;
        loadQuestion();
    }

}


// Start a 30 second timer to respond or choose an answer

function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}
// Display the question and the answer choices

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = gameQuestions[currentQuestion].question;
    const choices = gameQuestions[currentQuestion].choices;

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    var result = '';

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = gameQuestions[currentQuestion].correctAnswer;
    if (correctAnswer === selectedAnswer) {
        // User wins
        score++;
        console.log('Wins!!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);

    } else {
        lost++;
        console.log('Lost!!');
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }


    console.log('Yes', selectedAnswer);
});;

function displayResult() {
    const result = `
        <p>You get ${score} questions(s) right </p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${gameQuestions.length} questions(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;
    $('#game').html(result);
}

$(document).on('click', '#reset', function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();

});


function loadRemainingQuestion() {
    const remainingQuestion = gameQuestions.length - (currentQuestion + 1);
    const totalQuestion = gameQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}

function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}

function preloadImage(status) {
    const correctAnswer = gameQuestions[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
            <p class ="preload-image">Congratulations, you win!</p>
            <p class ="preload-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(funImages)}"/>
        `);
    } else {
        $('#game').html(`
            <p class ="preload-image">Loser!!!</p>
            <p class ="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <img src="${randomImage(sadImages)}"/>
        `);
    }
}

$('#start').click(function () {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});;