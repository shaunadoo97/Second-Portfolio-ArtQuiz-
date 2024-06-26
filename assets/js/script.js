/**Credits to Web Dev, Coding Nepal, Ali Aslan for javascript and functionality of my quiz game*/
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const startTest = document.getElementById('intro');
const questionContainerElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-btns');
const timeCount = document.getElementById("count_down");

/**Credits to Web Dev simplified to start the Quiz*/
document.addEventListener("DOMContentLoaded", startButton);

let shuffledQuestions, currentQuestionIndex;
let timerInterval;
let counter;
let timeValue = 10;
let que_count = 1;
let userScore = 0;


startButton.addEventListener('click', gameStart);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    clearInterval(timerInterval);
    setNextQuestion();
});

/**Starting game function */
function gameStart() {
    console.log("Game Started!")
    startTest.classList.add("hide");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

/**Getting Next function */
function setNextQuestion() {
    resetState();
    if (que_count < 11) {
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion(shuffledQuestions[currentQuestionIndex]);
            clearInterval(counter);
            startTimer(timeValue);
        } else {
            startTest.classList.remove("hide");
            showResults();
        }
        que_count++;
/**Display in Console.log to how quiz has been completed */
    } else {
        showResults();
        console.log("Quiz ended")
    }
}

/**Displaying questions*/
/**Credits to both GreatStack and Web Dev */
function showQuestion(question) {
    questionElement.innerText = question.question;
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + question.question;
    answerButtonsElement.innerHTML = "";
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    
}

/**Credits to CodeNepal*/
const resultBox = document.getElementById("result_box");
const restartQuiz = document.getElementById("restart");
const leaveGame = document.getElementById("leave");

/**To display how many questions have been answered. */
function showResults() {
    questionContainerElement.classList.add("hide");
    resultBox.classList.remove("hide");
    const scoreText = document.getElementById("score_test");

/**Message for the User, credits to CodeNepal messages*/
    if (userScore > 8) {
        let scoreTag = "<span> Congrats! you got <p>" + userScore + "</p> out of <p>" + shuffledQuestions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 5) {
        let scoreTag = "<span> Close, you got <p>" + userScore + "</p> out of <p>" + shuffledQuestions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 3) {
        let scoreTag = "<span> Good attempt, you got <p>" + userScore + "</p> out of <p>" + shuffledQuestions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = "<span> Sorry, you got only <p>" + userScore + "</p> out of <p>" + shuffledQuestions.length + "</p></span>";
        scoreText.innerHTML = scoreTag;
    }
    resetState();
}

/**Restart the game completely and reset data/timer when replay button is clicked */
restartQuiz.onclick = () => {
   resultBox.classList.add("hide");
   startTest.classList.remove("hide");
   currentQuestionIndex = 0;
   que_count = 0;
   userScore = 0;
   timeCount.textContent = 10;
   clearInterval(counter);
   resetState();
   gameStart();
};

/**Leave the Game completely when leave button is clicked*/
leaveGame.onclick = () => {
    window.location.reload();
};

function resetState() {
    try {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    } catch (err) {
        alert(err.message);
    }
}
/**Credits to Web Dev simplified */
/**Selecting answer to reveal correct/wrong questions and updating ScoreBoard*/
function selectAnswer(e) {
    clearInterval(counter);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        userScore++; 
        console.log(userScore);
    } else {
        console.log("Answer is incorrect");
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener("click", selectAnswer);
        setStatusClass(button, button.dataset.correct);
    });
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = "Results";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) { 
        element.classList.add("correct"); 
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

/**Credits to CodeNepal help with the timer*/
/**Timer function */
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            correctAns();
        }
    }

    /**Reveal answer when timer is up and next button displays*/
    function correctAns() {
        const correctBtn = Array.from(answerButtonsElement.children).find(button => button.dataset.correct === 'true');
        if (correctBtn) {
            setStatusClass(correctBtn, true);
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            button.removeEventListener("click", selectAnswer);
        });
        nextButton.classList.remove("hide");
    }

}

