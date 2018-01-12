
let button = document.getElementById("Thisisid");
let button1 = document.getElementById("Thisisid1");

let AddTwoNumbers = () => {
    let numOne = parseInt(document.getElementById("num1").value);
    let numTwo = parseInt(document.getElementById("num2").value);
    
    let AddNumbers = (a, b) => {
        return a + b;
    }
    
    let result = {
        one: numOne,
        two: numTwo,
        res: AddNumbers
    };

    return result;
};

button.addEventListener("click", () => {
    alert("Result: " +  AddTwoNumbers().res( AddTwoNumbers().one,  AddTwoNumbers().two));
})

button1.addEventListener("click", () => {

    console.log(__("#doesnotexist"));                   // WORKS
    console.log(__("#num1"));                           // WORKS
    console.log(__(".Thisisclass"));                    // WORKS
    console.log(__("#num1").parent());                  // WORKS
    console.log(__("#num1").parent("body"));            // WORKS
    console.log(__("#num1").parent("head"));            // WORKS
    console.log(__("#doesnotexist").parent());          // WORKS
    console.log(__("#doesnotexist").parent("head"));    // WORKS

    console.log(__(".Thisisclass").parent());           // WORKS
    console.log(__(".Thisisclass").parent("body"));     // WORKS
    console.log(__(".Thisisclass").parent("head"));     // NOPE
})