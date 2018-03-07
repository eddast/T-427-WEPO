# PizzeriaUno Home Page: A Gateway To the Most Delicious Pizza in the World!
PizzeriaUno is a Home Page for an imaginary pizza-place developed for the course T-427-WEPO Web Programming by Darri Valgarðsson, Edda Steinunn Rúnarsdóttir and Sigurður Sturla Bjarnason.

## Installation and running PizzeriaUno
Resources are retrieved by the webpage via a server which resides in the folder '.../Assignment4-darriv15_eddasr15_sigurdursb16/PizzeriaUnoServer'. Therefore, in order to obtain PizzeriaUno's functionality, this server must be running. To install server's dependencies, one must have npm installed and run npm install. See example terminal command below:

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/PizzeriaUnoServer
username$ npm install
```

Once dependencies have been installed, server can be run. To run this server, one must have either npm or node installed; both can be downloaded directly from https://nodejs.org/en/download/ or installed in the terminal on a linux based OS. The server is run either via npm using the command start via node from terminal/bash. To run it, make sure that one has navigated to the correct folder, then run the chatserver via npm or node. See example terminal command below:

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/PizzeriaUnoServer
username$ npm start
```
In addition to this, all external dependencies for the project must be installed for it to work. This is achieved by using npm. npm can be downloaded from https://www.npmjs.com/get-npm or installed in the terminal on a linux based OS or installed via node. npm install automatically installs dependencies required for the project as specified by the package.json file. npm install must be done for the client itself, not to the server as above. To install these dependencies, make sure that one has navigated to the correct folder, then run this command. See example terminal command below: 

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/PizzeriaUno
username$ npm install
```
Then finally, once the server is running and the dependencies have been installed, the project can be run as it's meant to. To run the program, one can use npm start. On npm start, the project will be hosted at https://localhost:9000. npm start must be run for the client, not server just as npm install and therefore needs to be done for the .../PizzeriaUno folder in folder structure. See example terminal command below:

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/ChitChat
username$ npm start
```

## How does PizzeriaUno work?
Pizzeria Uno provides five major views which are accessible from anywhere in the web site either via the navigation bar which is visible in all views, or in case of the inital page via links on page. These links are to the __Menu view__ which resides in the home page sub-URI _/pizzas_, the __Offers view__ which resides in the home page sub-URI _/offers_, the __Cart view__ which resides at the home page sub-URI _/cart_, the __About Us view__ which resides in the home page sub-URI _/about_ and finally the __Order view__ which resides at the home page sub-URI _/order_.

# The Home Page
The initial view is the home page of the web application. It contains no logic, but greets user, shows restaurant logo and tagnline and shows the five essential links which can redirect user to desired views:

