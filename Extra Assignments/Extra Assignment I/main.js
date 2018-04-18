
/*  ========================================================
 *
 *          T-427-WEPO Web Programming II
 *          Reykjavik University
 *          Extra Assignment I: JS Object-Orientation
 *          Part: Main function
 *          Assignment Due: 01.05.2018
 *          Author: Edda Steinunn 
 *
 *  ======================================================== */

$(function () {

    // Triggers game start
    $('#startGameBtn').on('click', function () {


        var questionInput = $(this).prev().children();
        questionInput.removeClass('input-error');
        let numberOfQuestions = parseInt(questionInput.val(), 10);

        // Error - user picks number not in valid range or no input 
        if (questionInput.val() === '' ||  numberOfQuestions > 10 || numberOfQuestions < 1) {

            questionInput.addClass('input-error');
            questionInput.val('');
            questionInput.attr("placeholder", "Please, only 1-10 questions!");

        // Else, prompt user of which types of questions he or she wants
        // When chosen, construct new instance of Game which contains all functionality
        // For this game
        } else {

            $('.entry-screen').addClass('hidden');
            numberOfQuestions = questionInput.val();
            let gameTypeForm = $('#questionType').removeClass('hidden');

            $('#letsGo').on('click', function(evt) {

                let type = $('input[name=questionTypes]:checked').val();
                gameTypeForm.addClass('hidden');
                $('.question-area').removeClass('hidden');
                let game = new Game(numberOfQuestions, type);
                game.fetchNextQuestion();
            });
        } 
    });

});
