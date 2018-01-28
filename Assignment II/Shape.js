/*  ========================================================
 *
 *      T-427-WEPO Web Programming II
 *      Reykjavik University
 *      Assignment 2: DrawioJS
 *      Part: Drawable Objects Helper Classes
 *      Assignment Due: 04.02.2018
 *      Authors:
 *              Darri Valgarðsson,
 *              Edda Steinunn
 *
    ======================================================== */


/*  "Abstract" super-class drawable and it's derived classes
 *  Each drawable implements draw() and erase() functionality
 *  Drawables are FreeForm, Line, Circle, Rect and Text */
class Drawable {

	constructor (x, y, primaryColor, secondaryColor, lineWidth) {
		this.start_x = x;
		this.start_y = y;
		this.end_x = x;
        this.end_y = y;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.lineWidth = lineWidth;
	}

	endCoordinates (x, y) {
		this.end_x = x;
		this.end_y= y;
	}
}

class FreeForm extends Drawable {

    constructor (x, y, primaryColor, secondaryColor, lineWidth) {
        
        super(x, y, primaryColor, secondaryColor, lineWidth);
        this.points = [ ];
        let point = {x: this.start_x, y: this.start_y};
        this.points.push(point);
    }

    draw (context) {

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
    }
    

    erase (context) {
        // ?????
    }
}

class Line extends Drawable {

	constructor (x, y, primaryColor, secondaryColor, lineWidth) { super(x, y, primaryColor, secondaryColor, lineWidth); }


	draw (context) {

        context.strokeStyle = this.primaryColor;
        context.fillStyle = this.secondaryColor;
        context.lineWidth = this.lineWidth;
        context.beginPath();
		context.moveTo(this.start_x, this.start_y);
		context.lineTo(this.end_x, this.end_y);
        context.stroke();
        context.closePath();
    }
    
    erase (context) {
        // ?????
    }
}

class Circle extends Drawable {

	constructor (x, y, primaryColor, secondaryColor, lineWidth) {
        super(x, y, primaryColor, secondaryColor, lineWidth);
        this.radiusX = 0; this.radiusY = 0;
        this.centerX = 0; this.centerY = 0;
        this.fill = $("#fillMark").is( ":checked" ) ? true : false;
        this.stroke = $("#strokeMark").is( ":checked" ) ? true : false;
    }

	draw (context) {

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
    }
    
    erase (context) {
        // ?????
    }
}

class Rect extends Drawable {

	constructor (x, y, primaryColor, secondaryColor, lineWidth) {
        super(x, y, primaryColor, secondaryColor, lineWidth);
        this.fill = $("#fillMark").is( ":checked" ) ? true : false;
        this.stroke = $("#strokeMark").is( ":checked" ) ? true : false;
    }

	endCoordinates (x,y) {
		this.end_x = x;
		this.end_y = y;
	}

	draw (context) {
        
        context.strokeStyle = this.primaryColor;
        context.fillStyle = this.secondaryColor;
        context.lineWidth = this.lineWidth;
        let xsize = this.end_x - this.start_x;
        let ysize = this.end_y - this.start_y;
        if ( this.fill === true )    { context.fillRect(this.start_x, this.start_y, xsize, ysize); }
        if ( this.stroke === true)   { context.strokeRect(this.start_x, this.start_y, xsize, ysize); }
    }
    
    erase (context) {
        // ?????
    }  
}

class Text extends Drawable {

	constructor (x, y, primaryColor, secondaryColor) { super(x, y, primaryColor, secondaryColor); }

	endCoordinates (x,y) {
		this.end_x = x;
		this.end_y = y;
	}

	draw (context) {
        
    }
    
    erase (context) {
        // ?????
    }

    // Draws text at some specific coordinates in canvas
    _drawText (text, x, y, font, size, stroke, fill) {
        
        context.font= size + "px " + font;
        // context.measureText(text) <--- gets the width of text before placing it on canvas may be useful?
        if ( fill === true) { context.fillText(text, startx, starty); }
        if ( stroke === true) { context.strokeText(text, startx, starty); }
    };
}


$(document).ready(function(){

    // OPTIMIZERS

    // LINE WIDTH OPTIMIZER LOCATED IN CANVAS.JS

    $('.fillstroke').change(function (e) {
        let checked = $(".fillstroke:checked").length;
        if(checked == 0) { e.target.checked = true; }
    });
});