![alt text](https://image.ibb.co/jSP157/HomePage.png "Home Page")

### The Menu View
The menu retrieves all pizzas from the API and displays them in list:

![alt text](https://image.ibb.co/eOOHxn/MenuPage.png "Menu Page")

Two actions can be made on the pizzas; either enter pizza detail view by clicking the list item or button labeled 'details' below list item, or add pizza to cart via the button 'add to cart'. When pizza is added to cart it can be accessed/viewed in the cart page. Once user adds to cart a message prompts user whether he or she whishes to proceed to immediately checkout their cart, or to keep browsing i.e. stay on the menu page:

![alt text](https://image.ibb.co/c9kVHn/Add_To_Cart_Menu.png "Add To Cart From Menu")


#### The Pizza Detail View
When user clicks 'details' on pizza, they are redirected to a pizza detail view which closely displays pizza information. This detail view is provided with a dynamic URI component corresponding to pizza's id. Once clicked, the pizza detail component which represents the pizza detail view fetches pizza from API using the dynamic URI component as a query parameter for the API. Pizza can also be added to cart in this view, and user gets the same prompt message as when he or she adds a pizza to the cart in the menu view. This view is nota-bene also accessible in cart view:

![alt text](https://image.ibb.co/eMno3S/Pizza_Detail_View.png "Pizza Detail View From Menu")

### The Order View
In the order view user can either use his or her previous order and use that to checkout, or checkout user's cart conents. When user has selected either option, they are directed to the checkout view. This view is rendered differently when either or both options of checkout methods are unavailable. The following shows the four ways the order view can be displayed:
![alt text](https://image.ibb.co/no80Hn/Order_Page.png "Order Page")

#### The Checkout View

##### Delivery Method View
When user has selected which to use for checkout, he is at the checkout view. User is first prompted whether they wish to pick up the pizza or have it delivered:

![alt text](https://image.ibb.co/kQa5Hn/Delivery_Or_Pick_Up_Page.png "Delivery Method View")

##### User Information View
Then user is directed to either forms corresponding to pickup (that is, user needs only to fill out name and telephone) or to forms corresponding to delivery (all address information needs to be provided as well) depending on his choice. All forms are validated properly (f.x. none can be empty, name field can't contain numbers, telephone field can't contain letters, etc.). If user has ordered before, his information is stored in the localStorage and retrieved - if user nas not ordered before, his information must be provided:

![alt text](https://image.ibb.co/gw1Cxn/Forms_Delivery.png "Delivery Method Forms")

##### Review Order View
Now that user has provided all information, he or she is redirected to the review view, where user is prompted to review their information (name, telephone and such) and the items they are about to order:

![alt text](https://image.ibb.co/dvL0iS/Order_Review.png "Order Review Page")

In this view user can review cart (which means he or she is redirected to cart), review information (he or she is redirected to user information view) or confirm his order. Once order is confirmed, it is posted onto the API for storage (can then be retrieved as a previous order which can be checked out in the order page) and user arrives at the confirmation page.

##### Confirmation View
Once user has confirmed his order, a dummy component view displays explicit notification that the API has recieved the order. In this view, user is told that his pizza is in the oven:

![alt text](https://image.ibb.co/hPmUcn/Order_To_Confirmation.png "Order To Confirmation")

### The Cart View
When items for menu are added to cart, they are stored on the local storage. When user navigates to his or her cart, the local storage cart contents are displayed in a list view:

![alt text](https://image.ibb.co/cpA83S/CartPage.png "Cart Page")

From this view, cart contents can be removed or cart can be checked out in which case user goes to same process as explained in the checkout view section above:

![alt text](https://image.ibb.co/jBJviS/Delete_From_Cart.png "Delete From Cart")

![alt text](https://image.ibb.co/dhQaiS/Cart_To_Checkout.png "Checkout Cart")

### The Offers View
When user goes to the offer tab in navigation bar they are presented with all offers from the API:

![alt text](https://image.ibb.co/iZz4A7/Offer_Page.png "Offer Page")

When user clicks these offers, he selects as many pizzas as the offer describes (specific to offer) and only then can proceed to an order review page:

![alt text](https://image.ibb.co/de7PA7/Offer_To_Selection.png "Offer Selection")

![alt text](https://image.ibb.co/dqvY3S/Offer_Selection_Proceed_Fail.png "Offer Selection Proceed Fail")

![alt text](https://image.ibb.co/gTHPA7/Offer_Selection_Proceed_Success.png "Offer Selection Proceed Success")

Once user has selected all pizzas contributing to the offer, he's redirected to forms which correspond to which delivery method offer is valid for (offers are either only valid for delivery or pickup). After filling out these forms as in the usual checkout view, user is presented with an order review page which prompts user to confirm his order. The price is determined by the offer and is followed by an explaination of the pize:

![alt text](https://image.ibb.co/mdHPA7/Offer_Review_Page.png "Offer Review Page")

(On the view above, the Coca-Cola is a pseudo item in the list since API does not recognize Coca-Colas, i.e. it's not actually a part of the order nor is it stored with it when order is posted to the API, it's just there for user feedback). Once confirmed, user proceeds to the confirmation page telling him or her that their pizza is going in the oven just as shown above.

### About Us View
The about us page is dummy view which renders hard-coded information on our imaginary pizza place such as location and image of chefs. That's some sweet ass imaginary pizza-place though:

![alt text](https://image.ibb.co/hC4qHn/AboutUs.png "About Us Page")

## Known Limitations
__Offers:__ Adding offers to API would require an addition to code for the web site to correctly recognize it. Despite being able to generalize offers greatly, the process of adding another offer cannot be automated with the resources given.

__Testing:__ Despite many of the components being fully tested, due to a lack of time and lack of skills using Jest the most complex components, i.e. components that use redux or more advanced logic, could unfortunately not be tested before the due date.
