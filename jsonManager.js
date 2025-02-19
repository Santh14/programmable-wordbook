class Quiz {
    constructor() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.quizData = {};
        this.quizDataKeys = [];
        this.isCorrect = [];
        this.currentState = 'start';
        // state: 'start', 'question', 'answer', 'end'

        this.correctKey = 'Enter';
        this.incorrectKey = 'q';

        this.jsonFileInput = null;
        this.questionWordElement = null;
        this.userAnswerElement = null;
        this.correctAnswerElement = null;
        this.wordTestContainer = null;
    }
    
    start() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isCorrect = new Array(this.quizDataKeys.length).fill(false);
        this.quizDataKeys = Object.keys(this.quizData);

        this.wordTestContainer.style.display = 'block';
        this.jsonFileInput.style.display = 'none';

        this.displayWord();
    }

    getCurrentQuestion() {
        return this.quizDataKeys[this.currentQuestionIndex];
    }

    displayWord() {
        this.questionWordElement.textContent = this.getCurrentQuestion();
    }

    displayCorrectAnswer() {
        this.currentState = 'answer';
        this.correctAnswerElement.style.display = 'block';
        this.correctAnswerElement.textContent = this.quizData[this.getCurrentQuestion()]['meaning'];
    }

    hideCorrectAnswer() {
        this.correctAnswerElement.style.display = 'none';
    }

    nextQuestion() {
        this.currentQuestionIndex++;
    }

    increaseScore() {
        this.score++;
    }

    eraseUserAnswer() {
        this.userAnswerElement.value = '';
    }

    setCorrect() {
        this.isCorrect[this.currentQuestionIndex] = true;
        this.increaseScore();
        this.hideCorrectAnswer();
        this.eraseUserAnswer();
        this.currentState = 'question';
        this.nextQuestion();
        this.displayWord();
    }

    setIncorrect() {
        this.isCorrect[this.currentQuestionIndex] = false;
        this.hideCorrectAnswer();
        this.eraseUserAnswer();
        this.currentState = 'question';
        this.nextQuestion();
        this.displayWord();
    }

    onload() {
        this.questionWordElement = document.getElementById('questionWord');
        this.userAnswerElement = document.getElementById('userAnswer');
        this.correctAnswerElement = document.getElementById('correctAnswer');
        this.wordTestContainer = document.getElementById('wordTestContainer');
        this.jsonFileInput = document.getElementById('fileInput');

        this.wordTestContainer.style.display = 'none';
    }
}

const quiz = new Quiz();

function page2eventHandler() {
    document.getElementById('fileInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                quiz.quizData = JSON.parse(contents);
                quiz.start();
            };

            reader.readAsText(file);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (quiz.currentState === 'question' && event.key === 'Enter') {
            quiz.displayCorrectAnswer();
        } else if (event.ctrlKey && event.key === quiz.correctKey && quiz.currentState === 'answer') {
            event.preventDefault();
            quiz.setCorrect();
        } else if (event.ctrlKey && event.key === quiz.incorrectKey && quiz.currentState === 'answer') {
            event.preventDefault();
            quiz.setIncorrect();
        }
    });  

    quiz.userAnswerElement.addEventListener('input', quiz.displayCorrectAnswer);
}

window.onload = function() {
    quiz.onload();
    page2eventHandler();
};