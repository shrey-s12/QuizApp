const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinking Text Marking Language", correct: false },
        ]
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers: [
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "bgColor", correct: false },
            { text: "background-color", correct: true },
        ]
    },
    {
        question: "Which JavaScript method is used to write on the browser's console?",
        answers: [
            { text: "console.write()", correct: false },
            { text: "console.output()", correct: false },
            { text: "console.log()", correct: true },
            { text: "console.print()", correct: false },
        ]
    },
    {
        question: "What does the 'document.querySelector' method do in JavaScript?",
        answers: [
            { text: "Selects all elements that match a specified CSS selector(s) in the document", correct: false },
            { text: "Selects the first element that matches a specified CSS selector(s) in the document", correct: true },
            { text: "Creates a new element in the document", correct: false },
            { text: "Deletes an element from the documen", correct: false },
        ]
    },
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");
let timer = document.getElementById("timer");
let heading = document.querySelector(".heading")

let currentQuestionIndex;
let score;
let timeLeft;
let time;

function startQuiz() {
    heading.innerHTML = "Simple Quiz";
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestions();
    nextButton.innerHTML = 'Next';
    showQuestion();
}

let shuffleQuestions = () => {
    for (let i = questions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

let startTimer = (duration) => {
    timeLeft = duration;
    timer.innerHTML = `Time Left: ${timeLeft}s`;
    time = setInterval(() => {
        timeLeft--;
        timer.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(time);
            handleNextButton();
        };
    }, 1000);
};


function showQuestion() {
    resetState();
    startTimer(10);
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1} . ${currentQuestion.question}`; //->Show the Question

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });
};

function resetState() {
    clearInterval(time)
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    clearInterval(time);
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        timer.innerHTML = "";
        heading.innerHTML = "Result";
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();