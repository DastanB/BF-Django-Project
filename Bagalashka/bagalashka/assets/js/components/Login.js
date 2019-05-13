import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Heading, FormGroup, FormRow, Input, Button } from 'chramework';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                valid: true,
                value: ''
            },
            password: {
                valid: true,
                value: ''
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInvalidInput = this.handleInvalidInput.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleInputChange(e, name) {
        let prop = this.state[name];
        prop.value = e;
        prop.valid = e !== '';
        this.setState({
            [name]: prop
        });
    }

    handleInvalidInput(name) {
        let prop = this.state[name];
        prop.valid = false;
        this.setState({
            [name]: prop
        });
    }

    handleUserInput(e) {
        e.preventDefault();
        let form = document.getElementById('login-form');
        let formValid = true;
        if (this.state.username.value === '') {
            this.handleInvalidInput('username');
            formValid = false;
        }
        if (this.state.password.value === '') {
            this.handleInvalidInput('password');
            formValid = false;
        }
        if (formValid) {
            form.submit();
        }
    }

    render() {
        return (
            <form id="login-form" method="post" action={ this.props.url }>
                <input type="hidden" name="csrfmiddlewaretoken" value={ this.props.csrf } />
                <input type="hidden" name="next" value={ this.props.next } />
                <div className="flex flex-col">
                    <Heading level={3}>Войти <nobr>куда-то</nobr></Heading>
                    <FormGroup>
                        <FormRow>
                            <Input
                                type="text"
                                name="username"
                                id="id_username"
                                label="Имя пользователя"
                                value={ this.state.username.value }
                                hasErrors={ !this.state.username.valid }
                                onChange={ (e) => { this.handleInputChange(e, 'username') } }
                            />
                        </FormRow>
                        <FormRow>
                            <Input
                                type="password"
                                name="password"
                                id="id_password"
                                label="Пароль"
                                value={ this.state.password.value }
                                hasErrors={ !this.state.password.valid }
                                onChange={ (e) => { this.handleInputChange(e, 'password') } }
                            />
                        </FormRow>
                    </FormGroup>
                    <Button type="submit" text="Войти" uppercase size="small" onClick={ this.handleUserInput } />
                    <Button text="Забыли пароль?" className="mt-4" noBlank dark arrow bordered size="small" href={ this.props.reset } />
                </div>
            </form>
        );
    }
}

if (document.getElementById('login')) {
    const elem = document.getElementById('login');
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Login {...props} />, document.getElementById('login'));
}
