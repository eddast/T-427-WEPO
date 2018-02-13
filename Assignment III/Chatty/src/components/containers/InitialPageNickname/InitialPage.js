import React from 'react';
import NicknameChoice from './NicknameChoice';
import Banner from '../../../components/Banner';


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