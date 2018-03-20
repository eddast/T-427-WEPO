# Super Infinity Modules: Your Gateway to A Convenient, Super-Stylish Project!
super-infinity-modules are a npm 
package that provides various components with their own logic, style and purposes. The package was developed for Reykjavik University for the course T-427-WEPO Web Programming by authors Edda Steinunn Rúnarsdóttir, Darri Valgarðsson and Sigurður Sturla Bjarnason. Information on the package can be viewed on https://www.npmjs.com/package/super-infinity-modules.

## Installing the package
Run the following command in your project directory in order to install the package:

```bash
username$ pwd
~/.../Your-Own-Project
username$ npm install --save super-infinity-modules
```

## Additional package requirements
The super-infinity-modules package uses icons from __FontAwesome__. Therefore in order to get expected behaviour from the super-infinity-modules package one must include the following line of code in the index.html of the project that uses the package (this enables FontAwesome icons):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"> 
```

## The Components

### Modal
Modal is similar to the dialog component of MaterialUI and react-modal component of react. It is essentially a white alert box that appears on the center of the screen, providing a gray opague overlay on all material "beneath" the modal to catch a user's focus. 
