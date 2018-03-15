import React from 'react';
import styles from './basicstyle.css';
import Modal from'./components/Modal/Modal';
import ProgressBar from'./components/ProgressBar/ProgressBar';
import NameCard from './components/NameCard/NameCard';
import Carousel from './components/Carousel/Carousel';
import Row from './components/Row/Row/Row';
import Col from './components/Row/Col/Col';
import TimePicker from './components/TimePicker/TimePicker';
import DatePicker from './components/DatePicker/DatePicker';
import Tabs from './components/Tabs/Tabs/Tabs';
import Tab from './components/Tabs/Tab/Tab';

class App extends React.Component {

	constructor(props, ctx) {
		super(props,ctx);
		this.state = {
			showModule: false
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
          {this.testCarousel(["https://www.w3schools.com/w3css/img_nature_wide.jpg", "https://www.w3schools.com/w3css/img_mountains_wide.jpg", "https://www.w3schools.com/w3css/img_fjords_wide.jpg"], "large")}
        </div>
        <div className={`${styles["container-item"]}`}>
          <h2>5-6.Rows and Cols Components Demo</h2>
          {this.testRows3()}
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
          <Tabs
            theme="light"
            layout="vertical"
            onSelect={newTab => this.setState({ tab: newTab})}
            currentSelectedTab = {this.state.tab}
          >
            <Tab selectionKey={1} title={"Hi Mommy"} />
            <Tab selectionKey={2} title={"Hi Daddy"} />
            <Tab selectionKey={3} title={"Hey bro"} />
            <Tab selectionKey={4} title={"Hey sis"} />
          </Tabs>
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

	testRows() {
		return <Row>
        <Col size={4} />
        <Col size={4} />
        <Col size={4} />
      </Row>;
	}

	testRows3() {
		return <div>
        <Row>
          <Col size={2} />
          <Col size={2} />
          <Col size={2} />
          <Col size={2} />
          <Col size={2} />
          <Col size={2} />
        </Row>
        <Row>
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
          <Col size={1} />
				</Row>
        <Row>
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
          <Col />
        </Row>
        {/* <Row>
          <Col size={3} />
          <Col size={3} />
          <Col size={3} />
          <Col size={3} />
        </Row> */}
      </div>;
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
      <Tabs>
        <Tab selectionKey={1} title={"Hi Mommy"}></Tab>
        <Tab selectionKey={2} title={"Hi Daddy"}></Tab>
        <Tab selectionKey={3} title={"Hey bro"}></Tab>
        <Tab selectionKey={4} title={"Hey sis"}></Tab>
      </Tabs>
    )
  }
}

export default App;
