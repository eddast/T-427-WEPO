//Exercises with JS objects

//JS program to list the properties of a JS object
const student = {
    name: "David Rayy",
    sclass: "VI",
    rollno: 12
};

function getListOfPropertiesFromAnOBject(obj){
    return Object.keys(obj).join(", ");
}

console.log(getListOfPropertiesFromAnOBject(student));

//Get the length of a javascript object
function getLenghtOfObject(obj) {
    return Object.keys(obj).length;
}

console.log(getLenghtOfObject(student));

//Returns a subset of strings using prototype
String.prototype.sub_String = function() {
 var list = [];
  for (let i = 0; i < this.length; i++){
   for (let j = i + 1; j < this.length + 1; j++){
    list.push(this.slice(i,j)); 
   }
  }
  return list;
}

console.log("aloha".sub_String());

//Bubble sort using prototypes
Array.prototype.bubble_sort = function() {
    var returnList = this;
    var isDone = false;

    while (!isDone){
        isDone = true;
        for (let i = 1; i < this.length; i++){
            if (returnList[i] < returnList[i - 1]) {
              let value = returnList[i];
              returnList[i] = returnList[i - 1];
              returnList[i - 1] = value;
              isDone = false;
            }
        }
    }
    return returnList;
}

var list = [6,4,0,3,-2,1];
console.log(list.bubble_sort());

//Javascript program to sort an array of objects by id
Array.prototype.sortBooks = function() {
    let isDone = false;

    while (!isDone){
        isDone = true;
        for (let i = 1; i < this.length; i++){
            if (this[i].libraryID > this[i-1].libraryID){
                let item = this[i];
                this[i] = this[i - 1];
                this[i - 1] = item;
                isDone = false;
            }
        }
    }
    return this;
}

var library = [
  {
    title: "The Road Ahead",
    author: "Bill Gates",
    libraryID: 1254
  },
  {
    title: "Walter Isaacson",
    author: "Steve Jobs",
    libraryID: 4264
  },
  {
    title: "Mockingjay: The Final Book of The Hunger Games",
    author: "Suzanne Collins",
    libraryID: 3245
  }
];

console.log(library.sortBooks());

//JS program to print all the methods in a JS object
function all_properties(obj) {
  return Object.getOwnPropertyNames(obj);
}

console.log(all_properties(Math));

