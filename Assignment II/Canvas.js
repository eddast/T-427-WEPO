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
    movingElement: null,
    isDrawing : false,
    isTyping: false,
    isMoving: false,
    moveX: 0,
    moveY: 0
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


    //Geyma nöfnin í array
    //Hugmynd að sava söguna og keyra hana í staðinn fyrir það að save-a sem mynd
    $("#save").click(function(e) {
        //Náum í öll nöfnin í localStorage-inu
        var listOfSavedFilesNames = [];
        for (var i = 0; i < localStorage.length; i++) {
            listOfSavedFilesNames.push(localStorage.key(i));
        }
        //Náum í array-ið
        var data = JSON.stringify(Drawio.drawables);
        //Leyfum notendanum að skýra file-inn sinn
        var nameOfSavedData = window.prompt("What do you want to name the file?");
        if (listOfSavedFilesNames.length > 0){
            var existsOrNot = true;
            while (existsOrNot == true) {
                for (var i = 0; i < listOfSavedFilesNames.length; i++) {
                    if (listOfSavedFilesNames[i] == nameOfSavedData) {
                        nameOfSavedData = window.prompt("That name is taken, try again");
                        existsOrNot = true;
                        break;
                    }
                    else {
                        existsOrNot = false;
                    }
                }
            }
        }
        //Ef notandinn valdi ekki cancel
        if (nameOfSavedData != null){

            localStorage.setItem(nameOfSavedData, data); 
            window.alert(nameOfSavedData + " has been saved to your local storage");
        }
    });

    //Fallið sem að birtir alla file-ana sem að notandinn hefur save-að
    $("#getAllSavedFiles").click(function (e) { 
        var listOfSavedFilesNames = [];
        for (var i = 0; i < localStorage.length; i++) {
            listOfSavedFilesNames.push(localStorage.key(i));
        }
        if (listOfSavedFilesNames.length != 0){
            //Notum modal til að birta möguleikana
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            //Removum alla li-ana af ul-inu áður en við setjum inn nýja
            $('#insertFileNamesIntoMe li').remove();
            var list = document.getElementById("insertFileNamesIntoMe");
            for (var i = 0; i < listOfSavedFilesNames.length; i++){
                //Búum til næstu nóðu
                var newItem = document.createElement("li");
                newItem.style.cursor = "pointer";
                //Bætum við eventlistener á hverja nóðu fyrir sig
                newItem.addEventListener('click', function(e) {
                    fillCanvasWithSelectedSavedProject($(this).text());
                })
                var item = listOfSavedFilesNames[i];
                var itemNode =  document.createTextNode(item);
                newItem.appendChild(itemNode);
                list.appendChild(newItem);
            }
        }
        else{
            window.alert("You don´t have any previously saved photos");
        }
    });

    function fillCanvasWithSelectedSavedProject(name){
        //Byrjum á að clear-a canvasinn
        while (Drawio.drawables.length !== 0) {
            Drawio.drawables.pop();
        }
        while (Drawio.undo.length !== 0) {
            Drawio.undo.pop();
        }
        drawCanvas();

        //Hérna eigum við að keyra inn array-ið af objectum sem að notandinn valdi
        //Náum í array-ið af objectum og skýrum það item
        var item = JSON.parse(localStorage.getItem(name));
        for (let i = 0; i<item.length; i++){
            let asger = item[i];
            switch(asger.type){
                case "pen":
                    asger.__proto__ = FreeForm.prototype;
                    break;
                case "line":
                    asger.__proto__ = Line.prototype;
                    break;
                case "circle":
                    asger.__proto__ = Circle.prototype;
                    break;
                case "rect":
                    asger.__proto__ = Rect.prototype;
                    break;
                case "text":
                    asger.__proto__ = Text.prototype;
                    break;
            }
            Drawio.drawables.push(asger);
        }
        //Hérna á eftir að keyra objectana sem að item geymir
        //Drawio.drawables = item; //Einhvern veginn svona
        drawCanvas();

        //Lokum modal-inu
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }

    function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };


    /*****************************
     *  SET UP I/O CANVAS ACTIONS
     *****************************/
    
    // User clicks the canvas but hasn't released yet
    $("#canvas").mousedown(function(e) {

        let startX = e.offsetX; 
        let startY = e.offsetY;
        Drawio.isDrawing = true;
        switch(Drawio.selectedTool) {

            case "moveTool":
                Drawio.currentElement = null;
                Drawio.isDrawing = false;
                Drawio.isMoving = true;
                Drawio.moveX = startX;
                Drawio.moveY = startY;
                movingElement = getClickedShape(startX, startY);
                if (movingElement) { drawTmpLinesAround(movingElement); }

                return;

            case "drawTool":
                Drawio.currentElement = new FreeForm ( startX, startY );
                break;
            case "lineTool":
                Drawio.currentElement = new Line ( startX, startY );
                break;
            case "circleTool":
                Drawio.currentElement = new Circle ( startX, startY );
                break;
            case "rectTool":
                Drawio.currentElement = new Rect ( startX, startY );
                break;
            case "textTool":
                if(!Drawio.isTyping) {
                    Drawio.isTyping = true;
                    Drawio.currentElement = new Text ( startX, startY, e );
                } else {
                        let textBox = document.getElementById("textBox");
                        Drawio.currentElement.text = textBox.value;
                        textBox.value = "";
                        Drawio.currentElement.draw(Drawio.context);
                        $("#textBox").css("display", "none");
                        Drawio.isTyping = false;
                }
                Drawio.isDrawing = false;
                break;
        }
        if(!Drawio.isTyping) {
            Drawio.drawables.push(Drawio.currentElement);
            drawCanvas();
        }
    });
    // User moves mouse but hasn't released yet
    $("#canvas").mousemove(function(e) {

        let currX = e.offsetX; 
        let currY = e.offsetY;

        if ( Drawio.isDrawing ) {
            Drawio.currentElement.endCoordinates(currX, currY);
            drawCanvas();
        }

        if ( Drawio.isMoving &&  movingElement !== null) {

            let diffX = currX - Drawio.moveX;
            let diffY = currY - Drawio.moveY;
            movingElement.start_x = movingElement.start_x + diffX;
            movingElement.start_y = movingElement.start_y + diffY;
            movingElement.endCoordinates((movingElement.end_x + diffX),
                                        (movingElement.end_y + diffY) );
            if (movingElement.points !== undefined) {
                console.log("ÉGHATAJAVASCRIPT");
                movingElement.reDraw(Drawio.context, diffX, diffY);
            }
            movingElement.isAt();
            drawCanvas(); drawTmpLinesAround(movingElement);
            Drawio.moveX = Drawio.moveX + diffX;
            Drawio.moveY = Drawio.moveY + diffY;
        }
    });
    // User releases mouse
    $("#canvas").mouseup(function(e) {

        Drawio.isDrawing = false;
        if(Drawio.isMoving) {
            Drawio.isMoving = false;
            movingElement = null;
            drawCanvas();
        }
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
    //Temporary draws frame around object
    let drawTmpLinesAround = (function(movingElement) {
        tmp = Drawio.context;
        Drawio.context.strokeStyle = 'gray';
        Drawio.context.lineWidth = 1;
        Drawio.context.strokeRect  ( movingElement.rect.A.x, movingElement.rect.A.y,
                                     movingElement.rect.B.x - movingElement.rect.A.x,
                                     movingElement.rect.B.y - movingElement.rect.A.y );
        Drawio.context = tmp;
    });
    // Gets if shape is within clicked index
    let getClickedShape = (function(x, y){

        let foundElement = null;
        Drawio.drawables.forEach(element => {
            if(element.isAt(x,y)) {
                foundElement = element;
            }
        });

        return foundElement;
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
    $("#optionBar").click( (e) => {
        var textBox = document.getElementById("textBox");
        textBox.value = "";
        textBox.style.display="none";
    })
});