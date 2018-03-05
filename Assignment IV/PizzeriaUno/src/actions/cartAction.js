import { GET_CART_CONTENTS, ADD_TO_CART, REMOVE_FROM_CART } from '../constants/cartConstants';

const pizzasInCartKey = 'cartPizzasInventory';

// Removes pizza from 'cart' in local storage
const removeFromCart = (pizza) => {
    var pizzasInCart = JSON.parse(localStorage.getItem(pizzasInCartKey));
    for(var i = 0; i < pizzasInCart.length; i++) {
        if(pizzasInCart[i].id === pizza.id) {
            pizzasInCart.splice(i, 1);
            localStorage.setItem(pizzasInCartKey, JSON.stringify(pizzasInCart));
            break;
        }
    }
    var newCartContents = JSON.parse(localStorage.getItem(pizzasInCartKey));

    return {
        type: REMOVE_FROM_CART,
        payload: newCartContents
    };
} 


// Adds pizza to 'cart' in local storage
const addToCart = (pizza) => {
    var pizzasInCart = JSON.parse(localStorage.getItem(pizzasInCartKey));
    if(pizzasInCart == null) { pizzasInCart = []; }
    pizzasInCart.push(pizza);
    var newCartContents = JSON.stringify(pizzasInCart);
    localStorage.setItem(pizzasInCartKey, newCartContents);
    newCartContents = JSON.parse(newCartContents);

    return {
        type: ADD_TO_CART,
        payload: newCartContents
    };
} 

const getCartContents = () => {
    var pizzasInCart = JSON.parse(localStorage.getItem(pizzasInCartKey));
    if(pizzasInCart === null) {
        pizzasInCart = [];
    }
    return {
        type: GET_CART_CONTENTS,
        payload: pizzasInCart
    };
}

export {
    removeFromCart,
    addToCart,
    getCartContents
}