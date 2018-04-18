/*  ========================================================
 *
 *          T-427-WEPO Web Programming II
 *          Reykjavik University
 *          Extra Assignment I: JS Object-Orientation
 *          Part: Game Give Me An Answer!™ functionality
 *          Assignment Due: 01.05.2018
 *          Author: Edda Steinunn 
 *
 *  ======================================================== */

// Three possible game question types restrictions
// If none apply, any type of questions are set
const MULTIPLE_CHOICE = 'multiple';
const SHORT_ANSWERS = 'short';
const TRUE_FALSE = 'tf'

/* Game prototype object
 * Conducts all logic for game
 * Changes question, maintains current question, sets up game from question type etc */
function Game (questionsRemaining, type) {

    this.totalQuestions = questionsRemaining;
    this.questionsRemaining = questionsRemaining;
    this.questions = [];
    this.currentQuestion = null;
    this.points = 0;

    // Extract all questions from resources
    // Make them a question object
    let multipleChoiceQuestions = window.giveMeAnAnswer.qna.multiple;
    let shortAnswerQuestions = window.giveMeAnAnswer.qna.shortAnswer;
    let trueOrFalseQuestions = window.giveMeAnAnswer.qna.trueorfalse;
    for (let i = 0; i < multipleChoiceQuestions.length; i++)
        multipleChoiceQuestions[i] = new MultipleChoice (multipleChoiceQuestions[i]);
    for (let i = 0; i < shortAnswerQuestions.length; i++)
        shortAnswerQuestions[i] = new ShortAnswer (shortAnswerQuestions[i]);
    for (let i = 0; i < trueOrFalseQuestions.length; i++)
        trueOrFalseQuestions[i] = new TrueOrFalse (trueOrFalseQuestions[i]);

    // Construct question sets from game type
    // (which are what types of questions user wants)
    switch(type) {
        case MULTIPLE_CHOICE:
            this.questions = multipleChoiceQuestions; break;
        case SHORT_ANSWERS:
            this.questions = shortAnswerQuestions; break;
        case TRUE_FALSE:
            this.questions = trueOrFalseQuestions; break;
        default: // any type of question
            this.questions = this.questions.concat( multipleChoiceQuestions,
                                                    shortAnswerQuestions,
                                                    trueOrFalseQuestions);
    }
}

// Set constructor for object prototype
Game.prototype.constructor = Game;

// Set event handler to handle user navigating to next question
Game.prototype.setEventHandlerForNextAns = function () {

    $('#answerBtn').on('click', () => {

        // Hide answer button and clear timeout values
        $('.answerBtn').addClass('hidden');
        clearTimeout(this.timeout);
        clearInterval(this.countdown);

        // Decrement questions remaining
        this.questionsRemaining = this.questionsRemaining-1;
        $('#questionsRemaining').text('Questions remaining: ' + this.questionsRemaining);

        // Extract answer from choices
        let answer = $('input[name=question-choice]:checked').val();
        if(answer === undefined) { answer = $('input[name=question-choice]').val(); }
        $('.feedback-area').removeClass('hidden');
        
        // Have question "answer itself" with user given answer,
        // if correct increment points
        if(this.currentQuestion.answerQuestion(answer)) { this.points = this.points + 1; }

        // If all questions have been answer, show user score
        if(this.questionsRemaining <= 0) {
            $('.feedback-next').addClass('hidden');
            $('.feedback-done').removeClass('hidden');
            $('#user-score').text( $('#user-score').text() + this.points + ' out of ' + this.totalQuestions);
        }

        // Fetch next question when user is ready, i.e. clicks next question button
        $('#nextQuestion').on('click', () => {
            $('.feedback-area').addClass('hidden');
            $('#feedback').text('');
            $('#correct-feedback').text('');
            this.fetchNextQuestion();
        });
    });
}

// Fetches next question for user
Game.prototype.fetchNextQuestion = function () {

    // Remove any lingering onclick handlers in case
    // Restore answer button now that new question is active
    $('#answerBtn').off('click');
    $('#nextQuestion').off('click');
    $('.answerBtn').removeClass('hidden');

    // Countdown feedback for remaining time for question
    // Set timeout for current question
    let timeLeft = 20; $('#timeLeft').text('time remaining ' + timeLeft + 's');
    this.setEventHandlerForNextAns();
    this.countdown = setInterval(() => {
        timeLeft=timeLeft-1;
        $('#timeLeft').text('time remaining ' + timeLeft + 's');
    }, 1000);
    this.timeout = setTimeout(() => { $('#answerBtn').trigger('click'); }, 20000);

    // Reset html in case
    $('#question').text(''); $('.question-choices').html('');

    // Select random question and have it display itself
    let allQuestions = this.questions.length;
    let displayQuestion = Math.floor(Math.random() * allQuestions);
    this.currentQuestion = this.questions[displayQuestion];
    this.currentQuestion.displayQuestion();
};