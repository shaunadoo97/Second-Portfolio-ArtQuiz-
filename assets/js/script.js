const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function gameStart() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    startTimer(timeValue);
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    try {
       nextButton.style.display = "none"
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
        }  
    } catch (err) {
        alert(err.message);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correctAns = selectedBtn.dataset.correct === "true";
    if (correctAns) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong")
    }
    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showResults() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        gameStart();
    }
})

function startTimer(time) {
    counter = setInterval(timer, 1000)

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        /**To Reveal answer when Time is up. */
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            selectAnswer();
        }
    }
}

    /**Adding in the Art Questions */
    const questions = [{
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

    gameStart();