
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

    console.log("1.5. Should be [body]");
    console.log(__("#grandDiv").parent());

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

    console.log("9. Should be [div#grandDiv, div#grandDiv]");
    console.log(__(".Thisisclass").grandParent());

    console.log("9 3/4. Should be [body]");
    console.log(__("#parentDiv").grandParent());

    console.log("10. Should be [div#grandDiv, div#grandDiv]");
    console.log(__(".Thisisclass").grandParent("div"));

    console.log("11. Should be []");
    console.log(__(".Thisisclass").grandParent("head"));

    console.log("12. Should be {}");
    console.log(__("#doesnotexist").grandParent());

    console.log("13. Should be {}");
    console.log(__("#doesnotexist").grandParent("head"));

    console.log("14. Should be [body, div#grandDiv]");
    console.log(__("div").parent());
    
    console.log("15. Should be [html, body]");
    console.log(__("div").grandParent());

    console.log("16. Should be {}");
    console.log(__("html").grandParent());

    console.log("TESTING ANCESTOR");

    console.log("17. Should be [body, html]");
    console.log(__(".Thisisclass").ancestor());

    console.log("18. Should be []");
    console.log(__("#parentDiv").ancestor());

    console.log("TESTING ONCLICK");

    console.log("19. Should be new event");
    __("#Thisisid").onClick(() => {
        alert("changed functionality!");
    });

    console.log("20. Should be new event");
    __(".THINGY").onClick((evt) => {
        alert("changed functionality!");
    });

    __(".NEW").insertText("GOODBYE");
    __("#parentDiv").append("<p>HELLO<\p>");
    __("#parentDiv").append(
        document.createElement('p')
            .appendChild(
                document.createTextNode('HELLO AGAIN')
            )
    );

    __("#parentDiv").prepend("<p>PRE-HELLO<\p>");
    __("#parentDiv").prepend(
        document.createElement('p')
        .appendChild(
            document.createTextNode('PRE-HELLO AGAIN')
        )
    );

    __(".empty").prepend("<p class=\"paragh\">PRE-EMPTY<\p>");
    __(".empty").prepend(
        document.createElement('p')
        .appendChild(
            document.createTextNode('PRE-EMPTY AGAIN')
        )
    );
   
    __("#toDelete").delete();

    __("#toChange").css("background-color", "green");
    __(".toggleClass").toggleClass("untoggle");

    __(".whatsYourName").onSubmit( function(evt) {
        alert("SUBMITTED!");
    });

    __(".inputForm").onInput(function(evt) {
        alert("INPUTTED!");
    });

    // bugs: ancestor, pre og append og ajax

})