/*  ========================================================
 *
 *          T-427-WEPO Web Programming II
 *          Reykjavik University
 *          Extra Assignment III: Extending Object.prototype
 *          Assignment Due: 20.04.2018
 *          Author: Edda Steinunn 
 *
 *  ======================================================== */


// Should combine all parameter objects in to a single object.
// If there are properties which have the same name the first object
// should have the deciding factor.
// Returns a single merged object
Object.prototype.merge = function() {
    for(let i = 0; i < arguments.length; i++) {
        for (var propertyName in arguments[i]) {
            if(this[propertyName] === undefined) {
                this[propertyName] = arguments[i][propertyName];
            }
        }
    }
}

// Should be executed on an instance of Object and should return a
// new object with only the properties stated as parameters.
// If the property is not found, ignore it.
Object.prototype.pick = function() {
    let newObj = {};
    for(let i = 0; i < arguments.length; i++) {
        if(this[arguments[i]] !== undefined) {
            newObj[arguments[i]] = this[arguments[i]];
        }
    }

    return newObj;
}

// Returns the last property of the object.
// If no property resides within the Object, function returns undefined
Object.prototype.tail = function() {
    return this[Object.keys(this)[Object.keys(this).length-1]];
} 

// Returns the first property of the object.
// If no properties resides within the Object, function returns undefined
Object.prototype.head = function() {
    return this[Object.keys(this)[0]];
} 

// Takes in a function which should be used to determine
// what to remove from the object.
Object.prototype.remove = function(predicateFunction) {
    Object.keys(this).forEach((attrName) => {
        if (predicateFunction(this[attrName])) {
            delete this[attrName];
        }
    });
} 

// Takes in two objects and returns the difference as a new object
// (possibly an empty object)
Object.prototype.difference = function(ObjFirst, ObjSecond) {
    let newObject = {};
    for (var propertyName in ObjSecond) {
        if(ObjFirst[propertyName] === undefined) {
            newObject[propertyName] = ObjSecond[propertyName];
        }
    }
    return newObject;
} 

// Takes in two objects and returns the intersection as a new object
// (possibly an empty object)
Object.prototype.intersection = function (ObjFirst, ObjSecond) {
    let newObj = ObjFirst;
    for (var propertyName in newObj) {
        if (ObjSecond[propertyName] === undefined) {
            delete newObj[propertyName];
        }
    }
    return newObj;
} 

// Takes in a property and returns true or false whether the property exists or not.
Object.prototype.hasIn = function (elem) {
    return this.hasOwnProperty(elem);
} 

// Takes in a path and a function called updater.
// The path should determine where the property resides within the object,
// e.g. {x: {y: 1}} can have a path to the y property with ‘x.y’.
// By calling {x: {y: 1}}.updatePath(‘x.y’, (n)=> n * 2), the y property should have changed to 2
Object.prototype.updatePath = function (path, updater) {
    let value = this;
    let nestedPaths = path.split('.');
    for(let i = 0; i < nestedPaths.length-1; i++) {
        value = value[nestedPaths[i]];
    }
    value[nestedPaths[nestedPaths.length-1]] = updater(value[nestedPaths[nestedPaths.length-1]]);
}

// Should count have many properties reside within the Object
Object.prototype.count = function (elem) {
    return Object.keys(this).length;
} 





/**************************************
 *       OBJECT EXTENSION TESTS 
 **************************************/

// // test objects
// var obj = {
//     x: {y: 1},
//     z: 20,
//     u: 'hello',
//     v: 'world'
// };
// var emptyObj = {};

// /*** TESTING MERGE ***/
// // TESTS PASS :)
// console.log('testing merge');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.merge({Led: "Zeppelin"}, {x: "newx", pizza: "pepperoni", catsRule: true})...');
// obj.merge({Led: 'Zeppelin'}, {x: 'newx', pizza: 'pepperoni', catsRule: true});
// console.log('After merge: (should have attributes Led, pizza and catsRule but rest unchanged):');
// console.log(obj);
// // reset 
// obj = {
//     x: {y: 1},
//     z: 20,
//     u: 'hello',
//     v: 'world'
// };
// console.log('\n');

// /*** TESTING PICK ***/
// // TESTS PASS :)
// console.log('testing pick');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.pick("x", "z") returns:')
// console.log(obj.pick("x", "z")); 
// console.log('calling obj.pick("x", "z", "notaproperty") returns:')
// console.log(obj.pick("x", "z", "notaproperty")); 
// console.log('\n');

// /*** TESTING HEAD/TAIL ***/
// // TESTS PASS :)
// console.log('testing head/tail');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.head() returns (should be {y: 1}):')
// console.log(obj.head()); 
// console.log('calling obj.tail() returns: ' + obj.tail()  + ' (should be "world")');
// console.log('testing the empty object');
// console.log('calling emptyObj.head() returns: ' +  emptyObj.head()  + ' (should be undefined):')
// console.log('calling emptyObj.tail() returns: ' +  emptyObj.tail()  + ' (should be undefined):')
// console.log('\n');

// /*** TESTING REMOVE ***/
// // TESTS PASS :)
// console.log('testing remove');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.remove(n => return n === 20) returns (should not contain z):')
// obj.remove( (n)=> n === 20 );
// console.log(obj);
// console.log('\n');

// /*** TESTING DIFFERENCE AND INTERSECTION ***/
// // TESTS PASS :)
// console.log('testing difference and intersection');
// let object1 = {
// 	Led: "Zeppelin",
// 	Tame: "Impala"
// };
// let object2 = {
// 	Led: "Zeppelin",
// 	Foo: "Fighters"
// };
// console.log('result of difference (should be {Foo: "Fighters"}');
// console.log(Object.difference(object1, object2));
// console.log('result of intersection (should be {Led: "Zeppelin"}');
// console.log(Object.intersection(object1, object2));
// console.log('\n');

// /*** TESTING HASIN ***/
// // TEST PASS :)
// console.log('testing hasIn');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.hasIn("x") returns: ' + obj.hasIn('x')  + ' (should be true)'); 
// console.log('calling obj.hasIn("v") returns: ' + obj.hasIn('v')  + ' (should be true)');
// console.log('calling obj.hasIn("notfound") returns: ' + obj.hasIn('notfound') + ' (should be false)');
// console.log('\n'); 

// /*** TESTING UPDATEPATH ***/
// // TESTS PASS :)
// console.log('testing updatepath');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.updatePath(‘x.y’, (n)=> n * 2)...');
// obj.updatePath('x.y', (n)=> n * 2);
// console.log('Object after (should have {x: {y:2}):');
// console.log(obj);
// console.log('\n');


// /*** TESTING COUNT ***/
// // TEST PASS :)
// console.log('testing count');
// console.log('Object before:');
// console.log(obj);
// console.log('calling obj.count() returns: ' +  obj.count() + ' (should be 3)');
// console.log('\n');


 