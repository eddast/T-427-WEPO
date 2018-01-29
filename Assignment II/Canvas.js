
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
    let undo = [];
    

    /*********************************
     * SET UP COLORS AND COLOR PICKERS
     ********************************/
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
    updateFillColor('#fc295a');

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
        $(".valueDisplay").addClass("keepHidden");
        $("#textPreview").addClass("keepHidden");
        $(toShow).removeClass("keepHidden");
    });

    $(".slider").oninput = function() {

        var slider = document.getElementById("lineWidthSlider");
        var display = document.getElementById("lineWidthDisplay");
        display.innerHTML += slider.value;
      }

      $("#undo").click(function(e) {

          if(drawables.length !== 0){
              let shape = drawables.pop();
              undo.push(shape);
              drawCanvas();
          }
      })

      $("#redo").click(function(e) {

        if(undo.length !== 0){
            let shape = undo.pop();
            drawables.push(shape);
            drawCanvas();
        }
    })

    $("#clear").click(function(e) {

        while(drawables.length !== 0){
            drawables.pop();
        }
        while(undo.length !== 0){
            undo.pop();
        }
        drawCanvas();
  })

    // User clicks the draw tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#drawTool").click(function(e) {

        optimizeOptionBar(".odraw");
        let freeDraw;

        mousedownAction = (function(e) {

            isPainting = true;
            startx = e.pageX - canvas.offsetLeft;
            starty = e.pageY - canvas.offsetTop;
            freeDraw = new FreeForm (startx, starty, strokeColor, fillColor, context.lineWidth);
            drawables.push(freeDraw);
            drawCanvas();
        });

        mousemoveAction = (function(e) {

            if (isPainting === true) {

              let curr_x = e.pageX - canvas.offsetLeft;
              let curr_y = e.pageY - canvas.offsetTop;
              freeDraw.endCoordinates(curr_x, curr_y);
              drawCanvas();
            }
        });

        mouseupAction = (function(e) { isPainting = false; });
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
            line = new Line (startx, starty, strokeColor, fillColor, context.lineWidth);
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
            circle = new Circle (startx, starty, strokeColor, fillColor, context.lineWidth);
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
            rect = new Rect (startx, starty, strokeColor, fillColor, context.lineWidth);
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
        let text;

        mousedownAction = (function(e) {
            if(!isPainting) {
                isPainting = true;
                startx = e.pageX - canvas.offsetLeft;
                starty = e.pageY - canvas.offsetTop;
                text = new Text (startx, starty, strokeColor, fillColor, context.font, context);
                drawables.push(text);
                isPainting = false;
            }
            $("#upperBars").mousedown(function(e) {
                let textInput = document.getElementById("text_tool");
                if(textInput) {
                    textInput.parentNode.removeChild(textInput);
                }
            });
        });
        mousemoveAction = (function(e) { });
        mouseupAction = (function(e) { }); 
    });

        // Draws text at some specific coordinates in canvas
        let drawText = (function (text, x, y, font, size, stroke, fill) {
        
            context.font= size + "px " + font;
            // context.measureText(text) <--- gets the width of text before placing it on canvas may be useful?
            if ( fill === true) { context.fillText(text, startx, starty); }
            if ( stroke === true) { context.strokeText(text, startx, starty); }
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
        let temp_lWidth = context.lineWidth;
        let i = 1;
        drawables.forEach(element => {
            element.draw(context);
            i++;
        });

        context.strokeStyle = temp_pColor;
        context.fillStyle = temp_sColor;
        context.lineWidth = temp_lWidth;
    });

    var lineWidthSlider = document.getElementById("strokeWidth");
    var lineOutput = document.getElementById("strokeWidthOutput");
    lineOutput.innerHTML = lineWidthSlider.value + " px";

    lineWidthSlider.oninput = function() {

        lineOutput.innerHTML = this.value + " px";
        context.lineWidth = this.value;
    }

    var textSlider = document.getElementById("textSizeSlider");
    var textOutput = document.getElementById("textSizeOutput");
    context.font = textSlider.value + "px" + " " + $('#fontSelect option:selected').css("font-family");
    textOutput.innerHTML = textSlider.value + "px";

    textSlider.oninput = function() {

        let font = $('#fontSelect option:selected').css("font-family");
        let size = this.value + "px";
        textOutput.innerHTML = size;
        context.font = size + " " + font;
    }

    $('#fontSelect').change(function(){

        var textSlider = document.getElementById("textSizeSlider");
        let font = $('#fontSelect option:selected').css("font-family");
        let size = $('#textSizeSlider').val();
        $("#textPreview").css('font-family', font);
        context.font = size + "px " + font;
    });

});