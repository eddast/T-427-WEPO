# Super Infinity Modules: Your Gateway to A Convenient, Super-Stylish Project!
super-infinity-modules are a npm 
package that provides various components with their own logic, style and purposes. The package was developed for Reykjavik University for the course T-427-WEPO Web Programming by authors Edda Steinunn Rúnarsdóttir, Darri Valgarðsson and Sigurður Sturla Bjarnason. Information on the package can be viewed on https://www.npmjs.com/package/super-infinity-modules.

## Installing the package
Run the following command in your project directory in order to install the package:

```bash
username$ npm install --save super-infinity-modules
```

## Additional package requirements
The super-infinity-modules package uses icons from __FontAwesome__. Therefore in order to get expected behaviour from the super-infinity-modules package one must include the following line of code in the index.html of the project that uses the package (this enables usage of the icons from the FontAwesome library):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"> 
```

## The Components

### Modal
Modal is similar to the dialog component of MaterialUI and react-modal component of react. It is essentially a white alert box that appears on the center of the screen, providing a gray opague overlay on all material "beneath" the modal to catch a user's focus. The modal component takes in the following props:

* __isOpen__: Boolean. Specifies whether modal is open or not. This value defaults to false if this prop is not provided.
* __onClose__ (Required!): Function. Specifies which actions are taken when the modal closes.

In addition to this, the modal can contain the following children (all of which are optional):

* __Modal.Title__: JSX. The Modal title appearing at the top of the Modal screen.
* __Modal.Body__: JSX. The Modal body appearing in the middle of the Modal screen.
* __Modal.Footer__: JSX: The Modal footer appearing in the bottom left corner of the Modal.

#### Modal Example Usage: 
The following shows a button that shows the Modal component. The modal component renders title, body and footer.

__JSX:__

```html
<button onClick={() => this.setState({showModule: true})}>Show Modal</button>
<Modal
  isOpen={this.state.showModule}
  onClose={() => this.setState({showModule: false})}
>
    <Modal.Title>I am the title</Modal.Title>
    <Modal.Body>
        <p>Well hello, I am the modal body</p>
        <p>I don't need to be text, can also be html elements, look:</p>
        <input type="text" placeholder="pretty cool, huh!"/>
		</Modal.Body>
		<Modal.Footer>This is the footer of the Modal</Modal.Footer>
</Modal>
```
__Result:__
![alt text](https://image.ibb.co/fdBDqH/Modal.png "Modal Example")
