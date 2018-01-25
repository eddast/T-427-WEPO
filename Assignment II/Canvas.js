
/*  ========================================================
 *
 *      T-427-WEPO Web Programming II
 *      Reykjavik University
 *      Assignment 2: DrawioJS
 *      Part: Main functionlity
 *      Assignment Due: 04.02.2018
 *      Authors:
 *              Darri Valgarðsson,
 *              Edda Steinunn
 *
    ======================================================== */

$(document).ready(function(){

    // 'Global' scope variables
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let toolbarColor =  $(".icons").css("background-color");
    let isPainting = false;
    let startx = 0; let starty = 0;
    let strokeColor; let fillColor;
    let drawables = [];
    

    // Sets up colors and color picker
    $("#strokeColor").spectrum({
        color: strokeColor,
        preferredFormat: "hex",
        move: function(newColor) { updateStrokeColor(newColor.toString()); }
    }); 

    $("#fillColor").spectrum({
        color: fillColor,
        preferredFormat: "hex",
        move: function(newColor) { updateFillColor(newColor.toString()); }
    });

    let updateStrokeColor = (function (newColor){
        strokeColor = newColor;
        context.strokeStyle = strokeColor;
        $("#strokeColor").css("background-color", strokeColor);
    });
    let updateFillColor = (function(newColor){
        fillColor = newColor
        context.fillStyle = fillColor;
        $("#fillColor").css("background-color", fillColor);
    });

    updateStrokeColor('#25323A');
    updateFillColor('#fc295af3');

    $('#changeColorsBtn').click(function(e){
        let tmpStrokeColor = strokeColor;
        updateStrokeColor(fillColor);
        updateFillColor(tmpStrokeColor);
    });

    // Functions to "override" by methods
    let mousedownAction = (function(e){});
    let mouseupAction = (function(e){} );
    let mousemoveAction = (function(e){});

    // Selecting icons will cause them to appear selected
    $(".icons").click(function(e) { makeIconLookSelected("#" + e.target.id); });
    let makeIconLookSelected = (function (iconid) {
        $(".icons").css("background-color", toolbarColor);
        $(iconid).css("background-color", '#9c7f7f');
    });

    // Lets option bar show relevant properties based on toShow tool
    let optimizeOptionBar = (function(toShow) {
        $(".options").addClass("keepHidden");
        $(toShow).removeClass("keepHidden");
    });

    $(".slider").oninput = function() {
        console.log("hello there");
        var slider = document.getElementById("lineWidthSlider");
        var display = document.getElementById("lineWidthDisplay");
        display.innerHTML += slider.value;
      }

    // User clicks the draw tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#drawTool").click(function(e) {
        optimizeOptionBar(".odraw");
    });

    // User clicks the line tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#lineTool").click(function(e) {

        optimizeOptionBar(".oline");
        let line;

        mousedownAction = (function(e) {

            isPainting = true;
            startx = e.pageX - canvas.offsetLeft;
            starty = e.pageY - canvas.offsetTop;
            line = new Line (startx, starty, strokeColor, fillColor);
            drawables.push(line);
        });

        mousemoveAction = (function(e) {
            
            if(isPainting === true) {
                let curr_x = e.pageX - canvas.offsetLeft;
                let curr_y = e.pageY - canvas.offsetTop;
                line.endCoordinates(curr_x, curr_y);
                drawCanvas();
            }
        });

        mouseupAction = (function(e) { isPainting = false; }); 
    });

    // User clicks the circle tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#circleTool").click(function(e) {
        optimizeOptionBar(".orect");
        let circle;

        mousedownAction = (function(e) {

            isPainting = true;
            startx = e.pageX - canvas.offsetLeft;
            starty = e.pageY - canvas.offsetTop;
            circle = new Circle (startx, starty, strokeColor, fillColor);
            drawables.push(circle);
        });

        mousemoveAction = (function(e) {
            
            if(isPainting === true) {
                let curr_x = e.pageX - canvas.offsetLeft;
                let curr_y = e.pageY - canvas.offsetTop;
                circle.endCoordinates(curr_x, curr_y);
                drawCanvas();
            }
        });

        mouseupAction = (function(e) { isPainting = false; }); 
    });

    // User clicks the circle tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#rectTool").click(function(e) {

        optimizeOptionBar(".orect");
        let rect;

        mousedownAction = (function(e) {

            isPainting = true;
            startx = e.pageX - canvas.offsetLeft;
            starty = e.pageY - canvas.offsetTop;
            rect = new Rect (startx, starty, strokeColor, fillColor);
            drawables.push(rect);
        });

        mousemoveAction = (function(e) {
            
            if(isPainting === true) {
                let curr_x = e.pageX - canvas.offsetLeft;
                let curr_y = e.pageY - canvas.offsetTop;
                rect.endCoordinates(curr_x, curr_y);
                drawCanvas();
            }
        });

        mouseupAction = (function(e) { isPainting = false; }); 
    });

    // User clicks the circle tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#textTool").click(function(e) {
        optimizeOptionBar(".otext");
        mousedownAction = defaultMousedownAction;
        mousemoveAction = (function(e) {});
        mouseupAction = (function(e) {
            drawText ("BITCH", startx-30, starty-30, "Georgia", 30, true, false);
        });
    });
    
    $("#canvas").mousemove(function(e) { mousemoveAction(e, this); });
    $("#canvas").mouseup(function(e) { mouseupAction(e, this); });
    $("#canvas").mousedown(function(e) { mousedownAction(e, this); });


    // Default mousedown action marks the start coordinates
    // And initiates the user painting state
    let defaultMousedownAction = (function(e){
        isPainting = true;
        firstStroke = true;
        startx = e.pageX - canvas.offsetLeft;
        starty = e.pageY - canvas.offsetTop;
    });

    let drawCanvas = (function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        let temp_pColor = context.strokeStyle;
        let temp_sColor = context.fillStyle;
        drawables.forEach(element => {
            element.draw(context);
        });

        context.strokeStyle = temp_pColor;
        context.fillStyle = temp_sColor;
    });

});