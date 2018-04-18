import React from 'react';

class Employee extends React.Component {
  render() {
    return (
        <div>Employee page for {this.props.match.params.employeename}</div>
    );
  }
}

export default Employee;