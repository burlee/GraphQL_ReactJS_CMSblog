import React, { Component } from 'react';
import classes from './RegisterModal.scss';

class RegisterModal extends Component {
    state = {
        showRegisterModal: true,
        rulesIsAccept: false,
        borderColorEmail: 'rgba(76, 76, 76, .4)',
        borderColorPassword: 'rgba(76, 76, 76, .4)',
        emailIsCorrectly: false,
        passwordIsCorrectly: false,
        registerStatus: 0,
        userAddresEmail: '',
        userPassword: ''
    }

    validateAddressEmail = (email) => {
        this.emailValidate(email);
        this.setState({userAddresEmail: email})
    }

    validatePassword = (password) => {
        this.passwordValidate(password);
        this.setState({userPassword: password});
    }

    closeModal = () => {
        this.setState({showRegisterModal: !this.state.showRegisterModal})
    }

    sendRegisterForm = (event) => {
        event.preventDefault();
        const { emailIsCorrectly, passwordIsCorrectly, rulesIsAccept} = this.state;

        if(emailIsCorrectly === false || passwordIsCorrectly === false || rulesIsAccept === false) return;
        
        console.log('Rejestracja')
    }

    passwordValidate = (password) =>{

        let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        if( strongRegex.test(password) === false){
            this.setState({
                borderColorPassword: 'rgba(76, 76, 76, .4)', 
                passwordIsCorrectly: false,
                registerStatus: 50
            })
        }else{
            this.setState({
                borderColorPassword: 'rgba(76, 76, 76, .6)', 
                passwordIsCorrectly: true,
                registerStatus: +100
            })}

        if(password === ''){this.setState({borderColorPassword: 'rgba(76, 76, 76, .4)', registerStatus: 50})}

    }

    emailValidate = (email) => {

        let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/;
        let registerStatus = this.state.registerStatus;
        console.log(registerStatus)
        if( emailRegex.test(email) === false){
            this.setState({
                borderColorEmail: 'rgba(76, 76, 76, .4)', 
                emailIsCorrectly: false,
                registerStatus: 0
            })
        }else{this.setState({
            borderColorEmail: 'rgba(76, 76, 76, .6)', 
            emailIsCorrectly: true,
            registerStatus: +50
        })}

        if(email === ''){this.setState({borderColorEmail: 'rgba(76, 76, 76, .4)'})}

    }

    resetRegisterInputsForm = () => {
        this.setState({
            userPassword: '', 
            userAddresEmail: '',
            borderColorPassword: 'rgba(76, 76, 76, .4)', 
            borderColorEmail: 'rgba(76, 76, 76, .4)', 
            passwordIsCorrectly: false,
            emailIsCorrectly: false,
            registerStatus: 0
        })
    }

    render() {
        console.log(this.state)
        let registerButton = <button disabled={true}>Uzupełnij formularz</button>;

        if(this.state.emailIsCorrectly && this.state.passwordIsCorrectly && this.state.rulesIsAccept){
            registerButton = <button style={{backgroundImage: 'linear-gradient(to bottom right, #4bebc7, #49cbd9)'}}>Zarejestruj</button>
        };

        return (
            <React.Fragment>
                {this.state.showRegisterModal ? 
                    <div className={classes.RegisterModal} onClick={()=> this.setState({showRegisterModal: false})}>
                        <div className={classes.RegisterModalForm} onClick={e=> e.stopPropagation()}>
                            <header>
                                <span>Zarejestruj się</span>
                                <button onClick={this.closeModal}>X</button>
                            </header>
                            <form onSubmit={this.sendRegisterForm}>
                                <div>
                                    <label htmlFor="email">Podaj adres email:</label>
                                    <input 
                                        onChange={ e => this.validateAddressEmail(e.target.value)} 
                                        id="email" type="text" 
                                        style={{borderBottom: `1px solid ${this.state.borderColorEmail}`}} 
                                        autoComplete="off"
                                        onClick={this.resetRegisterInputsForm}
                                        value={this.state.userAddresEmail}
                                        />
                                        
                                    <label htmlFor="password">Podaj hasło:</label>
                                    <input 
                                        onChange={ e => this.validatePassword(e.target.value)} 
                                        id="password" type="text" 
                                        type='password'
                                        disabled={!this.state.emailIsCorrectly}
                                        style={{borderBottom: `1px solid ${this.state.borderColorPassword}`}} 
                                        autoComplete="off"
                                        value={this.state.userPassword}
                                        />
                                </div>
                                <div className={classes.Rules}>
                                    <label htmlFor="rules">Zaakceptuj regulamin serwisu</label>
                                    <input id="rules" type="checkbox" onChange={()=>this.setState({rulesIsAccept: !this.state.rulesIsAccept})}/>
                                </div>
                                {registerButton}
                            </form>
                            <div className={classes.RegisterStatus} style={{width: this.state.registerStatus+'%'}}>
                                {this.state.registerStatus === 100 && this.state.rulesIsAccept ? 
                                <div>
                                    <i className="fas fa-check-circle"></i>
                                </div> : null
                                }
                            </div>
                        </div>
                        <div className={classes.LoginFormContainer} onClick={e => e.stopPropagation()}>
                            <div>
                                <h1>Zaloguj się</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus obcaecati atque quam, minima eveniet fugit nemo amet libero asperiores molestiae.</p>
                                <div className={classes.LoginForm}>
                                    <input type="text" placeholder="Wpisz adres e-mail"/>
                                    <input type="password" placeholder="Podaj hasło"/>
                                </div>
                                <button>Zaloguj się</button>
                            </div>
                        </div>
                    </div> : null
                }
            </React.Fragment>
        );
    }
}

export default RegisterModal;
