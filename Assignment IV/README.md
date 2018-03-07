# PizzeriaUno Home Page: A Gateway To the Most Delicious Pizza in the World!
PizzeriaUno is a Home Page for an imaginary pizza-place developed for the course T-427-WEPO Web Programming by Darri Valgarðsson, Edda Steinunn Rúnarsdóttir and Sigurður Sturla Bjarnason.

## Installation and running PizzeriaUno
Resources are retrieved by the webpage via a server which resides in the folder '.../Assignment4-darriv15_eddasr15_sigurdursb16/PizzeriaUnoServer'. Therefore, in order to obtain PizzeriaUno's functionality, this server must be running. To run this server, one must have either npm or node installed; both can be downloaded directly from https://nodejs.org/en/download/ or installed in the terminal on a linux based OS. The server is run either via npm using the command start via node from terminal/bash. To run it, make sure that one has navigated to the correct folder, then run the chatserver via npm or node. See example terminal command below:

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
Pizzeria Uno provides five major views which are accessible from anywhere in the web site either via the navigation bar which is visible in all views, or in case of the inital page via links on page. 
