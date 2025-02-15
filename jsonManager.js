class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.quizData = null;
    }

    loadQuizData() {
        /* json 파일을 올리는 페이지에서 json 파일을 감지하면
            json 파일을 읽어서 quizData에 저장한다.
        */
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