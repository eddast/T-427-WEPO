
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

    // TESTING PARENT
    console.log("TESTING PARENT");

    console.log("1. Should be [<div>...</div>]");
    console.log(__("#num1").parent());

    console.log("2. Should be [<div>...</div>]");
    console.log(__("#num1").parent("div"));

    console.log("3. Should be {}");
    console.log(__("#num1").parent("head"));

    console.log("4. Should be {}");
    console.log(__("#doesnotexist").parent());

    console.log("5. Should be {}");
    console.log(__("#doesnotexist").parent("head"));

    console.log("6. Should be [div, div]");
    console.log(__(".Thisisclass").parent());

    console.log("7. Should be [div, div]");
    console.log(__(".Thisisclass").parent("div"));

    console.log("8. Should be []");
    console.log(__(".Thisisclass").parent("head"));

    // TESTING GRANDPARENT
    console.log("TESTING GRANDPARENT");

    console.log("9. Should be [body, body]");
    console.log(__(".Thisisclass").grandParent());

    console.log("10. Should be [body, body]");
    console.log(__(".Thisisclass").grandParent("body"));

    console.log("11. Should be []");
    console.log(__(".Thisisclass").grandParent("head"));

    console.log("12. Should be {}");
    console.log(__("#doesnotexist").grandParent());

    console.log("13. Should be {}");
    console.log(__("#doesnotexist").grandParent("head"));

    console.log("14. Should be [body]");
    console.log(__("div").parent());
    
    console.log("15. Should be [html]");
    console.log(__("div").grandParent());

    console.log("15. Should be {}");
    console.log(__("html").grandParent());
})