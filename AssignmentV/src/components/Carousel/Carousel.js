import React from 'react'
import PropTypes from "prop-types";
import styles from "./carousel.css";

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0
        };
    };

    changePicture(event, idx) {
        this.setState({currentImage: idx});
    }

    render() {
        const { images } = this.props;
        
        var dots;
        if (images.length > 1){
            dots = images.map((i, idx) => (
                <span
                    className={styles.dot}
                    key={idx}
                    onClick={e => this.changePicture(e, idx)}
                />
            ));
        }
        

        const { currentImage } = this.state;
        return (
            <div className={`${styles.carousel} ${styles[`${this.props.size}`]}`}>
                <div className={`${ (styles.fade)}`} >
                    <img src={images[currentImage]} alt="Loading"/>
                </div>
                <div className={`${styles.dots}`}>{dots}</div>
            </div>
        );
    };

};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  size: PropTypes.string.isRequired
};

export default Carousel;