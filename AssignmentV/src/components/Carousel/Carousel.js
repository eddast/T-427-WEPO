import React from 'react'
import PropTypes from "prop-types";
import styles from "./carousel.css";
import FontAwesome from "react-fontawesome"

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
            <div className={`${styles.carousel} ${styles[`carousel-${this.props.size}`]} `}>
                <div style={{ backgroundImage: `url(${images[currentImage]})`}} className={`${ (styles.fade)} ${styles[`image-${this.props.size}`]}`} >
                    <FontAwesome aria-hidden='false' size='2x' name='chevron-circle-left' onClick={()=> { if(currentImage > 0){ this.setState({currentImage: currentImage-1})}} }/>
                    {/* <img src={images[currentImage]} alt="Loading"/> */}
                    <FontAwesome className={`${ (styles.arrow)}`} aria-hidden='false' size='2x' name='chevron-circle-right' onClick={()=> { if(currentImage < images.length-1){this.setState({currentImage: currentImage+1})}} }/>
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