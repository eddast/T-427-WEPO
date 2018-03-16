import React from 'react';
import styles from './basicstyle.css';
import Modal from'./components/Modal/Modal';
import ProgressBar from'./components/ProgressBar/ProgressBar';
import NameCard from './components/NameCard/NameCard';
import Carousel from './components/Carousel/Carousel';
import TimePicker from './components/TimePicker/TimePicker';
import DatePicker from './components/DatePicker/DatePicker';
import Tabs from './components/Tabs/Tabs';
import Tab from './components/Tabs/Tab';

class App extends React.Component {

	constructor(props, ctx) {
		super(props,ctx);
		this.state = {
      showModule: false,
      currentSelectedTab: 1
    };
	}

	render() {
		return <div className={`${styles.container}`}>
        <div className={`${styles["container-headings"]}`}>
          <h1>Welcome To the InfinityModules DEMO site</h1>
          <p>
            InfinityModules is a library of React components from the studio
            of USA (Universal Style Association). Our goal is to please your
            sight. This page demonstrates the power of our delightfulness.
            Try our fancy library out, go nuts!
          </p>
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>1. Modal Component Demo</h2>
          {this.testModal()}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>2. ProgressBar Component Demo</h2>
          <h3>2.1. Striped ProgressBar</h3>
          {this.testProgressBar(50, "info", false, true)}
          <h3>2.2. Animated ProgressBar</h3>
          <p />
          {this.testProgressBar(50, "info", true, true)}
          <h3>2.3. Different Progresses ProgressBar</h3>
          {this.testProgressBar(10, "info", false, false)}
          {this.testProgressBar(30, "info", false, false)}
          {this.testProgressBar(50, "info", false, false)}
          <h3>2.4. Different States ProgressBar</h3>
          {this.testProgressBar(50, "info", false, false)}
          {this.testProgressBar(50, "success", false, false)}
          {this.testProgressBar(50, "warning", false, false)}
          {this.testProgressBar(50, "danger", false, false)}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>3. NameCard Component Demo</h2>
          {this.testNameCard("Mojo Jojo", "ilovebananas@thebads.com", "+666-777-888", "https://yt3.ggpht.com/a-/AJLlDp0Fqzwoio4JgrqFLkb53ZumHHCfm5jYTuDTyw=s900-mo-c-c0xffffffff-rj-k-no")}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>4.Carousel Component Demo</h2>
          <div>
            <h3>Small</h3>
            {this.testCarousel(["https://www.w3schools.com/w3css/img_nature_wide.jpg", "https://www.w3schools.com/w3css/img_mountains_wide.jpg", "https://www.w3schools.com/w3css/img_fjords_wide.jpg"], "small")}
          </div>
          <div>
            <h3>Medium</h3>
            {this.testCarousel(["https://www.w3schools.com/w3css/img_nature_wide.jpg", "https://www.w3schools.com/w3css/img_mountains_wide.jpg", "https://www.w3schools.com/w3css/img_fjords_wide.jpg"], "medium")}
          </div>
          <div>
            <h3>Large</h3>
            {this.testCarousel(["https://www.w3schools.com/w3css/img_nature_wide.jpg", "https://www.w3schools.com/w3css/img_mountains_wide.jpg", "https://www.w3schools.com/w3css/img_fjords_wide.jpg"], "large")}
          </div>  
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>5-6.Rows and Cols Components Demo</h2>
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>5-6.Rows and Cols Components Demo</h2>
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>7. TimePicker Component Demo</h2>
          {this.timePickerTest(time => this.setState({ time }), 24)}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>8. DatePicker Component Demo</h2>
          {this.datePickerTest(date => this.setState({ date }), "en-En")}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>9. Tabs Component Demo</h2>
          <h3>9.1. Tabs Component Light Theme</h3>
          {this.TabsTest('light', 'horizontal', ( (newTab) => this.setState({currentSelectedTab: newTab}) ), this.state.currentSelectedTab)}
          <h3>9.2 Tabs Component Dark Theme</h3>
          {this.TabsTest('dark', 'horizontal', ( (newTab) => this.setState({currentSelectedTab: newTab}) ), this.state.currentSelectedTab)}
          <h3>9.3. Tabs Component Vertical </h3>
          {this.TabsTest('light', 'vertical', ( (newTab) => this.setState({currentSelectedTab: newTab}) ), this.state.currentSelectedTab)}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>10. CartoonNetworkSpinner Component Demo</h2>
        </div>
      </div>;
	}

	// TESTS MODAL COMPONENT
	testModal() {
		return (
            <div>
                <button onClick={() => this.setState({showModule: true})}>Show Modal</button>
				<Modal
					isOpen={this.state.showModule}
					onClose={() => this.setState({showModule: false})}>
					<Modal.Title>I am the title</Modal.Title>
					<Modal.Body>
						<p>Well hello, I am the modal body</p>
						<p>I don't need to be text, can also be html elements, look:</p>
						<input type="text" placeholder="pretty cool, huh!"/>
					</Modal.Body>
					<Modal.Footer>This is the footer of the Modal</Modal.Footer>
				</Modal>
            </div>
        );
	}

	// TESTS PROGRESS BAR COMPONENT
	testProgressBar(progress, state, animated, striped) {
		return (
			<div>
				<div>
					The following demonstrates a {state} progressBar with {progress}% progress (animated: {String(animated)}, striped: {String(striped)}):
				</div>
				<div>
					<ProgressBar 
						progress={progress}
						animated={animated}
						striped={striped}
						state={state}
					/>
				</div>
			</div>
        );
	}

	testNameCard(name, email, telephone, imageUrl) {
		return (
			<NameCard
				name={name}
				email={email}
				telephone={telephone}
				imageUrl={imageUrl}
			/>
		);
	}

	testCarousel(images, size) {
		return (
			<Carousel
				images={images}
				size={size}
			/>
		);
	}
  
  timePickerTest(onTimePick, format){
    return (
			<TimePicker
				onTimePick={onTimePick}
				format={format}
			/>
		);
  }

  datePickerTest(onDatePick, locale){
     return (
			<DatePicker
				onDatePick={onDatePick}
				locale={locale}
			/>
		);
  }

  TabsTest(theme, layout, onSelect, currentSelectedTab) {
    return (
      <Tabs
        theme={theme}
        layout={layout}
        onSelect={newTab => this.setState({currentSelectedTab: newTab})}
        currentSelectedTab={currentSelectedTab} >
        <Tab selectionKey={1} title={"Edda"}>
          <form action="/action_page.php">
            First name:
            <input type="text" name="firstname" placeholder="Edda" />
            Last name:
            <input type="text" name="lastname" placeholder="Steinunn" />
          </form> 
        </Tab>
        <Tab selectionKey={2} title={"Darri"}>
          <h3>Darri er</h3>
          <ol>
            <li>88% Coffee</li>
            <li>11% Beard</li>
            <li>1% Tattoos</li>
          </ol> 
        </Tab>
        <Tab selectionKey={3} title={"Stulli"}>
          <h2>Stulli</h2>
          <h3>Stulli</h3>
          <p>Stulli</p>
        </Tab>
      </Tabs>
    )
  }
}

export default App;
