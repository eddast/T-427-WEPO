/*  ========================================================
 *
 *          T-427-WEPO Web Programming II
 *          Reykjavik University
 *          Extra Assignment II: Extending Array.prototype
 *          Assignment Due: 01.05.2018
 *          Author: Edda Steinunn 
 *
 *  ======================================================== */

// ATH INPLACE FUNCTION (MUTATES THE 'THIS' ARRAY)
// Removes all duplicates in array
Array.prototype.removeAllDuplicates = function() {
    let uniques = Array.from(new Set(this));
    this.splice(0, this.length);
    for(let i = 0; i < uniques.length; i++) {
        this.splice(i, 1, uniques[i]);
    }
}

// ATH INPLACE FUNCTION (MUTATES THE 'THIS' ARRAY)
// Inserts element in specified index
Array.prototype.insertAt = function ( element, index ) {
    this.splice( index, 0, element );
};

// non-inplace function
// Returns n last elements of array in an array
Array.prototype.tail = function ( n ) {
    let copycat = []
    for(let i = 0 ; i< this.length; i++) {
        copycat.push(this[i]);
    }
    copycat.splice( 0, this.length-n);
    return copycat;
};

// non-inplace function
// Returns n first elements of array in an array
Array.prototype.head = function ( n ) {
    let copycat = []
    for(let i = 0 ; i< this.length; i++) {
        copycat.push(this[i]);
    }
    copycat.splice( n, this.length-n);
    return copycat;
};

// ATH INPLACE FUNCTION (MUTATES THE 'THIS' ARRAY)
// Removes elements in array based on their evaluation in predicate function
// If element evaluates to true in predicate function, it is removed
Array.prototype.remove = function ( predicateFunction ) {
    for(let i = 0; i < this.length; i++) {
        if(predicateFunction(this[i])) {
            this.splice(i, 1);
        }
    }
};

// non-inplace function
// Returns difference of array and parameter array
// (that is elements not in array but in parameter array)
Array.prototype.difference = function ( array ) {
    return array.filter(elem => !this.includes(elem));
};


// non-inplace function
// Returns intersection of array and parameter array
Array.prototype.intersection = function ( array ) {
    return this.filter(elem => array.includes(elem));
};


// non-inplace function
// Takes in any number of arrays as parameter and returns groups of elements
// meaning that every element in first index of each array go together, etc.
// Apparently the 'this' array is just disregarded??
Array.prototype.zip = function ( ) {

    // Get longest array provided
    let longest = 0;
    for(let i = 0 ; i < arguments.length-1; i++) {
        if(arguments[i].length > longest) {
            longest = arguments[i].length
        }
    }

    // Zips all arrays together in one motherfucking large array
    let zippedArrays = []
    for(let i = 0; i <= longest; i++) {
        let currZipArr = [];
        for(let j = 0 ; j < arguments.length; j++) {
            if(arguments[j].length > i) {
                currZipArr.push(arguments[j][i]);
            }
        } zippedArrays.push(currZipArr);
    }


    return zippedArrays;

};


// non-inplace function
// Throw exception if not all elements are numbers
// Otherwise return multiply of all numbers in array
Array.prototype.multiply = function ( ) {
    let multiple = 1;
    for(let i = 0; i < this.length; i++) {
        if(typeof(this[i])!=='number') {
            throw "NON-NUMERIC ARRAY EXCEPTION: Excuse me mister, array not purely numeric!";
        } else {
            multiple = multiple * this[i];
        }
    }

    return multiple;
};


// non-inplace function
// Throw exception if not all elements are numbers
// Otherwise return average of all numbers in array
Array.prototype.average = function ( ) {
    let sum = 0;
    for(let i = 0; i < this.length; i++) {
        if(typeof(this[i])!=='number') {
            throw "NON-NUMERIC ARRAY EXCEPTION: Excuse me mister, array not purely numeric!";
        } else {
            sum = sum + this[i];
        }
    }

    return sum/this.length;
};

