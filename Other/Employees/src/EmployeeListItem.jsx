/* STYLED COMPONENT!!!*/

import React from 'react';
import propTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

class EmployeeListItem extends React.Component {
    render() {
        const { employee, onClick, className } = this.props;
        return (
            <li className={className} onClick={onClick}>
                <img style={{width: '100px', height:'100px'}} src={employee.image} alt={employee.name}/>
                {employee.name}
            </li>
        );
    }
};

EmployeeListItem.propTypes = {
    employee: propTypes.any.isRequired,
}

const uglyAsHellAnimation = keyframes`
    0% { background-color: rgba(155, 155, 155, .5); }
    25% { background-color: yellow; }
    50% { background-color: green; }
    75% { background-color: blue; }
    100% { background-color: black; }
`;

const StyledEmployeeListItem = styled(EmployeeListItem)`
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    width: 400px;
    height: 100px;
    list-style-type: none;
    border-radius: 20px;
    background-color: rgba(155, 155, 155, .5);
    text-align: center;
    :hover {
        opacity: .5;
        cursor: pointer;
        animation: ${uglyAsHellAnimation} 2s ease-out 0s infinite;
    }
    @media (max-width: 400px) {
        background-color: blue;
    }
`;

export default StyledEmployeeListItem;