import React from 'react';
import { connect } from 'react-redux';
import { getAllEmployees } from './actions/employeeAction';
import TextInput from './InputField';

class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: ''
        };
    }
    componentDidMount() {
        const { getAllEmployees } = this.props;
        getAllEmployees();
    }

    validateOnlyLetterInput(name) {
        if(name==='') {
            return 'This field is required';
        } else if(!(/^[A-Za-z\u00C0-\u017F\s]+$/.test(name))) {
            return 'Invalid input (only letters allowed)';
        }
        
        return '';
    }

    canSubmit() {
        return (
            this.validateOnlyLetterInput(this.state.name)==='' &&
            this.validateOnlyLetterInput(this.state.email)==='' &&
            this.validateOnlyLetterInput(this.state.subject)===''
        );
    }

    getSubmitButton() {
        if(this.canSubmit()) {
            return <input type="submit"/>
        } else {
            return <input type="submit" disabled/>
        }
    }

    render() {
        const { employee } = this.props;
        return (
            <div>
                <p>Contact page</p>
                <form onSubmit={(e) => e.preventDefault()} >
                    <select name="employees">
                        {employee.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
                    </select>
                    <TextInput 
                        label="Name:"
                        name={this.state.name}
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        validate={(val) => this.validateOnlyLetterInput(val)}
                    />
                    <TextInput 
                        label="Email:"
                        name={this.state.email}
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        validate={(val) => this.validateOnlyLetterInput(val)}
                    />
                    <TextInput 
                        label="Subject:"
                        name={this.state.subject}
                        value={this.state.subject}
                        onChange={(e) => this.setState({ subject: e.target.value })}
                        validate={(val) => this.validateOnlyLetterInput(val)}
                    />
                    <textarea />
                    {this.getSubmitButton()}
                </form>
            </div>
        );
    }
}

// Map redux store state to component props
const mapStateToProps = ({ employee }) => {
    return { employee };
}

export default connect(mapStateToProps, { getAllEmployees })(Contact);
