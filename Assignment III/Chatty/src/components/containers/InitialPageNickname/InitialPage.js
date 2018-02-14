import React from 'react';
import NicknameChoice from './NicknameChoice';
import Banner from '../../../components/Banner';

// Dummy class rendering the view for initial displaying page
// Prompts user for his or her nickname
class InitialPage extends React.Component {
    render() {
        return (
            <div>
                <Banner/>
                <div className='initialPageBody'>
                    <NicknameChoice/>
                </div>
            </div>
        );
    };
};

export default InitialPage;