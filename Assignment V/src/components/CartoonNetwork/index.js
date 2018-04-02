import React from "react";
import PropTypes from "prop-types";
import styles from "./cartoonnetwork.css";

/**
 * Displays a CartoonNetwork Spinner: displays a cartoon network character
 * Spins in an even interval in a washer-machine effect,
 * Renders new character image when spinning
 */
class CartoonNetworkSpinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      shouldSpin: false,
      interval: this.props.interval,
      images: CartoonNetworkCharacters
    };
  }

  // Sets interval: image changes every {interval} seconds,
  // And spins happens every {interval}-0.5 seconds and lasts
  // until new image has rendered
  // Clears interval when unmounted, that does not happen automatically :(
  componentDidMount() { this.setIntervals() }
  componentWillUnmount() { this.clearIntervals(); };

  // Clears intervals
  clearIntervals() {
    clearInterval(this.changeImageInterval);
    clearInterval(this.spinImageInterval);
  }

  // Sets intervals
  setIntervals() {
    this.changeImageInterval = setInterval(function() {this.increaseCurrentImage()}.bind(this), (this.props.interval * 1000));
    this.spinImageInterval = setInterval(function() {this.spin()}.bind(this), (this.props.interval * 1000)-500);
  }

 // Triggers render for next image in spinner
  increaseCurrentImage(){

    // When new image is rendered, spin stops
    this.setState({shouldSpin: false});

    // Render next image
    if (this.state.images.length - 1 !== this.state.currentImage){
        this.setState({ currentImage: this.state.currentImage + 1});
    } else {
      this.setState({ currentImage: 0});
    }
    
    // Intervals are resetted, in case
    this.clearIntervals();
    this.setIntervals();

  }

  // Triggers spin just before image change in spinner
  spin(){
    this.setState({shouldSpin: true});

    // Interval resetted, in case
    clearInterval(this.changeImageInterval);
    clearInterval(this.spinImageInterval);
    this.changeImageInterval = setInterval(function() {this.increaseCurrentImage()}.bind(this), 500);
  }

  render() {
    return (
      <div className={`${styles.container}`}>
        <div
          className={`${styles.images} ${this.state.shouldSpin && styles.spin}`}
          style={{ backgroundImage: `url(${this.state.images[this.state.currentImage]})` }}
        />
      </div>
    );
  }
}

// Hard-coded CartoonNetwork character avatar images
const CartoonNetworkCharacters = [
  "http://www.pngmart.com/files/4/Dexters-Laboratory-PNG-Transparent-Image.png",
  "https://vignette.wikia.nocookie.net/johnnybravo/images/b/bb/Johnnyb001.gif/revision/latest?cb=20120620184904",
  "https://vignette.wikia.nocookie.net/villains/images/b/b3/Mojo_Jojo_2016.png/revision/latest/scale-to-width-down/300?cb=20170613192420",
  "https://vignette.wikia.nocookie.net/powerpuff/images/2/23/Blossom-pic.png/revision/latest?cb=20130517081824",
  "https://i.pinimg.com/originals/58/68/e1/5868e1a03656470c1f15acde6c553693.jpg",
  "http://images2.fanpop.com/image/photos/11400000/Robin-teen-titans-boys-11494057-431-500.gif",
  "https://vignette.wikia.nocookie.net/teentitans/images/0/0a/Latest-2.png/revision/latest?cb=20150813183840",
  "https://www.wbkidsgo.com/Portals/4/Images/Content/Characters/Scooby/characterArt-scooby-SD.png",
  "https://vignette.wikia.nocookie.net/vsbattles/images/8/82/Shaggy_Rogers.png/revision/latest?cb=20180227172028",
  "https://vignette.wikia.nocookie.net/edwikia/images/0/0d/Plank.png/revision/latest?cb=20170726093347"
]

// User-specified interval between image changes in Spinner
// Defaults to 3
CartoonNetworkSpinner.propTypes = {
  interval: PropTypes.number
};

// Default props, if none are provided
CartoonNetworkSpinner.defaultProps = {
  interval: 3
};

export default CartoonNetworkSpinner;
