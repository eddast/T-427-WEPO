import React from "react";
import styles from "./row.css";

class Row extends React.Component {

  getRowContents() {
    
    let sum = 0;
    let rowContent = [];
    let rows = [];
    let content = [];

    {React.Children.map(this.props.children, (col) => {
      sum = sum + col.props.size;
      // Place col in new row if there's no place for it in current row
      if( sum > 12) {
        rows.push(rowContent);
        sum = col.props.size;
        rowContent = []; // new row
      }
      rowContent.push(col);

    })};

    rows.push(rowContent);

    // Construct all rows row should contain (more than one in case of overflow)
    for(let i = 0; i < rows.length; i++) {
      content.push(<div key={i} className={`${styles.row}`}>{rows[i]}</div>);
    }
    return content;
  }

  render() {
    return this.getRowContents();
  }
}

export default Row;
