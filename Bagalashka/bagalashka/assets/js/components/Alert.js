import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Note } from 'chramework';

export default class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mb-4">
                <Note className={ this.props.className } text={ this.props.message } />
            </div>
        );
    }
}

if (document.getElementById('alert')) {
    const elem = document.getElementById('alert');
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Alert {...props} />, document.getElementById('alert'));
}
