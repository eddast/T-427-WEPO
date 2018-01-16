

/*  ========================================================
 *
 *      T-427-WEPO Web Programming II
 *      Reykjavik University
 *      Assignment 1: MakeBelieve
 *      Assignment Due: 21.01.2018
 *      Authors:
 *              Darri Valgarðsson,
 *              Edda Steinunn,
 *              Sigurður Marteinn Lárusson
 *
    ======================================================== */

(function () {

        /*      1.  DEFINING THE "__" KEYWORD */
        window.__ = makeBelieveFunctionality;

        function makeBelieveFunctionality (selector) {
    
            /*      2.  THE QUERY SELECTOR */
            let elements = document.querySelectorAll(selector);
        

            return new MakeBelieveObject(elements);
        }

    function MakeBelieveObject (queryElements) {

        this.elements = queryElements;

        // Helper functions - retuns true if elements are empty
        this.empty = ()=> {

            if  ((this.elements === undefined) ||
                 (this.elements === null)) {
                     
                return true;
            }


            return this.elements == { };
        }

        this.isObject = () => {

            return this.elements === Object(this.elements) && this.elements != null;
        }

        /*      3.  THE PARENT SELECTOR
         *      Returns parent of selector
         *      If nested selector is provided within this method,
         *      it returns parent only if it matches that selector
         *      Otherwise an empty object */
        this.parent = (selector) => {
    
            let children = this.elements;

            if( this.empty()) { return new MakeBelieveObject({}); }

            // If we are working with more than one children
            // A make believe object with a list is returned
            if (children.length > 1) { 
                
                let parentList = _getParentList (children, selector); 

                return new MakeBelieveObject(parentList);
            }
            // If we are working with one child
            // A make believe object with a single object (parent) is returned
            else if (children.length == 1) { // Element is a list of one object

                let parent =  _getParent (children[0], selector); 

                return new MakeBelieveObject(parent);
            }
            else if(this.isObject()){ // Element is a single object

                let parent =  _getParent (children, selector); 

                return new MakeBelieveObject(parent);
            }

            return new MakeBelieveObject({});
        };
        // Parent helper function - gets a single parent
        let _getParent = (child, nestedSelector) => {

            if( _isEmpty(child) ||
                child.matches("html") )         { return { }; }
            if(nestedSelector !== undefined)    { return _checkParentSelector(child.parentNode, nestedSelector); }
            else                                { return child.parentNode; }
        }
        // Parent helper function - checks if parent matches selector provided
        let _checkParentSelector = (parent, nestedSelector) =>  {   
    
            if ( parent.matches(nestedSelector) ) { return parent; }
    

            return { };
        }
        // Parent helper function - gets list of parents from list of children
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

            let par = this.parent();
            let grandparent = par.parent();


            return grandparent;
        };

        /*      5.  THE ANCESTOR SELECTOR
         *      Returns list of ancestors of selector
         *      If nested selector is provided within this method,
         *      it returns ancestors only if they match that selector */
        this.ancestor = (selector) => {

            let ancestorList = [ ];
            let ancestors = this.grandParent();
            let currAncestor;

            if(_isEmpty(ancestors.parent().elements)) { return new MakeBelieveObject({}); }

            // Pushes in ancestors, starting from grandparent's parent
            // Breakes when HTML occurs, as we don't want to return #document
            do {

                ancestors = ancestors.parent();

                if(ancestors.elements.length === undefined) {
            
                    if (selector === undefined || currAncestor.matches(selector)) { 
                        ancestorList.push(ancestors.elements);
                    }
                    continue;
                }
                for (let i = 0; i < ancestors.elements.length; i++) {

                    currAncestor = ancestors.elements[i];
                    if (selector === undefined || currAncestor.matches(selector)) { 
                        ancestorList.push(currAncestor);
                    }
                }
                if (currAncestor !== undefined && currAncestor.matches("html")) {
                    break; 
                }
            } while (!ancestors.elements.matches("html")); 


            return ancestorList;
        };

        /*      6.  ADDS ONCLICK EVENT 
         *      Takes in functionality and has elements provide
         *      that functionality when clicked */
        this.onClick = (clickEvent) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.addEventListener('click', clickEvent);
            }
        };

        /*      7.  INSERT TEXT 
         *      Inserts or replaces text of an HTML element */
        this.insertText = (text) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.innerHTML = text;
            }
        };

        /*      8.  APPEND TEXT
         *      Appends text or HTML node to HTML element */
        this.append = (text) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                let previousText = elem.innerHTML;
                if (!text.nodeName) {
                    elem.innerHTML = previousText + text;
                } else { 
                    elem.appendChild(text.parentElement);
                }
                
            }
        };

        /*      9.  PREPEND TEXT
         *      Prepends text or HTML node to HTML element */
        this.prepend = (text) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                let previousText = elem.innerHTML;
                if (!text.nodeName) {
                    elem.innerHTML = text + previousText;
                } else { 
                    elem.insertBefore(text.parentElement, elem.childNodes[0]);
                }
                
            }
        };

        /*      10.  DELETE
         *      Deletes HTML element and children from DOM tree (document) */
        this.delete = () => {
            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.parentNode.removeChild(elem);
            }
        };

        /*      11.  AJAX
         *      ???? */
        this.ajax = (URL, configs) => { }

        /*      12.  CSS STYLE ADDER
         *      Adds a given value to given style to HTML element */
        this.css = (cssElem, value ) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.setAttribute("style", cssElem + ": " + value);
            }
            
        };

        /*      13.  TOGGLE CLASS
         *      Toggles class identification from HTML element */
        this.toggleClass = (className) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.classList.toggle(className);
            }
            
        };

        /*      14.  ON SUBMIT FUNCTION
         *      Adds functionality to submission for HTML forms */
        this.onSubmit = (functionality) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.onsubmit = functionality;
            }
        };

        /*      15.  ON INPUT FUNCTION
         *      Adds functionality to input for HTML input tags */
        this.onInput = (functionality) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.oninput = functionality;
            }
        };
    }
})();