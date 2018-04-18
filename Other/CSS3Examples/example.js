/******** Promises ********/

function functionThatReturnsPromise(b) {
    // Settimeout only used to simulate asynchronisity
    return new Promise((resolve, reject) => {
        if (b) {
            // succeeded
            resolve("variable1");
        } else {
            // error occured
            reject("error1")
        }
    });
}


functionThatReturnsPromise(true).then((variable) => {
    // succeeded
    console.log(variable);
}).catch((reason) => {
    // error occured
    console.log(reason);
});

functionThatReturnsPromise(false).then((variable) => {
    // succeeded
    console.log(variable);
}).catch((reason) => {
    // error occured
    console.log(reason);
});

/**************************/
/*** Callback function ****/


function functionThatUsesCallback(fn) {
    setTimeout(() => {
        fn("variable2");
    }, 500)
}

functionThatUsesCallback((variable) => {
    console.log(variable)
});

/**************************/