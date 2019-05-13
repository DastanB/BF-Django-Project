import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'chramework';


export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button text="Выход" noBlank arrow bordered size="small" href={ this.props.logout } />
        );
    }
}

if (document.getElementById('profile')) {
    const elem = document.getElementById('profile');
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Profile {...props} />, document.getElementById('profile'));
}
