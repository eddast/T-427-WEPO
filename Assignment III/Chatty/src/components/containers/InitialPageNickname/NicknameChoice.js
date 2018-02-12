import React from 'react';


class NicknameChoice extends React.Component {

    constructor(props, ctx) {
        super(props, ctx);
    
        this.state = { inputValue: '' }
        this.server = this.props.server;
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
                console.log('nickname available');
            } else {
                console.log('nickname unavailable');
            }
        });
    };

    render() {
        return (
            <div>
                <div className='nicknameInput'>
                    <p className='nicknamePrompt'>Enter nickname:</p>
                    <div className='row'>
                        <span className='inputNickname'>
                            <input type='text' value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} className='nicknameInputTextField' placeholder='nickname'></input>
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

export default NicknameChoice;