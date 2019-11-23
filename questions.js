// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions
var questions = [
    {
        question : "Commonly used data types DO NOT include:",
        choiceA : "strings",
        choiceB : "booleans",
        choiceC : "alerts",
        correct : "C"
    },{
        question : "Where is the correct place to insert a JavaScript?",
        choiceA : "head",
        choiceB : "body",
        choiceC : "head and body",
        correct : "B"
    },{
        question : "The condition in an if / else statement is enclosed within ____.",
        choiceA : "quotes",
        choiceB : "parentheses",
        choiceC : "curly brackets",
        correct : "B"
    },

    {
        question : "Inside which HTML element do we put the JavaScript?",
        choiceA : "scripting",
        choiceB : "js",
        choiceC : "script",
        correct : "C"
    }
];

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var TIMER;
var score = 0;

// render a question
function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,7500); // 7500ms = 75s
}

// render progress
function renderProgress(){
    for(var i = 0; i <= lastQuestion; i++){
        progress.innerHTML += "<div class='prog' id="+ i +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).textContent = "Correct";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).textContent = "Wrong";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    
    
   
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















