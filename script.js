const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const startTest = document.getElementById('test')
const questionContainerElement = document.getElementById('quiz')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns') 


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', gameStart)
nextButton.addEventListener('click', ()=> {
    currentQuestionIndex++
    setNextQuestion()
})

function gameStart() {
   
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
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
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
 if(shuffledQuestions.length > currentQuestionIndex + 1 ) {
    nextButton.classList.remove('hide')
 } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
 }
 
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which artist is famous for his series of paintings featuring water lilies?',
        answers: [
            { text: 'Claude Monet', correct: true},
            {text: ' Diego Velázquez', correct: false},
            {text: 'Peter Paul Rubens', correct: false},
            {text: 'Caravaggio', correct: false},
        ]
        
    },
    {
        question: 'Who painted the famous "Mona Lisa"?',
        answers: [
            { text: 'Donatello', correct: false},
            {text: 'Leonardo da Vinci', correct: true},
            {text: 'Michelangelo', correct: false},
            {text: 'Raphael', correct: false},
        ]
        
    },

    {
        question: 'Which artist famously cut off his own ear?',
        answers: [
            { text: 'Rembrandt', correct: false},
            {text: 'Pablo Picasso', correct: false},
            {text: 'Vincent Van Gogh', correct: true},
            {text: 'Johannes Vermeer', correct: false},
        ]
        
    }
]
const myTimeout = setTimeout(gameOver, 10000);

function gameOver() {
    document.getElementById("timer").innerHTML = "Time ran out!"
}

function myStopFunction() {
    clearTimeout(myTimeout);
}