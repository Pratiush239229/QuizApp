const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c",
    },
    {
        question: "Which language is primarily used for web development?",
        a: "Python",
        b: "Java",
        c: "JavaScript",
        d: "C++",
        correct: "c",
    },
    {
        question: "What does CSS stand for?",
        a: "Cascading Style Sheets",
        b: "Colorful Style Sheets",
        c: "Computer Style Sheets",
        d: "Creative Style Sheets",
        correct: "a",
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "b",
    },
    {
        question: "What is the largest ocean on Earth?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Arctic Ocean",
        d: "Pacific Ocean",
        correct: "d",
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        a: "Charles Dickens",
        b: "Mark Twain",
        c: "William Shakespeare",
        d: "Jane Austen",
        correct: "c",
    },
    {
        question: "What is the chemical symbol for gold?",
        a: "Au",
        b: "Ag",
        c: "Fe",
        d: "Pb",
        correct: "a",
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        a: "China",
        b: "Japan",
        c: "Thailand",
        d: "South Korea",
        correct: "b",
    },
    {
        question: "What is the smallest prime number?",
        a: "0",
        b: "1",
        c: "2",
        d: "3",
        correct: "c",
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        a: "Oxygen",
        b: "Carbon Dioxide",
        c: "Nitrogen",
        d: "Hydrogen",
        correct: "b",
    },
];

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <label><input type="radio" name="answer" value="a"> ${currentQuestion.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentQuestion.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentQuestion.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentQuestion.d}</label><br>
    `;
   
}

function getSelectedAnswer() {
    const answers = document.querySelectorAll('input[name="answer"]');
    for (const answer of answers) {
        if (answer.checked) {
            return answer.value;
        }
    }
    return null;
}

function submitQuiz() {
    const answer = getSelectedAnswer();
    if (answer) {
        const currentQuestion = quizData[currentQuestionIndex];
        const feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedback');
        

        // Check if the answer is correct
        if (answer === currentQuestion.correct) {
            score++;
            feedbackContainer.innerHTML = `<span style="color: green;">Correct!</span>`;
        } else {
            feedbackContainer.innerHTML = `<span style="color: red;">Incorrect!</span>`;
        }

        // Highlight the correct answer
        const correctAnswerLabel = document.querySelector(`input[value="${currentQuestion.correct}"]`).parentElement;
        correctAnswerLabel.style.color = "green"; // Highlight correct answer

        if (answer !== currentQuestion.correct) {
            const selectedAnswerLabel = document.querySelector(`input[value="${answer}"]`).parentElement;
            selectedAnswerLabel.style.color = "red"; // Highlight incorrect answer
        }

        quizContainer.appendChild(feedbackContainer);

        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            setTimeout(() => {
                loadQuestion();
                feedbackContainer.remove(); // Remove feedback after loading next question
            }, 2000); // Wait 2 seconds before loading the next question
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer!");
    }
}

function showResult() {
    quizContainer.innerHTML = "";
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.innerHTML = "";
    loadQuestion();
}

// Event Listeners
submitButton.addEventListener("click", submitQuiz);
resetButton.addEventListener("click", resetQuiz);

// Load the first question
loadQuestion();