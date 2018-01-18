

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
    window.__.ajax = ajax;

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

            let parentList = [ ];

            for(let i = 0; i < this.elements.length; i++) {

                let parent = _getParent(this.elements[i], selector);
                if(!_isEmpty(parent)) {
                    parentList.push(parent);
                }
            }
            return new MakeBelieveObject(parentList);
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
        // Checks whether object is empty
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

            if ( !_isEmpty(this.elements) ) {

                let ancestors = this.grandParent();

                for(let i = 0; i < ancestors.elements.length; i++) {

                    let ancestor = ancestors.elements[i];
                    while(!ancestor.matches("html") && ancestor.parentNode !== undefined) {

                        ancestor = ancestor.parentNode;
                        if(selector === undefined || ancestor.matches(selector)){

                            ancestorList.push(ancestor);
                        }
                    }
                }
            }
            
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

        /*      12.  CSS STYLE ADDER
         *      Adds a given value to given style to HTML element */
        this.css = (cssElem, value ) => {

            for (let i = 0; i < this.elements.length; i++) {

                let elem = this.elements[i];
                elem.style[cssElem] = value;
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

    /*      11.  AJAX
    *       Sends HTTP request to requested URL (must be provided)
    *       Parameter can contain additional HTTP request info such as data
    *       Default method: GET */
    function ajax (configs) {

        let configurations = configs;

        // URL is required, if none is provided throw error
        if(!configurations.hasOwnProperty('url')){
            throw new Error("Ajax must take in URL to process request");
            return;
        }
        let url = configurations.url;

        // Set user inputted parameters if they are provided
        let method = "GET";
        if(configurations.hasOwnProperty('method')){
            method = configurations.method;
        } let data = {};
        if(configurations.hasOwnProperty('data')){
            data = configurations.data;
        } let success = null;
        if(configurations.hasOwnProperty('success')){
            success = configurations.success;
        } let fail = null;
        if(configurations.hasOwnProperty('fail')){
            fail = configurations.fail;
        } let beforeSend = null;
        if(configurations.hasOwnProperty('beforeSend')){
            beforeSend = configurations.beforeSend;
        }
        
        // Initiate request and open it with method and url
        var request = new XMLHttpRequest();
        request.open( method, url );

        // Set timeout, if provided - otherwise none is set
        if(configurations.hasOwnProperty('timeout')){
            request.timeout = configurations.timeout;
        }

        // Setting all headers provided in parameter if there are any
        for(let i = 0; i < configurations.headers.length; i++){

            let header = configurations.headers[i];
            var keys = Object.keys(header);
            request.setRequestHeader(keys[0], header[keys[0]]);
        }
    
        // Fire before send function up if one was provided
        if(beforeSend) { beforeSend(request); }

        // Set specifications and actions once request is sent
        // Does not neccessarily mean request passed through
        request.onreadystatechange = function () {
        
            if(request.readyState === XMLHttpRequest.DONE) {

                    // Request OK (status code is 2xx)
                    // Fires up success function if one was provided
                    if(request.status >= 200 && request.status < 300) {
                        if(success) { success(request); }
                    // Error with request
                    // Fires up fail function if one was provided
                    } else {
                        if(fail)    { fail(request); }
                    }
            }
        }

        // Send request with data
        request.send(data);
    }

})();