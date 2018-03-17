import React from "react";
import PropTypes from "prop-types";
import styles from "./cartoonnetwork.css";

class CartoonNetworkSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      shouldSpin: false,
      interval: this.props.interval,
      images: [
      "http://moziru.com/images/cartoon-network-clipart-cartoon-character-8.jpg",
      "https://static.comicvine.com/uploads/original/0/9116/1029708-johnny_bravo_tv_01.jpg",
      "https://http2.mlstatic.com/adesivo-desenho-as-meninas-superpoderosas-frete-gratis-D_NQ_NP_223411-MLB20548594809_012016-F.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41T5FNqAYHL._SY355_.jpg",
      "https://i.pinimg.com/originals/58/68/e1/5868e1a03656470c1f15acde6c553693.jpg",
      "http://images2.fanpop.com/image/photos/11400000/Robin-teen-titans-boys-11494057-431-500.gif",
      "https://vignette.wikia.nocookie.net/teentitans/images/0/0a/Latest-2.png/revision/latest?cb=20150813183840",
      "https://static.comicvine.com/uploads/scale_small/11/111746/4579604-characterart-scooby-sd.jpg",
      "https://vignette.wikia.nocookie.net/vsbattles/images/8/82/Shaggy_Rogers.png/revision/latest?cb=20180227172028",
      "https://vignette.wikia.nocookie.net/edwikia/images/0/0d/Plank.png/revision/latest?cb=20170726093347"
    ]
    };
  }

  componentDidMount() {
    this.changeImageInterval = setInterval(function() {this.increaseCurrentImage()}.bind(this), this.props.interval * 1000);
    this.spinImageInterval = setInterval(function() {this.spin()}.bind(this), (this.props.interval * 1000)-500);
  }

  componentWillUnmount() {
    clearInterval(this.changeImageInterval);
    clearInterval(this.spinImageInterval);
   };

  increaseCurrentImage(){
    this.setState({shouldSpin: false});
    var size = this.state.images.length; 
    if (size - 1 !== this.state.currentImage){
        console.log('changing current image');
        this.setState({ currentImage: this.state.currentImage + 1});
    } else { this.setState({ currentImage: 0}); }
    clearInterval(this.changeImageInterval);
    clearInterval(this.spinImageInterval);
    this.changeImageInterval = setInterval(function() {this.increaseCurrentImage()}.bind(this), (this.props.interval * 1000));
    this.spinImageInterval = setInterval(function() {this.spin()}.bind(this), (this.props.interval * 1000)-500);
  }

  spin(){
    console.log('should spin');
    this.setState({shouldSpin: true});
    clearInterval(this.changeImageInterval);
    clearInterval(this.spinImageInterval);
    this.changeImageInterval = setInterval(function() {this.increaseCurrentImage()}.bind(this), 1000);
  }

  render() {
    console.log('rendering');
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

CartoonNetworkSpinner.propTypes = {
  interval: PropTypes.number.isRequired
};

CartoonNetworkSpinner.defaultProps = {
  interval: 3
};

export default CartoonNetworkSpinner;
