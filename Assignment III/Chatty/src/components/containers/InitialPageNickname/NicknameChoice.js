import React from 'react';
import PropTypes from 'prop-types';

class NicknameChoice extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            inputValue: '',
            nicknameAvailable: false,
        };
        this.server = this.context.serverAPI.server;
        this.redirect = this.context.routeTools.redirect;
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    joinChatroomClick () {
        let isAvailable = this.server.setNickname(this.state.inputValue);
        isAvailable.then((nicknameIsAvailable) => {
            if(nicknameIsAvailable) {
                this.setState({nicknameAvailable: true});
            } else {
                alert('Sorry, nickname is either taken or invalid, please try another nickname');
            }
        });
    };

    render() {
        if(this.state.nicknameAvailable) {
            return <this.redirect push to='/lobby'/>
        }
        return (
            <div>
                <div className='nicknameInput'>
                    <p className='nicknamePrompt'>Enter nickname:</p>
                    <div className='row'>
                        <span className='inputNickname'>
                            <input type='text' value={this.state.inputValue} 
                            onChange={evt => this.updateInputValue(evt)} className='nicknameInputTextField' 
                            placeholder='nickname'></input>
                        </span>
                    </div>
                    <span className='row nicknameButtonDiv'>
                        <button className='nicknameInputButton' onClick={evt => this.joinChatroomClick(evt)}>JOIN IN!</button>
                    </span>
                </div>
            </div>
        );
    };
};

NicknameChoice.contextTypes = {

    routeTools: PropTypes.shape({
        redirect: PropTypes.component,
    }),
    
    serverAPI: PropTypes.shape({
        server: PropTypes.component
    })
};

export default NicknameChoice;