/**Adding in the Art Questions */
const questions = [
    {
        question: 'Which artist is famous for his series of paintings featuring water lilies?',
        answers: [{
                text: 'Claude Monet',
                correct: true
            },
            {
                text: ' Diego Velázquez',
                correct: false
            },
            {
                text: 'Peter Paul Rubens',
                correct: false
            },
            {
                text: 'Caravaggio',
                correct: false
            },
        ]

    },
    {
        question: 'Who painted the famous "Mona Lisa"?',
        answers: [{
                text: 'Donatello',
                correct: false
            },
            {
                text: 'Leonardo da Vinci',
                correct: true
            },
            {
                text: 'Michelangelo',
                correct: false
            },
            {
                text: 'Raphael',
                correct: false
            },
        ]

    },
    {
        question: 'Which artist famously cut off his own ear?',
        answers: [{
                text: 'Rembrandt',
                correct: false
            },
            {
                text: 'Pablo Picasso',
                correct: false
            },
            {
                text: 'Vincent Van Gogh',
                correct: true
            },
            {
                text: 'Johannes Vermeer',
                correct: false
            },
        ]

    },
    {
        question: 'Who is the artist behind the "Sistine Chapel Ceiling" frescoes in Vatican City?',
        answers: [{
                text: 'Caravaggio',
                correct: false
            },
            {
                text: 'Lorenzo Ghiberti',
                correct: false
            },
            {
                text: 'Filippo Brunelleschi',
                correct: false
            },
            {
                text: 'Michelangelo',
                correct: true
            },
        ]

    },
    {
        question: 'Which art movement is known for its use of vibrant colors and swirling shapes?',
        answers: [{
                text: 'Cubism',
                correct: false
            },
            {
                text: 'Impressionism',
                correct: true
            },
            {
                text: 'Surrealism',
                correct: false
            },
            {
                text: 'Precisionism',
                correct: false
            },
        ]

    },
    {
        question: 'Which Dutch painter is famous for his realistic and detailed portraits, including "Girl with a Pearl Earring"?',
        answers: [{
                text: 'Edgar Degas',
                correct: false
            },
            {
                text: 'Caravaggio',
                correct: false
            },
            {
                text: 'Johannes Vermeer',
                correct: true
            },
            {
                text: 'Rembrandt',
                correct: false
            },
        ]

    },
    {
        question: 'Who painted "Starry Night," a famous depiction of swirling stars and a bright crescent moon?',
        answers: [{
                text: 'Salvador Dalí',
                correct: false
            },
            {
                text: 'Jeff Koons',
                correct: false
            },
            {
                text: 'Pablo Picasso',
                correct: false
            },
            {
                text: 'Vincent Van Gogh',
                correct: true
            },
        ]

    },
    {
        question: 'Who painted "The Birth of Venus," depicting the goddess Venus emerging from the sea on a scallop shell?',
        answers: [{
                text: 'Andrea del Verocchio',
                correct: false
            },
            {
                text: 'Sandro Botticelli',
                correct: true
            },
            {
                text: 'Giovanni Bellini',
                correct: false
            },
            {
                text: 'Giorgione',
                correct: false
            },
        ]

    },
    {
        question: 'What is the term for a style of art characterized by exaggerated or distorted features, often used for satirical or comedic effect?',
        answers: [{
                text: 'Abstract',
                correct: false
            },
            {
                text: 'Pop Art',
                correct: false
            },
            {
                text: 'Caricature',
                correct: true
            },
            {
                text: 'Contemporary',
                correct: false
            },
        ]

    },
    {
        question: 'Who sculpted the famous statue of David?',
        answers: [{
                text: 'Raphael',
                correct: false
            },
            {
                text: 'Donatello',
                correct: false
            },
            {
                text: 'Lorenzo Ghiberti',
                correct: false
            },
            {
                text: 'Michelangelo',
                correct: true
            },
        ]
    },
];