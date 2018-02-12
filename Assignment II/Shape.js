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

function Drawable (x, y, type){

    this.start_x = x; this.start_y = y;
    this.end_x = x; this.end_y = y;
    this.primaryColor = Drawio.context.strokeStyle;
    this.secondaryColor = Drawio.context.fillStyle;
    this.lineWidth = Drawio.context.lineWidth;
    this.rect = {A: null, B: null};
    this.type = type;
}

Drawable.prototype.draw = function () {};
Drawable.prototype.isAt = function () {};
Drawable.prototype.endCoordinates = function (x, y) {
    this.end_x = x; this.end_y= y;
}


/**********************************************************
 *                  DRAWABLE FREEFORM
 *  Implements pen tool functionality via Drawable base
***********************************************************/

function FreeForm (x, y) {

    Drawable.call(this, x, y, "pen");
    this.points = [ ];
    this.outerPoints = [ ];
    this.innerPoints = [ ];
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
FreeForm.prototype.isAt = function (x, y) {

    let outerPoints = []; let innerPoints = [];
    for(let i = 0; i < this.points.length; i++) {
        outerPoints[i] = {x: this.points[i].x-this.lineWidth, y: this.points[i].y-this.lineWidth};
        innerPoints[i] = {x: this.points[i].x+this.lineWidth, y: this.points[i].y+this.lineWidth};
    }
    for(let i = 0; i < this.points.length-1; i++) {
        A = outerPoints[i]; // rect startpt
        B = innerPoints[i+1]; // rect endpt
        this.rect = {A: A, B: B};
        if(checkRange(x, y, A, B) === true) {
            return true;
        }
    }
    return false;
};
FreeForm.prototype.reDraw = function (context, diffX, diffY) {

    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    for(let i = 0; i < this.points.length; i++) {
        let point = { x: this.points[i].x+diffX, y: this.points[i].y+diffY }
        this.points[i] = point;
    }

    for(let i = 1; i < this.points.length; i++) {
        let point = this.points[i];
        context.lineTo(point.x, point.y);
    }
    context.stroke();
    context.closePath();
};


/*********************************************************
 *                  DRAWABLE LINE
 *  Implements line tool functionality via Drawable base
**********************************************************/

function Line (x, y) {
    Drawable.call(this, x, y, "line");
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
// TODO: Hægt betra?
Line.prototype.isAt = function (x, y) {

    let A = { }; //rect startpt
    let B = { }; //rect endpt
    if (this.start_x < this.end_x) {
        if(this.start_y > this.end_y) {
            A = { x: this.start_x-this.lineWidth, y: this.start_y+this.lineWidth}; //rect startpt
            B = { x: this.end_x+this.lineWidth, y: this.end_y-this.lineWidth}; //rect endpt
        }
        else {
            A = { x: this.start_x-this.lineWidth, y: this.start_y-this.lineWidth}; //rect startpt
            B = { x: this.end_x+this.lineWidth, y: this.end_y+this.lineWidth}; //rect endpt
        }
        this.rect = {A: A, B: B};
    } else {
        if(this.start_y > this.end_y) {
            A = { x: this.start_x+this.lineWidth, y: this.start_y+this.lineWidth};
            B = { x: this.end_x-this.lineWidth, y: this.end_y-this.lineWidth};
        } else {
            A = { x: this.start_x+this.lineWidth, y: this.start_y-this.lineWidth};
            B = { x: this.end_x-this.lineWidth, y: this.end_y+this.lineWidth};
        }
        this.rect = {A: B, B: A};
    }

    return checkRange(x,y, A, B);
};



/*********************************************************
 *                  DRAWABLE CIRCLE
 *  Implements circle tool functionality via Drawable base
***********************************************************/

function Circle (x, y) {

    Drawable.call(this, x, y, "circle");
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
Circle.prototype.isAt = function (x, y) {

    let A; let B;
    if(this.stroke) {
        A = { x: this.start_x-this.lineWidth, y: this.start_y-this.lineWidth}; //rect startpt
        B = { x: this.end_x+this.lineWidth, y: this.end_y+this.lineWidth}; //rect endpt
    }
    else {
        A = { x: this.start_x, y: this.start_y}; //rect startpt
        B = { x: this.end_x, y: this.end_y}; //rect endpt
    }
    if (A.y > B.y) {
        this.rect = {A: A, B: B};
    } else {
        this.rect = {A: B, B: A};
    }


    return checkRange(x,y, A, B);
};


/***************************************************************
 *                   DRAWABLE RECTANGLE
 *  Implements rectangle tool functionality via Drawable base
****************************************************************/

function Rect (x, y) {

    Drawable.call(this, x, y, "rect");
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
Rect.prototype.isAt = function (x, y) {

    let A; let B;
    if(this.stroke) {
        A = { x: this.start_x-this.lineWidth, y: this.start_y-this.lineWidth}; //rect startpt
        B = { x: this.end_x+this.lineWidth, y: this.end_y+this.lineWidth}; //rect endpt
    }
    else {
        A = { x: this.start_x, y: this.start_y}; //rect startpt
        B = { x: this.end_x, y: this.end_y}; //rect endpt
    }
    if (A.y > B.y) {
        this.rect = {A: A, B: B};
    } else {
        this.rect = {A: B, B: A};
    }


    return checkRange(x,y, A, B);
};


/*********************************************************
 *                  DRAWABLE TEXT
 *  Implements text tool functionality via Drawable base
**********************************************************/

function Text (x, y, e) {

    Drawable.call(this, x, y, "text");
    this.fill = $("#fillMark").is( ":checked" ) ? true : false;
    this.stroke = $("#strokeMark").is( ":checked" ) ? true : false;
    this.font = Drawio.context.font;
    this.textBox = document.getElementById("textBox");
    this.textSize = {x: 0, y: 0};
    // Format textbox to be exactly as user specified text (size, color, etc)
    if (this.stroke) {
        this.textBox.setAttribute ( 'style',
                                    "-webkit-text-stroke: 1px " +
                                    this.primaryColor +
                                    ";" );
    } if (!this.stroke) {
        this.textBox.setAttribute ( 'style',
                                    "-webkit-text-stroke: 1px " +
                                    "transparent" +
                                    ";" );
    } if (this.fill) {
        this.textBox.style.color = this.secondaryColor;
    } if (!this.fill) {
        this.textBox.style.color = "transparent";
    } this.textBox.style.font = this.font;
    this.text =  this.textBox.value;
    var canvas = document.getElementById("canvas");
    this.textBox.style.left = (this.start_x +  canvas.offsetLeft) + 'px';
    this.textBox.style.top  = (this.start_y + canvas.offsetTop) + 'px';
    this.textBox.style.display = "block";
    this.textBox.focus();
    this.textBoxSize = $("#textBox")[0].scrollHeight;
    e.preventDefault();

    this.textBox.onkeydown = ( (e) => {

        // On enter or esc draw what is in textbox
        if(e.keyCode==13 || e.keyCode ==27) {

            Drawio.isTyping = false;
            this.text = this.textBox.value;
            Drawio.drawables.push(this);
            this.draw(Drawio.context);

        }
    });
};
Text.prototype = Object.create(Drawable.prototype);
Text.prototype.constructor = Text;
Text.prototype.draw = function (context) {

    tmpLineWidth = context.lineWidth;
    context.lineWidth = 1;
    context.font = this.font;
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.strokeStyle = this.primaryColor;
    context.fillStyle = this.secondaryColor;
    context.beginPath();
    this.textSize = {   x: this.start_x+context.measureText(this.text).width,
                        y: this.start_y+this.textBoxSize    };
    if ( this.fill === true) { context.fillText(this.text, this.start_x, this.start_y); }
    if ( this.stroke === true) { context.strokeText(this.text, this.start_x, this.start_y); }
    context.closePath();
    this.endCoordinates ( this.textSize.x,
                          this.textSize.y);
    textBox.value = "";
    textBox.style.display="none";
    context.lineWidth = tmpLineWidth;

};
Text.prototype.isAt = function (x, y) {

    let A = { x: this.start_x-this.lineWidth, y: this.start_y-this.lineWidth}; //rect startpt
    let B = this.textSize; //rect endpt
    this.rect = {A: A, B: B};

    return checkRange(x,y, A, B);
};

/*****************************************************************
 *  HELPER FUNCTION: CHECKS IF X, Y ARE WITHIN SPECIFIED RECT
 *  EVERY ISAT FUNCTION CALLS FOR THIS RANGE CHECKER AS THEIR OWN
 ******************************************************************/
var checkRange = (function(x, y, upperRectPoint, lowerRectPoint ) {

        if(upperRectPoint.y < lowerRectPoint.y) {
            let tmp = upperRectPoint;
            upperRectPoint = lowerRectPoint;
            lowerRectPoint = tmp;
            this.rect = {A: upperRectPoint, B: lowerRectPoint};
        }
        if(upperRectPoint.x < lowerRectPoint.x) {
            this.rect = {A: lowerRectPoint, B: upperRectPoint};
            return  ((x >= upperRectPoint.x && x <= lowerRectPoint.x) &&
                     (y >= lowerRectPoint.y && y <= upperRectPoint.y));
        }

        return  ((x <= upperRectPoint.x && x >= lowerRectPoint.x) &&
                 (y >= lowerRectPoint.y && y <= upperRectPoint.y));
});
