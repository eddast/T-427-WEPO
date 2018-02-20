# ChitChat: Your Gateway For Better IM Experience
ChitChat is a small IM-messaging client developed for the course T-427-WEPO Web Programming by Darri Valgarðsson, Edda Steinunn Rúnarsdóttir and Sigurður Sturla Bjarnason.

## Installation and running ChitChat
The ChitChat client depends entirely on the server 'chatserver.js' that relies on a web socket. This server provides practically any logic that involves keeping track of chatrooms, messages, users, etc. Therefore, in order to obtain ChitChat's functionality, this server must be running. If the server is not running when the project is run, the console outputs an error denoting that it cannot connect to the server and user cannot log in nor perform any actions. To run this server, one must have node installed; either node can be downloaded directly from https://nodejs.org/en/download/ or installed in the terminal on a linux based OS. The server is run from terminal/bash via node. To run it, make sure that one has navigated to the correct folder, then run the chatserver via node. See example terminal command below:

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/chatserver - socket
username$ node chatserver.js
```
In addition to this, all external dependencies for the project must be installed for it to work. This is achieved by using npm. npm can be downloaded from https://www.npmjs.com/get-npm or installed in the terminal on a linux based OS or installed via node. npm install automatically installs dependencies required for the project as specified by the package.json file. npm install must be done for the client itself, not to the server as above. To install these dependencies, make sure that one has navigated to the correct folder, then run this command. See example terminal command below: 

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/ChitChat
username$ npm install
```
Then finally, once the server is running and the dependencies have been installed, the project can be run as it's meant to. To run the program, one can use npm start. On npm start, the project will be hosted at https://localhost:9000. npm start must be run for the client, not server just as npm install and therefore needs to be done for the .../ChitChat folder in folder structure. See example terminal command below:

```bash
username$ pwd
~/.../Assignment3-darriv15_eddasr15_sigurdursb16/ChitChat
username$ npm start
```

## How does ChitChat work?
ChitChat provides two pages/views, the initial page (the login page) and the lobby page. The initial page provides minimal functionality but prompts user for a username which he or she must provide to proceed to the lobby page. The lobby page on the other hand contains a list of active chatrooms, the chatroom to which user is joined and corresponding functionality.

### The Login Page: Specifying a Nickname
When prompted for a nickname in the login page, user must input one to proceed to the lobby. This nickname must be valid (f.x. not too long) and nickname must not be in use by another user currently using the client. The following shows an example of a successful login in the system - i.e. nickname is both valid and available. The user is immediately directed to the lobby once he or she presses the 'join in' button:

![alt text](https://image.ibb.co/moeSoH/Login_Success.png "Login Succeeds")

The following shows an example of an invalid nickname, that is, user has attempted to login with a username that is in use by another user in the system:

![alt text](https://image.ibb.co/mnt92c/Login_Fail.png "Login Fails")

### The Lobby
The lobby contains all functionality related to joining and parting chatrooms, creating chatrooms, keeping track of users in chatrooms, chatroom interactions and user interactions. Lobby is composed of a greeting, stating the user's nickname at top, then displays a list of active chatrooms to the left and then displayes the chatroom to which the user is currently joined in the middle along with it's messages and users in chat.

#### Veiwing Active Rooms

#### Creating Chatrooms

#### Joining and Parting a Chatroom

### The Lobby: The Chatroom Component

#### Sending, Viewing and Recieving of Messages in Chatroom

#### Private Messages to Other Users from Chatroom User List

#### Kicking or Banning a User from Chatroom
