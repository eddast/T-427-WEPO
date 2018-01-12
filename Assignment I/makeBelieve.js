

/*  ========================================================
 *
 * 		    T-427-WEPO Web Programming II
 * 		    Reykjavik University
 * 		    Assignment 1: MakeBelieve
 * 		    Assignment Due: 21.01.2018
 * 		    Authors:    Darri Valgarðsson
 *                      Edda Steinunn
 *                      [Siggi/Skúli?]
 *
    ======================================================== */






/*      1.  DEFINING THE "__" KEYWORD */
let __ = makeBelieveFunctionality;

function makeBelieveFunctionality (selector) {

    /*      2.  THE QUERY SELECTOR
     *      Returned along with other methods */
    let _querySelector = document.querySelectorAll(selector);


    /*      3.  THE PARENT SELECTOR
     *      Returns parent of selector
     *      If nested selector is provided within this method,
     *      it returns parent only if it matches that selector
     *      Otherwise an empty object */
    let _parent = (nestedSelector) => {

        let children = _querySelector;

        if (children.length > 1)        { return _getParentList (children, nestedSelector); }
        else if (children.length == 1)  { return _getParent (children[0], nestedSelector); }
        else                            { return {}; }
    };
    // Parent helper function 
    let _getParent = (child, nestedSelector) => {
        if(nestedSelector !== undefined)    { return _checkParentSelector(child.parentNode, nestedSelector); }
        else                                { return child.parentNode; }
    }
    // Parent helper function 
    let _checkParentSelector = (parent, nestedSelector) =>  {   

        let selectorList = document.querySelectorAll(nestedSelector);

                for(let i = 0; i < selectorList.length; i++) {
                    if(parent === selectorList[i]) { return parent; }
                }

                return { };
    }
    // Parent helper function 
    let _getParentList = (children, nestedSelector) => {
        
        let parentList = [ ]; let emptyParent = { };

        for( let i = 0; i < children.length; i++ ) {
                let currParent = _getParent (children[i], nestedSelector);
                if ( isEmpty(currParent) )  { continue; }
                else                        { parentList.push(currParent); }
        }

        return parentList;
    }
    
    // Checks whether object is empty
    function isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }



    // All methods returned at the end of the function
    // to make the library's methods usable
    return methods = {
        querySelector: _querySelector,
        parent: _parent
    };

}