/**************************************
 *       ARRAY EXTENSION TESTS 
 **************************************/

 
// let array = [0,0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

// console.log('TESTING removeAllDuplicates');
// console.log('before: ' + array);
// console.log('calling array.removeAllDuplicates()...');
// array.removeAllDuplicates();
// console.log('after: ' + array);

// console.log('\n');

// console.log('TESTING insertAt');
// console.log('before: ' + array);
// console.log('calling array.insertAt(1,1)...');
// array.insertAt(1,1);
// console.log('after: ' + array);

// console.log('\n');

// console.log('TESTING tail');
// console.log('before: ' + array);
// console.log('calling array.tail(4)...');
// let tailReturnVal = array.tail(4);
// console.log('return value (should be last four): ' + tailReturnVal);
// console.log('original array (should be same as before): ' + array);

// console.log('\n');

// console.log('TESTING head');
// console.log('before: ' + array);
// console.log('calling array.head(4)...');
// let headReturnVal = array.head(4);
// console.log('return value (should be first four): ' + headReturnVal);
// console.log('original array (should be same as before): ' + array);

// console.log('\n');

// console.log('TESTING remove');
// console.log('before: ' + array);
// console.log('calling array.remove((elem) => { return !elem%2===0; })...');
// array.remove((elem) => { return !elem%2===0; });
// console.log('array (should now be only even numbers): ' + array);

// console.log('\n');

// console.log('TESTING difference');
// console.log('before: ' + array);
// console.log('calling array.difference([1,2,3,4,5,6,7,8,9,10])...');
// let differenceReturnVal = array.difference([1,2,3,4,5,6,7,8,9,10]);
// console.log('return value (should be 1,3,5,7,9): ' + differenceReturnVal);
// console.log('original array (should be same as before): ' + array);

// console.log('\n');

// console.log('TESTING intersection');
// console.log('before: ' + array);
// console.log('calling array.intersection([1,2,3,4,5,6,7,8,9,10])...');
// let intersectionReturnVal = array.intersection([1,2,3,4,5,6,7,8,9,10]);
// console.log('return value (should be 2,4,6,8,10): ' + intersectionReturnVal);
// console.log('original array (should be same as before): ' + array);

// console.log('\n');

// console.log('TESTING multiply');
// array.remove((elem) => { return elem===0; });
// console.log('before: ' + array);
// console.log("calling array.multiply()...");
// let multiplyReturnVal = array.multiply();
// console.log('return value (should be 3840): ' + multiplyReturnVal);
// console.log('original array (should be same as before): ' + array);
// let nonNumericArr = [1,6,'string','cat',{obj: 'object'}];
// console.log("calling [1,6,'string','cat',{obj: 'object'}].multiply()... (this should yield error!)");
// try         { nonNumericArr.multiply(); }
// catch (e)   { console.log('CAUGHT EXCEPTION:' + e); }

// console.log('\n');

// console.log('TESTING average');
// console.log('before: ' + array);
// console.log("calling array.average()...");
// let avgReturnVal = array.average();
// console.log('return value (should be 6): ' + avgReturnVal);
// console.log('original array (should be same as before): ' + array);
// console.log("calling [1,6,'string','cat',{obj: 'object'}].average()... (this should yield error!)");
// try         { nonNumericArr.average(); }
// catch (e)   { console.log('CAUGHT EXCEPTION:' + e); }

// console.log('\n');

// console.log('TESTING zip');
// console.log('before: ' + array);
// let zipReturnVal = array.zip([1,2,3],[4,5,6],[7,8,9,10]);
// console.log('Calling array.zip([1,2,3],[4,5,6],[7,8,9,10])...');
// console.log('return value (should be [[1,4,7], [2,5,8], [3,6,9], [10]]) (below):');
// console.log(zipReturnVal);
// console.log('original array (should be same as before): ' + array);