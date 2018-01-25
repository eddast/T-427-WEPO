
/*  ========================================================
 *
 *      T-427-WEPO Web Programming II
 *      Reykjavik University
 *      Assignment 2: DrawioJS
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
        $(".options").css("visibility", "hidden");
        $(toShow).css("visibility", "visible");
    });

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

        mousedownAction = defaultMousedownAction;

        mousemoveAction = (function(e) {
        
            if(isPainting === true) {
                let x = e.pageX - canvas.offsetLeft;
                let y = e.pageY - canvas.offsetTop;
                context.beginPath();
                context.moveTo(startx, starty);
            }
        });

        mouseupAction = (function(e) {

            let mouseup_x = e.pageX - canvas.offsetLeft;
            let mouseup_y = e.pageY - canvas.offsetTop;
            context.lineTo(mouseup_x, mouseup_y);
            context.stroke();
            isPainting = false;
        }); 
    });

    // User clicks the circle tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#circleTool").click(function(e) {
        optimizeOptionBar(".ocircle");
        mousedownAction = defaultMousedownAction;
        mousemoveAction = (function(e) {});
        mouseupAction = (function(e) {
            drawCircle (startx-30, starty-30, 50, false, true);
        });
    });

    // User clicks the circle tool icon
    // implements it's own mouse event actions that are
    // then used by mouse event listeners on the canvas object
    $("#rectTool").click(function(e) {
        optimizeOptionBar(".orect");
        mousedownAction = defaultMousedownAction;
        mousemoveAction = (function(e) {});
        mouseupAction = (function(e) {
            drawRect (startx-30, starty-30, 100, 100, true, false);
        });
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


    // Draws a cicle at some specific coordinates in canvas
    let drawCircle = (function ( x, y, radius, stroke, fill) {

        context.arc( x-30, y-30, radius, 0, 2*Math.PI, false );

        if ( stroke === true)   { context.stroke(); }
        if ( fill === true )    { context.fill(); }

    });

    // Draws a cicle at some specific coordinates in canvas
    let drawRect = (function ( x, y, xsize, ysize, stroke, fill) {

        if ( fill === true )    { context.fillRect(x-30, y-30, xsize, ysize); }
        if ( stroke === true)   { context.strokeRect(x-30, y-30, xsize, ysize); }
    
    });

    // Draws text at some specific coordinates in canvas
    let drawText = (function (text, x, y, font, size, stroke, fill) {
        
        context.font= size + "px " + font;
        // context.measureText(text) <--- gets the width of text before placing it on canvas
        if ( fill === true) { context.fillText(text, startx, starty); }
        if ( stroke === true) { context.strokeText(text, startx, starty); }
    });

    // Default mousedown action marks the start coordinates
    // And initiates the user painting state
    let defaultMousedownAction = (function(e){
        isPainting = true;
        startx = e.pageX - canvas.offsetLeft;
        starty = e.pageY - canvas.offsetTop;
    });

});