import React from "react";
import styles from "./row.css";
import PropTypes from 'prop-types';
/**
 *  Row component with bootstrap-like row behaviour
 *  Has Col components as children 
 *  Handles Col overflow such that overflowing component goes to next row
*/
const Row = ({ children }) =>  {
  return getRowContents( children );
}

// Gets row contents of rows: more than one row in case of overflow
const getRowContents = ( children ) => {
    
    // Formats rows with respect to overflow
    let rows = formatOverflow( children ); 

    // Construct each row as JSX
    for(let i = 0; i < rows.length; i++) {
      rows[i] = (<div key={i} className={`${styles.row}`}>{rows[i]}</div>);
    }

    return rows;
}

// Iterate through children cols to check for overflow
// New row is constructed for the overflowing col in case of overflow
const formatOverflow = ( children ) => {

  let sum = 0; let rowContent = []; let rows = [];

  React.Children.map(children, (col) => {
  
    sum = sum + col.props.size;

    // Place col in new row if there's no place for it in current row
    if( sum > 12) {
      rows.push(rowContent);
      sum = col.props.size;
      rowContent = []; // new row
    }

    rowContent.push(col);

  }); rows.push(rowContent);

  return rows;
}

// Should contain children!
Row.propTypes = {
  children: PropTypes.node.isRequired
};

  
export default Row;
