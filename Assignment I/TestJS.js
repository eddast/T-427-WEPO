
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

    console.log("ancestor of child");
    console.log(__(".child").ancestor());
    console.log(__(".child").ancestor(".great-great-grandparent"));
    console.log("ancestor of parent");
    console.log(__(".parent").ancestor());
    console.log(__(".parent").ancestor(".great-grandparent"));
    console.log("ancestor of grandparent");
    console.log(__(".grandparent").ancestor());
    console.log(__(".grandparent").ancestor(".great-great-grandparent"));
    console.log("ancestor of Thisisclass");
    console.log(__(".Thisisclass").ancestor());
    console.log("ancestor of parentDiv");
    console.log(__("#parentDiv").ancestor());
    console.log("ancestor of body");
    console.log(__("body").ancestor());
    console.log("ancestor of html");
    console.log(__("html").ancestor());

    

    // // TESTING PARENT
    // console.log("TESTING PARENT");

    // __("#toChange").css("background-color", "green");

    // console.log("1. Should be [<div>...</div>]");
    // console.log(__("#num1").parent());

    // console.log("1.5. Should be [body]");
    // console.log(__("#grandDiv").parent());

    // console.log("2. Should be [<div>...</div>]");
    // console.log(__("#num1").parent("div"));

    // console.log("3. Should be {}");
    // console.log(__("#num1").parent("head"));

    // console.log("4. Should be {}");
    // console.log(__("#doesnotexist").parent());

    // console.log("5. Should be {}");
    // console.log(__("#doesnotexist").parent("head"));

    // console.log("6. Should be [div, div]");
    // console.log(__(".Thisisclass").parent());

    // console.log("7. Should be [div, div]");
    // console.log(__(".Thisisclass").parent("div"));

    // console.log("8. Should be []");
    // console.log(__(".Thisisclass").parent("head"));

    // // TESTING GRANDPARENT
    // console.log("TESTING GRANDPARENT");

    // console.log("9. Should be [div#grandDiv, div#grandDiv]");
    // console.log(__(".Thisisclass").grandParent());

    // console.log("9 3/4. Should be [body]");
    // console.log(__("#parentDiv").grandParent());

    // console.log("10. Should be [div#grandDiv, div#grandDiv]");
    // console.log(__(".Thisisclass").grandParent("div"));

    // console.log("11. Should be []");
    // console.log(__(".Thisisclass").grandParent("head"));

    // console.log("12. Should be {}");
    // console.log(__("#doesnotexist").grandParent());

    // console.log("13. Should be {}");
    // console.log(__("#doesnotexist").grandParent("head"));

    // console.log("14. Should be [body, div#grandDiv]");
    // console.log(__("div").parent());
    
    // console.log("15. Should be [html, body]");
    // console.log(__("div").grandParent());

    // console.log("16. Should be {}");
    // console.log(__("html").grandParent());

    // console.log("TESTING ANCESTOR");

    // console.log("17. Should be [body, html]");
    // console.log(__(".Thisisclass").ancestor());

    // console.log("18. Should be []");
    // console.log(__("#parentDiv").ancestor());

    // console.log("TESTING ONCLICK");

    // console.log("19. Should be new event");
    // __("#Thisisid").onClick(() => {
    //     alert("changed functionality!");
    // });

    // console.log("20. Should be new event");
    // __(".THINGY").onClick((evt) => {
    //     alert("changed functionality!");
    // });


    // __(".NEW").insertText("GOODBYE");

    // console.log("SHOULD BE TEXT");
    // __("#parentDiv").append("<p>HELLO<\p>");
    // console.log("SHOULD BE NODE");
    // __("#parentDiv").append(
    //     document.createElement('p')
    //         .appendChild(
    //             document.createTextNode('HELLO AGAIN')
    //         )
    // );

    // console.log("SHOULD BE TEXT");
    // __("#parentDiv").prepend("<p>PRE-HELLO<\p>");
    // console.log("SHOULD BE NODE");
    // __("#parentDiv").prepend(
    //     document.createElement('p')
    //     .appendChild(
    //         document.createTextNode('PRE-HELLO AGAIN')
    //     )
    // );

    // console.log("SHOULD BE TEXT");
    // __(".empty").prepend("<p class=\"paragh\">PRE-EMPTY<\p>");
    // console.log("SHOULD BE NODE");
    // __(".empty").prepend(
    //     document.createElement('p')
    //     .appendChild(
    //         document.createTextNode('PRE-EMPTY AGAIN')
    //     )
    // );
   
    // __("#toDelete").delete();

    // __("#toChange").css("background-color", "green");
    // __(".toggleClass").toggleClass("untoggle");

    // __(".whatsYourName").onSubmit( function(evt) {
    //     alert("SUBMITTED!");
    // });

    // __(".inputForm").onInput(function(evt) {
    //     alert("INPUTTED!");
    // });
    
    //console.log(__("html").ancestor());
    //console.log(__("div#grandDiv").ancestor());

    // console.log("== TESTING PARENT ==");
    // console.log("parent of child");
    // console.log(__(".child").parent());

    // console.log("parent of parent");
    // console.log(__(".parent").parent());

    // console.log("parent of grandparent");
    // console.log(__(".grandparent").parent());

    // console.log("parent of somethingthatdoesnotexist");
    // console.log(__("notexists").parent());

    // console.log("Parent of html");
    // console.log(__("html").parent());

    // console.log("parent of body");
    // console.log(__("body").parent("html"));

    // console.log("parent of grandDiv");
    // console.log(__("#grandDiv").parent());
    
    
    // console.log("== TESTING ANCESTOR ==");

    // console.log("Ancestors of child");
    // console.log(__(".child").ancestor());

    // console.log("Ancestors of body");
    // console.log(__("body").ancestor());

    // console.log("Ancestors of html");
    // console.log(__("html").ancestor());

    // console.log("Ancestors of parentDiv");
    // console.log(__("#parentDiv").ancestor());

    // console.log("Ancestors of grandDiv");
    // console.log(__("#grandDiv").ancestor());

    // console.log("Ancestors of Thisisclass");
    // console.log(__(".Thisisclass").ancestor("html"));

    // console.log("Ancestors of somethingthatdoesnotexist");
    // console.log(__("#doesnotexist").ancestor());

    __.ajax({
        url : "https://serene-island-81305.herokuapp.com/400",
        //url : "https://httpbin.org/headers",
        method : "GET",
        headers: [
            {"Authorization" : "no"},
            {"header3" : "val3"},
            {"header4" : "val4"}
        ],
        data : {id : 2410952909, name : "Edda", age : 22 },
        beforeSend : function (resp) {
            console.log("Before!!!");
        },
        success : function (resp) {
            console.log("Success");
            console.log(resp.status);
            console.log(resp.response);
        },
        fail : function (err) {
            console.log("Error");
            console.log(err.status);
            console.log(err.response);
        }
    });
})