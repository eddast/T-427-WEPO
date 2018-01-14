

/*  ========================================================
 *
 * 		    T-427-WEPO Web Programming II
 * 		    Reykjavik University
 * 		    Assignment 1: MakeBelieve
 * 		    Assignment Due: 21.01.2018
 * 		    Authors:    Darri Valgarðsson
 *                      Edda Steinunn
 *                      Sigurður Marteinn Lárusson
 *
    ======================================================== */

(function () {

        /*      1.  DEFINING THE "__" KEYWORD */
        window.__ = makeBelieveFunctionality;

        function makeBelieveFunctionality (selector) {
    
        /*      2.  THE QUERY SELECTOR
         *      Returned along with other methods */
        let elements = document.querySelectorAll(selector);
    
        return new MakeBelieveObject(elements);
    }

    function MakeBelieveObject (queryElements) {

        this.elements = queryElements;

        /*      3.  THE PARENT SELECTOR
         *      Returns parent of selector
         *      If nested selector is provided within this method,
         *      it returns parent only if it matches that selector
         *      Otherwise an empty object */
        this.parent = (selector) => {
    
            let children = this.elements;
    
    
                if (children.length > 1)        { return _getParentList (children, selector); }
                else if (children.length == 1)  { return _getParent (children[0], selector); }
                else if (children != undefined) { 
                    let parent = children.parentNode;
                    if (parent != null) { return parent; }
                }
    
                return { };
        };
        // Parent helper function 
        let _getParent = (child, nestedSelector) => {
    
            if(nestedSelector !== undefined)    { return _checkParentSelector(child.parentNode, nestedSelector); }
            else                                { return child.parentNode; }
        }
        // Parent helper function 
        let _checkParentSelector = (parent, nestedSelector) =>  {   
    
            if ( parent.matches(nestedSelector) ) { return parent; }
    
            return { };
        }
        // Parent helper function 
        let _getParentList = (children, nestedSelector) => {
            
            let parentList = [ ];
            for( let i = 0; i < children.length; i++ ) {
    
                    let currParent = _getParent (children[i], nestedSelector);
                    if ( _isEmpty(currParent) )  { continue; }
                    else                        { parentList.push(currParent); }
            }
    
            return parentList;
        }
        // Parent helper function - checks whether object is empty
        function _isEmpty(obj) {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        }

         /*      4.  THE GRANDPARENT SELECTOR
         *      Returns grandparent of selector
         *      If nested selector is provided within this method,
         *      it returns grandparent only if it matches that selector
         *      Otherwise an empty object */
        this.grandParent = (selector) => {
    
            let child = this.elements;
            this.elements = this.parent();
            let grandParent = this.parent(selector);
            this.elements = child;

            return grandParent;
        };

        /*      4.  THE ANCESTOR SELECTOR
         *      Returns ancestors of selector
         *      If nested selector is provided within this method,
         *      it returns ancestor only if it matches that selector
         *      Otherwise an empty object */
        this.ancestor = (selector) => {

            let children = this.elements;
            let ancestorList = [ ];

            let grandParents = this.grandParent();
            
            for(let i = 0; i < grandParents.length; i++){
                this.elements = grandParents[i];

                let ancestor = this.parent(selector);
                
                
                while (ancestor !== undefined && !_isEmpty(ancestor) ) {

                        ancestorList.push(ancestor);
                        if (ancestor.matches("html")) { break; }
                        child = ancestor;
                        this.elements = child;
                        ancestor = this.parent(selector);
                }
            }
            
            this.elements = children;

            return ancestorList;
        };
    }

})();

