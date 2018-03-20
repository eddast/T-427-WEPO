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
import { Modal } from 'super-infinity-modules';

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

### ProgressBar
The progress bar visually shows user the progress of an event. It takes in as props the following values:
* __progress__(Required!) Number in the range of 0-100. An error is raised if this prop is invalid, i.e. not a number or not within the given range. This value specifies in percentage the progress the progress bar shows.
* __state__ (Required!): A string that's either 'info', 'success', 'warning' or 'danger'. Determines the progress bar color.
* __striped__: Boolean. Determines whether bar is striped. This value defaults to false if this prop is not provided.
* __animated__: Boolean. Determines whether bar is animate. This value defaults to false if this prop is not provided. __NOTE HOWEVER__ that this prop has no effect if the striped prop is false. Animation is based solely on progress bar stripes.

#### the Progress Bar Striped and Animated Props
The following demonstrates how setting the striped prop to true for a progress bar changes it's appearance:

__Striped prop true__

![alt text](https://image.ibb.co/grv9Ec/striped.png "Striped Progress Bar")

__Striped prop false__

![alt text](https://image.ibb.co/jBmufH/not_striped.png "Stripeless Progress Bar")

If animated, the stripes move forward infinitely and linearily. __NOTE HOWEVER__ that the animated props has no effect if the striped prop is set to false. The animation depends solely on the progress bar being striped.

#### the Progress Bar Progress Prop
The following demonstrates various percentages of progress for a progress bar:

![alt text](https://image.ibb.co/bBqbuc/different_progress.png "Progress Bar different progresses")

The progress is the % of the progress bar width as whole.

#### the Progress Bar State Prop
As stated, the state prop changes progress bar colors. The following demonstrates how the state prop varies by which prop user gives it. In order of appearence: 'info', 'success', 'warning' and last 'danger.

![alt text](https://image.ibb.co/dbTUEc/different_states.png "Progress Bar different states")

#### ProgressBar Example Usage: 
__JSX:__

```html
import { ProgressBar } from 'super-infinity-modules';

<ProgressBar 
	progress={50}
	animated={true}
	striped={true}
	state='info'
/>

```

__Result:__

![alt text](https://image.ibb.co/grv9Ec/striped.png "Striped Progress Bar")

### NameCard

The NameCard component displays a name card for user given name, email, telephone and imageURL. It takes in as props (all of which are required):

* __name__(Required!): String. name of cardholder.
* __email__(Required!): String. email of cardholder.
* __telephone__(Required!): String. telephone of cardholder.
* __imageUrl__(Required!): String. URL for cardholder profile image to be displayed on card.

#### NameCard Example Usage: 
__JSX:__

```html
import { NameCard } from 'super-infinity-modules';

<NameCard
	name="Mojo Jojo"
	email="ilovebananas@thebads.com"
	telephone="+666-777-888"
	imageUrl="https://yt3.ggpht.com/a-/AJLlDp0Fqzwoio4JgrqFLkb53ZumHHCfm5jYTuDTyw=s900-mo-c-c0xffffffff-rj-k-no"
/>

```

__Result:__

![alt text](https://image.ibb.co/gYUuEc/Screen_Shot_2018_03_20_at_19_15_30.png "NameCard")


### Carousel

The Carousel component displays specified images in a slideshow that can be navigated. It's size can be manipulated. It takes in as props:

* __images__(Required!): Array of Strings. URL to images to be displayed in carousel.
* __size__: String, either 'small', 'medium' or 'large'. Determines the size of carousel. Defaults to medium if none is provided.

#### Carousel Navigation
The Carousel can be navigated either by the arrows the carousel provides or by the squares appearing at the bottom. These squares essentially correspond to image array indices. The following demonstrates both ways of navigating the carousel:

![alt text](https://image.ibb.co/facQLH/arrownavigation.png "Carousel Navigation via Arrows")

![alt text](https://image.ibb.co/dtmKfH/squarenavigation.png "Carousel Navigation via Squares")

#### Carousel Example Usage: 
__JSX:__


```html
import { Carousel } from 'super-infinity-modules';

<Carousel 
	images={["http://7wallpapers.net/wp-content/uploads/16_Jared-Padalecki.jpg","https://media1.popsugar assets.com/files/thumbor/SvTqx-9t-SqT1V2Ndezi7UxMzGQ/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2015/08/13/925/n/1922398/0a63aaf8015ce614_jared_padalecki-friday_the_13th-14/i/OhMyGod-Shirtless-Shot.jpg", "http://7wallpapers.net/wp-content/uploads/2_Jared-Padalecki.jpg", "http://7wallpapers.net/wp-content/uploads/5_Jared-Padalecki.jpg"]}
	size="small"
/>

```

__Result:__

![alt text](https://image.ibb.co/mxQUfH/examplecarousel.png "Example Carousel")

### Row and Col

The rows and col components correspond to a gridsystem very similar to the bootstrap grid system. The row component takes in col components and children and the col component takes in the following prop

* __size__(Required!) Number in the range of 0-12. An error is raised if number is invalid and not in the range. Corresponds to column size. 12 is a full row, 6 is a half-row, etc.

## Row with Multiple Col component

Rows can contain multiple columns. The following demonstrates a row with multiple columns of various sizes:

![alt text](https://image.ibb.co/cq4KEc/SimleEx.png "Simple Example Grid System")

## Rows' height adjusts with Col component height

Rows' height are automatically adjusted by the Col height and corresponds to the Row's highest Col. The following demonstrates a row with multiple columns which vary in height:

![alt text](https://image.ibb.co/fQMzEc/HeightEx.png "Height Example Grid System")

## Overflowing Col Components in a Row
When the sum of Col component's size prop in a single Row exceed 12, the Col that exceeded 12 is moved to the next row below. The following demonstrates such overflow with component of size 3,5 and 6. Since 3+5+6 = 14, the last Col, Col of size 6 overflows to a new row below:
![alt text](https://image.ibb.co/bQOqLH/Overflow_Ex.png "Overflow Example Grid System")

#### Row and Col Example Usage: 

__JSX:__

```html
import { Row, Col } from 'super-infinity-modules';

<Row>
	<Col size={2}>IM SIZE TWO</Col>
	<Col size={2}>IM SIZE TWO</Col>
	<Col size={4}>IM SIZE FOUR</Col>
	<Col size={3}>IM SIZE THREE</Col>
	<Col size={1}>IM SIZE ONE</Col>
</Row>

```

__Result:__

![alt text](https://image.ibb.co/cq4KEc/SimleEx.png "Simple Example Grid System")

### TimePicker
The TimePicker component poses as an input box which when clicked expands into an time picker interface with a interactive clock showing user which time he has picked. Hours and minutes can be altered both by clicking them (in which case an input box appears, prompting user to input an hour or minute) or by using the arrows above the hours or minutes to increment and decrement them. The TimePicker can either take the form of a military time picker (24HRS) or 12H time picker (which then provides AM/PM identifier). The TimePicker component takes in as props:

* __format__: Number, either 12 or 24. Determines whether time picker shows military time or 12H with AM/PM identifier. Defaults to 24 (military time).
* __onTimePick__ (Required!): Actions taken when user picks a time. Takes in time string as parameter.


### Using the TimePicker

The following shows a 24HRS format TimePicker to demonstrate how user can pick a time, both by using the arrow to increment his time and by clicking the time and using an input box to change it:

__Military Time TimePicker:__

![alt text](https://image.ibb.co/c1N9fH/Time1.png "TimePicker Expand From Input Box")

![alt text](https://image.ibb.co/drk6Sx/Time2.png "TimePicker Increment With Arrows")

![alt text](https://image.ibb.co/jpnaLH/Time3.png "TimePicker Change With Input Box")

__12H AM/PM TimePicker:__

![alt text](https://image.ibb.co/fOXmSx/Time2_copy_2.png "TimePicker Change AM/PM")

#### TimePicker Usage: 

__JSX:__

```html
import { TimePicker } from 'super-infinity-modules';

<TimePicker
	onTimePick={time => this.setState({ time: time }}
	format={24}
/>
<p>Time from timepicker: {this.state.time}</p>

```

__Result:__

![alt text](https://image.ibb.co/nn120H/Time_Picker_Ex.png "TimePicker Example")


### CartoonNetworkSpinner

The CartoonNetworkSpinner component includes a spinner including your favorite characters from Cartoon Network. The CartoonNetworkSpinner takes in the following props:

* __interval__: Number. Denotes number of seconds that the spinner should wait before changing displayed character. The value defaults to 3 if not provided.

### CartoonNetworkSpinner example usage

__JSX:__

```html
import { CartoonNetworkSpinner } from 'super-infinity-modules';

<CartoonNetworkSpinner interval={2} />
```

__Result:__

![alt text](https://image.ibb.co/gteSZc/spinner.png "CartoonNetworkSpinner Example")
