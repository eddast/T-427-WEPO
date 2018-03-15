import React from 'react'
import PropTypes from "prop-types";
import styles from "./carousel.css";

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 1
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
                    key={idx + 1}
                    onClick={e => this.changePicture(e, idx + 1)}
                />
            ));
        }
        

        const { currentImage } = this.state;
        //Three different return statements, one for every size of image
        if (this.props.size === "medium"){
                return (
                <div className={`${styles.container}`}>
                    <div className={`${ (styles.fade)}`} >
                        <img src={images[currentImage - 1]} alt="https://www.w3schools.com/w3css/img_nature_wide.jpg"/>
                    </div>
                    <div className={`${styles.divarounddots}`}>{dots}</div>
                </div>
            );
        }
        else if (this.props.size === "small"){
                return (
                <div className={`${styles.containersmall}`}>
                    <div className={`${ (styles.fade)}`}>
                        <img src={images[currentImage - 1]} alt="https://www.w3schools.com/w3css/img_nature_wide.jpg"/>
                    </div>
                    <div className={`${styles.divarounddots}`}>{dots}</div>
                </div>
            );
        }
        else if (this.props.size === "large"){
                return (
                <div className={`${styles.containerlarge}`}>
                    <div className={`${ (styles.fade)}`}>
                        <img src={images[currentImage - 1]} alt="https://www.w3schools.com/w3css/img_nature_wide.jpg"/>
                    </div>
                    <div className={`${styles.divarounddots}`}>{dots}</div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
        
    };

};

//In case we want to use this later on
Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  size: PropTypes.string.isRequired
};

export default Carousel;