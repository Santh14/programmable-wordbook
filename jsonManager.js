class WordManager {
    constructor() {
        this.quizData = {};

        this.jsonFileInput = null;
    }

    getQuiz() {
        /* get user's filter and send keys to Quiz object
            suppose the filter function is implemented named 'filterData'
            now, beacuse the filterData is not implemented yet,
                return shuffled keys that have tags empty.
         */

        const retData = {};
        shuffle(Object.keys(this.quizData)).map((key) => {
            if (this.quizData[key]['tag'].length === 0) {
                retData[key] = this.quizData[key];
            }
        });
        return retData;
    }

    onload() {
        this.jsonFileInput = document.getElementById('fileInput');
    }
}

class Quiz {
    constructor() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.quizData = {};
        this.quizDataKeys = [];
        this.isCorrect = [];
        this.currentState = 'question';
        // state: 'question', 'answer', 'end'

        this.correctKey = 'Enter';
        this.incorrectKey = 'q';

        this.fileNotUploadedMessageElement = null;
        this.questionWordElement = null;
        this.userAnswerElement = null;
        this.correctAnswerElement = null;
        this.wordTestContainer = null;
        this.wordTestResult = null;
    }
    
    start() {
        this.quizData = wordManager.getQuiz();
        this.quizDataKeys = Object.keys(this.quizData);
        this.isCorrect = new Array(this.quizDataKeys.length).fill(false);
        this.currentQuestionIndex = 0;
        this.score = 0;
        
        this.fileNotUploadedMessageElement.style.display = 'none';
        this.wordTestContainer.style.display = 'block';

        this.displayWord();
    }

    end() {
        // Todo
        // return results to wordManager

        this.wordTestContainer.style.display = 'none';
        this.wordTestResult.style.display = 'block';
        this.wordTestResult.textContent = `Your score is ${this.score}/${this.quizDataKeys.length}.`;
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
        if (this.currentQuestionIndex === this.quizDataKeys.length) {
            this.end();
        }
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
        this.fileNotUploadedMessageElement = document.getElementById('fileNotUploadedMessage');
        this.questionWordElement = document.getElementById('questionWord');
        this.userAnswerElement = document.getElementById('userAnswer');
        this.correctAnswerElement = document.getElementById('correctAnswer');
        this.wordTestContainer = document.getElementById('wordTestContainer');
        this.wordTestResult = document.getElementById('wordTestResultContainer');

        this.wordTestContainer.style.display = 'none';
    }
}

const quiz = new Quiz();
const wordManager = new WordManager();

function eventHandler() {
    // page1 event handler
    document.getElementById('fileInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                wordManager.quizData = JSON.parse(contents);
            };
            reader.readAsText(file);
            document.getElementById('startTest').style.display = 'block';
        }
    });

    document.getElementById('startTest').addEventListener('click', () => {
        quiz.start();
    });

    // page2 event handler
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
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = function() {
    quiz.onload();
    eventHandler();
};