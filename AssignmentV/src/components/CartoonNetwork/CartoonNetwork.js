import React from "react";
import PropTypes from "prop-types";
import styles from "./cartoonnetwork.css";

class CartoonNetworkSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //In our state we initialise what image we wish to display first
      currentImage: 0,
      //And store our list of images
      images: [
      "https://img00.deviantart.net/3873/i/2016/249/a/6/cartoon_network_vs_nick_3ds_cover_by_thegamerlover-dagrlqb.jpg",
      "https://pmctvline2.files.wordpress.com/2017/09/cartoon-network-best-shows-billy-and-mandy.jpg?w=620",
      "https://i.enkirelations.com/ayccvHUtFYE6LTrKLmjYcr1IEhc=/800x0//images/2016/12/795d02dd29000acf51273a5c42e11f74.jpg",
      "http://cdn.kidscreen.com/wp/wp-content/uploads/2017/10/powerpuffgirls-special.jpg?97ea13",
      "https://metrouk2.files.wordpress.com/2017/05/snip20170626_182.png?w=748&h=411&crop=1",
      "https://www.watchcartoononline.io/thumbs/Dexter--s-Laboratory-Season-2-Episode-25-Critical-Gas--Let-s-Save-the-World-You-Jerk--Average-Joe.jpg",
      "https://www.blog.embmall.com/uploads/2017/04/10202-Fabulously-Single-Johnny-Bravo-Embroidery-Design.jpg",
      "https://s1-ssl.dmcdn.net/YHqPL.gif",
      "https://pmcdeadline2.files.wordpress.com/2015/08/scooby-doo.jpg?crop=193px%2C0px%2C707px%2C474px&resize=446%2C299",
      "http://images2.fanpop.com/images/photos/4000000/flintstones-the-flintstones-4083036-480-320.jpg"
    ]
    };
  }

  increaseCurrentImage(){
    var size = this.state.images.length; 
    if (size - 1 !== this.state.currentImage){
        this.setState({ currentImage: this.state.currentImage + 1 });
    }
    else{
        this.setState({ currentImage: 0});
    }
  }

  render() {
    // console.log("The interval is: " + this.props.interval);

    //We call the increaseCurrentImage function after each interval seconds with setTimeout
    setTimeout(this.increaseCurrentImage.bind(this), this.props.interval * 1000);
    return (
      <div className={`${styles.container}`}>
        <div
          className={`${styles.images}`}
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
