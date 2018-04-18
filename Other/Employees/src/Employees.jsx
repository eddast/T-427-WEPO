import React from 'react';
import { connect } from 'react-redux';
import { getAllEmployees } from './actions/employeeAction';
import EmployeeListItem from './EmployeeListItem';

class Employees extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }
    componentDidMount() {
        const { getAllEmployees } = this.props;
        getAllEmployees();
    }

    render() {
        const { employee } = this.props;
        return (
            <div>
                <p>Employees: </p>
                {employee.map(e => <EmployeeListItem key={e.id} employee={e} onClick={() => this.props.history.push("/employees/" + e.name)}/>)}
            </div>
        );
    }
}

// Map redux store state to component props
const mapStateToProps = ({ employee }) => {
    return { employee };
}

export default connect(mapStateToProps, { getAllEmployees })(Employees);
