/*  ========================================================
 *
 *      T-427-WEPO Web Programming II
 *      Reykjavik University
 *      Assignment 2: DrawioJS
 *      Part: Drawable Objects Helper Classes
 *      Assignment Due: 04.02.2018
 *      Authors:
 *              Darri Valgarðsson,
 *              Edda Steinunn,
 *              Sigurður Sturla Bjarnasson
 *
    ======================================================== */


/*  "Abstract" super-JSObject drawable and it's derived classes
 *  Drawables are FreeForm, Line, Circle, Rect and Text */



/************************************************************
 *                  BASE CLASS DRAWABLE
 *  Each drawable implements the draw() functionality
*************************************************************/
function Drawable(x,y,primaryColor,secondaryColor,lineWidth){
    this.start_x = x;
    this.start_y = y;
    this.end_x = x;
    this.end_y = y;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.lineWidth = lineWidth;
}
Drawable.prototype.draw = function () {};
Drawable.prototype.endCoordinates = function (x, y) {
    this.end_x = x;
    this.end_y= y;
}


/**********************************************************
 *                  DRAWABLE FREEFORM
 *  Implements pen tool functionality via Drawable base
***********************************************************/
function FreeForm (x, y, primaryColor, secondaryColor, lineWidth) {
        
    Drawable.call(this, x, y, primaryColor, secondaryColor, lineWidth);
    this.points = [ ];
    let point = {x: this.start_x, y: this.start_y};
    this.points.push(point);
};
FreeForm.prototype = Object.create(Drawable.prototype);
FreeForm.prototype.constructor = FreeForm;
FreeForm.prototype.draw = function (context) {

    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    let point = { x: this.end_x,
                  y: this.end_y};
    this.points.push(point);
    context.moveTo(this.start_x, this.start_y);

    for(let i = 1; i < this.points.length; i++) {
        point = this.points[i];
        context.lineTo(point.x, point.y);
    }
    context.stroke();
    context.closePath();
};


/********************************************************
 *                  DRAWABLE LINE
 *  Implements line tool functionality via Drawable base
**********************************************************/
function Line (x, y, primaryColor, secondaryColor, lineWidth) {
        
    Drawable.call(this, x, y, primaryColor, secondaryColor, lineWidth);
};
Line.prototype = Object.create(Drawable.prototype);
Line.prototype.constructor = Line;
Line.prototype.draw = function (context) {
    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.start_x, this.start_y);
    context.lineTo(this.end_x, this.end_y);
    context.stroke();
    context.closePath();
};


/********************************************************
 *                  DRAWABLE CIRCLE
 *  Implements circle tool functionality via Drawable base
**********************************************************/
function Circle (x, y, primaryColor, secondaryColor, lineWidth) {
        
    Drawable.call(this, x, y, primaryColor, secondaryColor, lineWidth);
    this.radiusX = 0; this.radiusY = 0;
    this.centerX = 0; this.centerY = 0;
    this.fill = $("#fillMark").is( ":checked" ) ? true : false;
    this.stroke = $("#strokeMark").is( ":checked" ) ? true : false;
};
Circle.prototype = Object.create(Drawable.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.draw = function (context) {
    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.lineWidth = this.lineWidth;
    this.radiusX = (this.start_x - this.end_x) / 2;
    this.radiusY = (this.start_y - this.end_y) / 2;
    this.centerX = this.start_x - this.radiusX;
    this.centerY = this.start_y - this.radiusY;
    var step = 0.01,
    pi2 = Math.PI * 2 - step;

    context.beginPath();
    context.moveTo(this.centerX + this.radiusX * Math.cos(0),
                    this.centerY + this.radiusY * Math.sin(0));

    for (var a = step; a < pi2; a += step) {
        context.lineTo(this.centerX + this.radiusX * Math.cos(a),
                        this.centerY + this.radiusY * Math.sin(a));

    }

    context.lineTo(this.centerX + this.radiusX * Math.cos(a+step),
                    this.centerY + this.radiusY * Math.sin(a+step));

    if ( this.stroke === true)   { context.stroke(); }
    if ( this.fill === true )    { context.fill(); }

    context.closePath();    
};


/**************************************************************
 *                   DRAWABLE RECTANGLE
 *  Implements rectangle tool functionality via Drawable base
***************************************************************/
function Rect (x, y, primaryColor, secondaryColor, lineWidth) {
        
    Drawable.call(this, x, y, primaryColor, secondaryColor, lineWidth);
    this.fill = $("#fillMark").is( ":checked" ) ? true : false;
    this.stroke = $("#strokeMark").is( ":checked" ) ? true : false;
};
Rect.prototype = Object.create(Drawable.prototype);
Rect.prototype.constructor = Rect;
Rect.prototype.draw = function (context) {
    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.lineWidth = this.lineWidth;
    let xsize = this.end_x - this.start_x;
    let ysize = this.end_y - this.start_y;
    if ( this.fill === true )    { context.fillRect(this.start_x, this.start_y, xsize, ysize); }
    if ( this.stroke === true)   { context.strokeRect(this.start_x, this.start_y, xsize, ysize); }
};


/********************************************************
 *                  DRAWABLE TEXT
 *  Implements text tool functionality via Drawable base
*********************************************************/
function Text (x, y, primaryColor, secondaryColor, font, context) {
        
    Drawable.call(this, x, y, primaryColor, secondaryColor, 1);
    this.fill = $("#fillMark").is( ":checked" ) ? true : false;
    this.stroke = $("#strokeMark").is( ":checked" ) ? true : false;
    this.font = font;

    this.textInputBox = document.createElement('input');
    this.textInputBox.setAttribute("id", "text_tool");
    if (this.stroke) { this.textInputBox.setAttribute('style', "-webkit-text-stroke: 1px " + primaryColor + ";"); }
    if (this.fill) { this.textInputBox.style.color = secondaryColor; }
    if (!this.fill) { this.textInputBox.style.color = "transparent"; }
    this.textInputBox.style.font = font;
    this.textInputBox.style.display = "block";
    this.textInputBox.type = 'text';
    this.text =  this.textInputBox.value;

    this.textInputBox.style.left = (this.start_x +  document.getElementById("canvas").offsetLeft) + 'px';
    this.textInputBox.style.top  = (this.start_y + document.getElementById("canvas").offsetTop) + 'px';

    document.body.appendChild(this.textInputBox);
    this.textInputBox.focus();

    this.textInputBox.onkeydown = ( (e) => {

        if(e.keyCode==13 || e.keyCode ==27) {

            this.text = this.textInputBox.value;
            let tmp = context;
            context.lineWidth = 1;
            context.font = this.font;
            context.textBaseline = 'top';
            context.textAlign = 'left';
            context.strokeStyle = this.primaryColor;
            context.fillStyle = this.secondaryColor;
            context.beginPath();
            if ( this.fill === true) { context.fillText(this.text, this.start_x, this.start_y); }
            if ( this.stroke === true) { context.strokeText(this.text, this.start_x, this.start_y); }
            context.closePath();
            context = tmp;
            this.textInputBox.parentNode.removeChild(this.textInputBox);
        } 
    });
};
Text.prototype = Object.create(Drawable.prototype);
Text.prototype.constructor = Text;
Text.prototype.draw = function (context) {
    
    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.lineWidth = 1;
    context.font = this.font;
    context.textBaseline = 'top';
    context.textAlign = 'left';

    context.beginPath();
    if ( this.fill === true) { context.fillText(this.text, this.start_x, this.start_y); }
    if ( this.stroke === true) { context.strokeText(this.text, this.start_x, this.start_y); }
    context.closePath();

};