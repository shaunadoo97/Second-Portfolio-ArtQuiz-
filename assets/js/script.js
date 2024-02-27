/**Credits to Web Dev Simplified for guidance on Javascript */

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const startTest = document.getElementById('intro');
const questionContainerElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-btns');
let score = 1;


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', gameStart)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function gameStart() {
    startTest.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    try {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    } catch (err) {
        alert(err.message)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener("click", selectAnswer);
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        score++;
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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




]

const myTimeout = setTimeout(gameOver, 10000);

function gameOver() {
    document.getElementById("timer").innerHTML = "Time ran out!"
}

function myStopFunction() {
    clearTimeout(myTimeout);
}