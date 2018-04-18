import React from 'react';
import { connect } from 'react-redux';
import { getEmployeeByName } from './actions/employeeAction';

class Employee extends React.Component {
  componentDidMount() {
    const { getEmployeeByName } = this.props;
    getEmployeeByName(this.props.match.params.employeename);
}
  render() {
    const {jobber} = this.props;
    return (
        <div>
          Employee page for {this.props.match.params.employeename}
          <p>{jobber.name}</p>
          <img src={jobber.image} alt={jobber.name}/>
        </div>
    );
  }
}

// Map redux store state to component props
const mapStateToProps = ({ employee }) => {
  return { jobber: employee };
}

export default connect(mapStateToProps, { getEmployeeByName })(Employee);