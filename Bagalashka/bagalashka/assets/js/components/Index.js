import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'chramework';


export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button text="Вход" noBlank arrow bordered size="small" href={ this.props.login } />
        );
    }
}

if (document.getElementById('index')) {
    const elem = document.getElementById('index');
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Index {...props} />, document.getElementById('index'));
}
