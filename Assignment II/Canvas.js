
/*  ========================================================
 *
 *      T-427-WEPO Web Programming II
 *      Reykjavik University
 *      Assignment 2: DrawioJS
 *      Part: Main functionlity
 *      Assignment Due: 04.02.2018
 *      Authors:
 *              Darri Valgarðsson,
 *              Edda Steinunn,
 *              Sigurður Sturla Bjarnasson
 *
    ======================================================== */

/*********************************
 *  DRAWIO APPLICATION VARIABLES
**********************************/
window.Drawio = {
    context : document.getElementById("canvas").getContext("2d"),
    drawables : [],
    undo : [],
    strokeColor : null,
    fillColor : null,
    selectedTool : "drawTool",
    currentElement : null,
    isDrawing : false,
    isTyping: false,
}

$(document).ready(function() {

    /************************************
     *  SET UP COLORS AND COLOR PICKERS
     ************************************/

    // Set up color picker for primary color
    $("#strokeColor").spectrum({
        color: Drawio.strokeColor,
        preferredFormat: "hex",
        move: function(newColor) { updateStrokeColor(newColor.toString()); }
    }); 
    // Set up color picker for secondary color
    $("#fillColor").spectrum({
        color: Drawio.fillColor,
        preferredFormat: "hex",
        move: function(newColor) { updateFillColor(newColor.toString()); }
    });
    // Update values functions
    let updateStrokeColor = (function (newColor) {
        Drawio.strokeColor = newColor;
        Drawio.context.strokeStyle = Drawio.strokeColor;
        $("#strokeColor").css("background-color", Drawio.strokeColor);
    }); let updateFillColor = (function(newColor) {
        Drawio.fillColor = newColor
        Drawio.context.fillStyle = Drawio.fillColor;
        $("#fillColor").css("background-color", Drawio.fillColor);
    });
    // Initial color updates
    updateStrokeColor('#25323A'); updateFillColor('#fc295a');
    // Swap colors function
    $('#changeColorsBtn').click(function(e) {

        let tmpStrokeColor = Drawio.strokeColor;
        updateStrokeColor(Drawio.fillColor);
        updateFillColor(tmpStrokeColor);
    });


    /*************************************
     *  SPECIFICATIONS FOR SELECTED ICONS
     *************************************/

    // Selecting icons will cause them to appear selected
    $(".icons").click(function(e) {
        makeIconLookSelected(e.target.id);
        optimizeOptionBar(e.target.id);
    });
    let makeIconLookSelected = (function (iconid) {

        $(".icons").removeClass("selected");
        $("#" + iconid).addClass("selected");
        Drawio.selectedTool = iconid;
    });
    // Lets option bar show relevant properties based on toShow tool
    let optimizeOptionBar = (function(toShow) {

        $(".options").addClass("keepHidden");
        $(".valueDisplay").addClass("keepHidden");
        $("#textPreview").addClass("keepHidden");
        $("." + toShow).removeClass("keepHidden");
    }); optimizeOptionBar("drawTool");


    /***************************
     *  SETUP OPTION BAR ITEMS
     ***************************/

     // Undoes last action
    $("#undo").click(function(e) {

          if(Drawio.drawables.length !== 0){
              let shape = Drawio.drawables.pop();
              Drawio.undo.push(shape);
              drawCanvas();
          }
    });
    // Redoes last action
    $("#redo").click(function(e) {

        if(Drawio.undo.length !== 0){
            let shape = Drawio.undo.pop();
            Drawio.drawables.push(shape);
            drawCanvas();
        }
    });
    // Clears canvas and all stored drawables
    $("#clear").click(function(e) {

        while(Drawio.drawables.length !== 0){
            Drawio.drawables.pop();
        }
        while(Drawio.undo.length !== 0){
            Drawio.undo.pop();
        }
        drawCanvas();
    });


    /*****************************
     *  SET UP I/O CANVAS ACTIONS
     *****************************/
    
    // User clicks the canvas but hasn't released yet
    $("#canvas").mousedown(function(e) {

        let startX = e.offsetX; 
        let startY = e.offsetY;
        Drawio.isDrawing = true;
        switch(Drawio.selectedTool) {

            case "drawTool":
                Drawio.currentElement = new FreeForm (startX, startY);
                break;
            case "lineTool":
                Drawio.currentElement = new Line (startX, startY);
                break;
            case "circleTool":
                Drawio.currentElement = new Circle (startX, startY);
                break;
            case "rectTool":
                Drawio.currentElement = new Rect (startX, startY);
                break;
            case "textTool":
            if(!Drawio.isTyping) {
                Drawio.isTyping = true;
                Drawio.currentElement = new Text (startX, startY, e);
                } else {
                    Drawio.currentElement.draw(Drawio.context);
                    $("#textBox").css("display", "none");
                }
                Drawio.isDrawing = false;
                break;
        }
        Drawio.drawables.push(Drawio.currentElement);
    });
    // User moves mouse but hasn't released yet
    $("#canvas").mousemove(function(e) {
        if(Drawio.isDrawing) {
            let currX = e.offsetX; 
            let currY = e.offsetY;
            Drawio.currentElement.endCoordinates(currX, currY);
            drawCanvas();
        }
    });
    // User releases mouse
    $("#canvas").mouseup(function(e) {
        Drawio.isDrawing = false;
    });
    // Re-renders canvas and all it's drawables
    let drawCanvas = (function() {

        Drawio.context.clearRect(0, 0, canvas.width, canvas.height);

        let temp_pColor = Drawio.strokeStyle;
        let temp_sColor = Drawio.fillStyle;
        let temp_lWidth = Drawio.lineWidth;
        Drawio.drawables.forEach(element => {
            element.draw(Drawio.context);
        });

        Drawio.context.strokeStyle = temp_pColor;
        Drawio.context.fillStyle = temp_sColor;
        Drawio.context.lineWidth = temp_lWidth;
    });


    /*************************
     *  SET UP RANGE SLIDERS
     *************************/

    // Line width slider optimization
    var lineWidthSlider = document.getElementById("strokeWidth");
    var lineOutput = document.getElementById("strokeWidthOutput");
    lineOutput.innerHTML = lineWidthSlider.value + " px";
    lineWidthSlider.oninput = function() {

        lineOutput.innerHTML = this.value + " px";
        Drawio.context.lineWidth = this.value;
    };
    // Font size slider optimization
    var textSlider = document.getElementById("textSizeSlider");
    var textOutput = document.getElementById("textSizeOutput");
    Drawio.context.font = textSlider.value + "px" + " " + $('#fontSelect option:selected').css("font-family");
    textOutput.innerHTML = textSlider.value + "px";
    textSlider.oninput = function() {

        let font = $('#fontSelect option:selected').css("font-family");
        let size = this.value + "px";
        textOutput.innerHTML = size;
        Drawio.context.font = size + " " + font;
    };


    /**************************
     * SET UP FONT ON CHANGE
     **************************/

    // Detects font drop down list change
    // Changes context's font accordingly 
    $('#fontSelect').change(function() {

        var textSlider = document.getElementById("textSizeSlider");
        let font = $('#fontSelect option:selected').css("font-family");
        let size = $('#textSizeSlider').val();
        $("#textPreview").css('font-family', font);
        Drawio.context.font = size + "px " + font;
    });


    /**************************
     *  ERROR CHECK CHECKBOXES
     **************************/

    $('.fillstroke').change(function (e) {
        let checked = $(".fillstroke:checked").length;
        if(checked == 0) { e.target.checked = true; }
    });
});