//JS program to parse an URL
function parse_URL(url) {
  var a = document.createElement("a");
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(":", ""),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function() {
      var ret = {},
        seg = a.search.replace(/^\?/, "").split("&"),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split("=");
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
    hash: a.hash.replace("#", ""),
    path: a.pathname.replace(/^([^\/])/, "/$1"),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
    segments: a.pathname.replace(/^\//, "").split("/")
  };
}

console.log(
  parse_URL("https://github.com/pubnub/python/search?utf8=%E2%9C%93&q=python")
);

//JS function to retrieve all the names of object´s own and inherited properties
function allKeys(obj) {
    if (!isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
}
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
function Student(name) {
    this.name = name;
}
Student.prototype.rollno = true;
Student.prototype.favNumber = 23;
console.log(allKeys(new Student("Sara")));
//Prints out ["name","rollno","favNumber"]

//Javascript function to check if an object contains given property
function hasKey(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
}
console.log(hasKey({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" }, "green"));

//JS function to convert an object into a list of pairs
function key_value_pairs(obj) {
    var keys = _keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
        pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
}

function _keys(obj) {
    if (!isObject(obj)) return [];
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
}
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
console.log(key_value_pairs({ red: "#FF0000", green: "#00FF00", white: "#FFFFFF" }));
//prints out [["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]]





//Javascript Dom exercises
//Sample file with a html button.
// < !DOCTYPE html >
//     <html>
//         <head>
//             <meta charset=utf - 8 />
//                 <title>JS DOM paragraph style</title>
// </head>
// <body>
//                 <p id='text'>JavaScript Exercises - w3resource</p>
//                 <div class="changeBackground" onclick="set_background()">
//                     <button id="jsstyle"
//                         onclick="js_style()">Style</button>
//                 </div>
//             </body>
// </html>
// Modify the style of the paragraph text
function js_style() {
    var text = document.getElementById('text');

    text.style.fontSize = "12px";
    text.style.fontFamily = "Helvetica";
    text.style.color = "pink";
}

//Modify the background of the div
function set_background() {
    var bg = document.getElementsByClassName("changeBackground");

    bg.style.backgroundColor = "pink";
}


//Write a JS function to get the value of the href, hreflangt, rel, target and type attributes of the specified link
// < !DOCTYPE html >
//     <html><head>
//         <meta charset=utf - 8 />
// </head>
// <body>
//             <p><a id="w3r" type="text/html" hreflang="en-us" rel="nofollow" target="_self" href="https://www.w3resource.com/">w3resource</a></p>
//             <button onclick="getAttributes()">Click here to get  attributes value</button>
//         </body></html>

function getAttributes() {
    var u = document.getElementById("w3r").href;
    alert('The value of the href attribute of the link is : ' + u);
    var v = document.getElementById("w3r").hreflang;
    alert('The value of the hreflang attribute of the link is : ' + v);
    var w = document.getElementById("w3r").rel;
    alert('The value of the rel attribute of the link is : ' + w);
    var x = document.getElementById("w3r").target;
    alert('The value of the taget attribute of the link is : ' + x);
    var y = document.getElementById("w3r").type;
    alert('The value of the type attribute of the link is : ' + y);
}


//Write a JS function to remove items from a dropdown list
// < !DOCTYPE html >
//     <html><head>
//         <meta charset=utf - 8 />
//             <title>Remove items from a dropdown list</title>
// </head><body><form>
//             <select id="colorSelect">
//                 <option>Red</option>
//                 <option>Green</option>
//                 <option>White</option>
//                 <option>Black</option>
//             </select>
//             <input type="button" onclick="removecolor()" value="Select and Remove">
// </form></body></html>
function removecolor() {
    var x = document.getElementById("colorSelect");
    x.remove(x.selectedIndex); //x.selectedIndex er helvíti sniðugt
}

//JS function that counts and displays the items of a dropdown list in an alert window
// < !DOCTYPE html >
//     <html><head>
//         <meta charset=utf - 8 />
//             <style type="text/css">
//                 body {margin: 30px;}
// </style>
//             <title>Count and display items of a dropdown list - w3resource</title>
// </head><body><form>
//             Select your favorite Color :
// <select id="mySelect">
//                 <option>Red</option>
//                 <option>Green</option>
//                 <option>Blue</option>
//                 <option>White</option>
//             </select>
//             <input type="button" onclick="getOptions()" value="Count and Output all items">
// </form></body></html>
function getOptions() {
    let x = document.getElementById("mySelect");
    let txt1 = "No. of items : ";
    let i;
    let l = document.getElementById("mySelect").length;
    txt1 = txt1 + l;
    for (i = 0; i < x.length; i++) {
        txt1 = txt1 + "\n" + x.options[i].text;
    }
    alert(txt1);
}


//JS function to print the width and height the window any time the window is rezised
function getSize() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    // put the result into a h1 tag
    document.getElementById('wh').innerHTML = "<h1>Width: " + w + " â€¢ Height: " + h + "</h1>";
}


//JS function to highlight the bold words of the following paragraph, on mouse over a certain link
//First create a list of all the bold items
var bold_Items;
window.onload = getBold_items();

// Collect all <strong> tags
function getBold_items() {
    bold_Items = document.getElementsByTagName('strong');
}
// iterate all bold tags and change color  
function highlight() {
    for (var i = 0; i < bold_Items.length; i++) {
        bold_Items[i].style.color = "green";
    }
}
// On mouse out highlighted words become black
function return_normal() {
    for (var i = 0; i < bold_Items.length; i++) {
        bold_Items[i].style.color = "black";
    }
}

