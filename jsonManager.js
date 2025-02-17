class Quiz {
    constructor() {
        this.questions = null;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.quizData = null;
    }

    loadQuizData() {
        document.getElementById('fileInput').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const contents = e.target.result;
                    const words = contents.split('\n');
                    this.quizData = words;
                };
                reader.readAsText(file);
                document.getElementById('wordTestContainer').style.display = 'block';
                document.getElementById('fileInput').style.display = 'none';
            }
        });
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    nextQuestion() {
        this.currentQuestionIndex++;
    }

    increaseScore() {
        this.score++;
    }
}

const quiz = new Quiz();

document.addEventListener('DOMContentLoaded', function() {
    quiz.loadQuizData();
});

window.onload = function() {
    document.getElementById('wordTestContainer').style.display = 'none';
}

// function displayWord(words, container) {
//     if (words.length > 0) {
//         const word = words[Math.floor(Math.random() * words.length)].trim();
//         document.getElementById('page2_question_word').innerText = word;
//         container.style.display = 'block';
//     }
// }

// function page2_showHint() {
//     // Add logic to show a hint
// }

// function page2_checkAnswer() {
//     const userAnswer = document.getElementById('page2_user_answer').value;
//     const correctAnswer = "Expected answer"; // Add logic to get the correct answer
//     if (userAnswer === correctAnswer) {
//         document.getElementById('page2_correct_answer').innerText = "정답입니다!";
//     } else {
//         document.getElementById('page2_correct_answer').innerText = "오답입니다. 다시 시도해보세요.";
//     }
// }