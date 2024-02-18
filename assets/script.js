const questions = [
    {
        question: "Which is largest mammal in the world?",
        answers: [
            {text: "shark" , correct: false},
            {text: "blue whale" , correct: true},
            {text: "elephant" , correct: false},
            {text: "giraffe" , correct: false},
        ]
    },
    {
        question: "Which is smallest mammal in the world?",
        answers: [
            {text: "mouse" , correct: true},
            {text: "blue whale" , correct: false},
            {text: "elephant" , correct: false},
            {text: "giraffe" , correct: false},
        ]
    },
];

const questionElement = document.getElementById("questions"); 
const answerElement = document.getElementById("answer-btns"); 
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo = "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButton.appendChild(button);
    });
}

startQuiz();