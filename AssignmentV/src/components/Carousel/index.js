import React from 'react'
import propTypes from "prop-types";
import styles from "./carousel.css";
import FontAwesome from "react-fontawesome";

/**
 * Displays a Carousel, i.e. a 'still slideshow' where user can navigate images
 * (front and back) in which case previous/next image renders
 */
class Carousel extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = { currentImage: 0 };
    };

    // Renders new picture (next or previous picture)
    changePicture(event, idx) { this.setState({currentImage: idx}); }

    render() {

        const { images } = this.props;
        
        // Construct 'squares' with which user can navigate images in carousel
        // I.e. each square has corresponding index to an image and changes picture
        // to that index in image array when clicked
        var squares;
        if (images.length > 1){
            squares = images.map((i, idx) => (
                <span
                    className={`${styles.square}` + (this.state.currentImage === idx ? ` ${styles.selectedSquare}` : ``)}
                    key={idx}
                    onClick={e => this.changePicture(e, idx)}
                />
            ));
        }
        
        // Display carousel
        // Arrows can also be used instead of squares to navigate image
        const { currentImage } = this.state;
        return (
            <div className={`${styles.carousel} ${styles[`carousel-${this.props.size}`]} `}>
                <div style={{ backgroundImage: `url(${images[currentImage]})`}} className={`${ (styles.imageContainer)} ${styles[`image-${this.props.size}`]}`} >
                    <FontAwesome className={`${ (styles.arrow)} ${ (styles['arrow-left'])}`} aria-hidden='false' size='3x' name='chevron-circle-left' onClick={()=> { if(currentImage > 0){ this.setState({currentImage: currentImage-1})}} }/>
                    <FontAwesome className={`${ (styles.arrow)} ${ (styles['arrow-right'])}`} aria-hidden='false' size='3x' name='chevron-circle-right' onClick={()=> { if(currentImage < images.length-1){this.setState({currentImage: currentImage+1})}} }/>
                </div>
                <div className={`${styles.squares}`}>{squares}</div>
            </div>
        );
    };

};

// Props carousel needs to function
Carousel.propTypes = {
    /* Array of images carousel should display*/
    images: propTypes.array.isRequired,
    /* Carousel size (small, medium, large) */
    size: propTypes.oneOf(['small', 'medium', 'large'])
};

// Default props, if none are provided
Carousel.defaultProps = {
    size: 'medium'
};


export default Carousel;