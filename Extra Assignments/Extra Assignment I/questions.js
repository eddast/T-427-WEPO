
/*  ========================================================
 *
 *          T-427-WEPO Web Programming II
 *          Reykjavik University
 *          Extra Assignment I: JS Object-Orientation
 *          Part: Question JS Objects
 *          Assignment Due: 01.05.2018
 *          Author: Edda Steinunn 
 *
 *  ======================================================== */



/************************************************************
 *                  BASE CLASS QUESTION
 *  implements displayQuestion() and answerQuestion()
 *************************************************************/

function Question (question) {
    this.question = question.question;
    this.answer = question.answer;
}

// Returns true or false depending on answer provided
// Returns feedback irregardless
Question.prototype.answerQuestion = function (answer) {
    if(answer === String(this.answer)) {
        $('#feedback').text('Correct :)');
    } else {
        $('#feedback').text('Incorrect :(');
        $('#correct-feedback').text('correct answer is ' + String(this.answer));
    }
    return answer === String(this.answer);
};

// Displays questions
// Sets up choices which is a 'pure virtual' function in base,
// i.e. implemented individually by children
Question.prototype.displayQuestion = function () {
    $('#question').text(this.question);
    this.displayChoices();
};


// 'Pure virtual' function implemented by children
Question.prototype.displayChoices = function () {};



/************************************************************
 *                  MULTIPLE CHOICE QUESTION
 *************************************************************/

function MultipleChoice(multiChoiceQuestion) { 
    Question.call(this, multiChoiceQuestion);
    this.options = multiChoiceQuestion.options;
}
MultipleChoice.prototype = Object.create(Question.prototype);
MultipleChoice.prototype.constructor = MultipleChoice;

// Gets all choices from options, appends them as radio buttons to html
MultipleChoice.prototype.displayChoices = function() {
    let choices = "";
    inputBase = '<input type="radio" name="question-choice"'
    for(let i = 0; i < this.options.length; i++) {
        choices += inputBase + 'value="' + this.options[i].key + '"';
        if(i===0)   { choices += ' checked>'; }
        else        { choices += ' >'; }
        choices += this.options[i].key + ". " + this.options[i].value + '<br>';
    }
    $('.question-choices').html(choices);
}

/************************************************************
 *                  TRUE OR FALSE QUESTIONS
 *************************************************************/

function TrueOrFalse(trueOrFalseQuestion) { 
    Question.call(this, trueOrFalseQuestion);
}
TrueOrFalse.prototype = Object.create(Question.prototype);
TrueOrFalse.prototype.constructor = TrueOrFalse;

// Sets up options as radio buttons, either true or false
// Appends options to html
TrueOrFalse.prototype.displayChoices = function() {
    $('.question-choices').html('<input type="radio" name="question-choice" value="true" checked>true<br><input type="radio" name="question-choice" value="false">false<br>');
}

/************************************************************
 *                  SHORT ANSWER QUESTIONS
 *************************************************************/
function ShortAnswer(shortAnswerQuestion) {
    Question.call(this, shortAnswerQuestion);
}
ShortAnswer.prototype = Object.create(Question.prototype);
ShortAnswer.prototype.constructor = ShortAnswer;

// Sets up option which in this case is written,
// meaning we display input box
ShortAnswer.prototype.displayChoices = function() {
    $('.question-choices').html('<input name="question-choice" class="form-control input-small" type="text" placeholder="your answer here" checked>');
}