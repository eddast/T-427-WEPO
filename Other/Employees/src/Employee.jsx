/* RADIUM */

import React from 'react';
import { connect } from 'react-redux';
import { getEmployeeByName } from './actions/employeeAction';
import Radium from 'radium';

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  largeStyle: {
    fontSize: '30px'
  },
  quoteStyle: {
    color: 'gray',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  dangerous: {
    color: 'red'
  },
};

class Employee extends React.Component {
  

  componentDidMount() {
    const { getEmployeeByName } = this.props;
    getEmployeeByName(this.props.match.params.employeename);
  }

  render() {
    const { jobber } = this.props;
    const { dangerous } = jobber;
    console.log(dangerous);
    return (
        <div style={style}>
          Employee page for {this.props.match.params.employeename}
          <span style={[style.largeStyle, dangerous && style.dangerous]}>
            <p>{jobber.name}</p>
          </span>
          <span style={[style.quoteStyle]}>
            <p>{jobber.quote}</p>
          </span>
          <img style={{width: '300px'}}src={jobber.image} alt={jobber.name}/>
        </div>
    );
  }
}

// {Map} redux store state to component props
const mapStateToProps = ({ employee }) => {
  return { jobber: employee };
}

export default connect(mapStateToProps, { getEmployeeByName })(Radium(Employee));