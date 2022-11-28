import React, { Component } from 'react';

import '../Pages/Login.scss';
import sample from '../assets/Background.mp4';

class RegisterView extends Component {
    
    componentDidMount() {
        document.title = 'Register'
    }

    toggleMode() {
        /*
        var newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode});*/
    }
    
    render() {
        return (
            //// MISSING ONE CLICK SOCIAL VALIDATION ////
            // GOOGLE AND FACEBOOK
            // CHANGE CHECK-IN WITH A TEXT BUTTON -> MORE INTUITIVE
            // ALSO MISSING RESPONSIVENESS
            
                <div>
                <video className='videoTag' autoPlay loop muted>
                    <source src={sample} type='video/mp4' />
                </video>
                
                <div className="divider scrolling-section">

                    <div className="logo-container">
                            <img className="logo" src={"/assets/imgs/LSM-logo.png"} alt="logo" />
                    </div>
            
                <div className="form-container ">

                    <form onSubmit={this.props.onSubmit("signup")} method='POST'>

                        <h1 className="form-title">Register</h1>

                        <input className="form-input" placeholder="username" type="text" name="name" id="name"/>

                        <input className="form-input" placeholder="password" type="password" name="password" id="password"/>

                        <input className="form-input" placeholder="confirm password" type="password" name="passwordConfirm" id="passwordConfirm"/>

                        <input className="form-input" placeholder="mail" type="text" name="mail" id="mail"/>

                        <input className="form-input" placeholder="token" type="text" name="token" id="token"/>

                        <div className="error-text" id="errorField"></div>

                        <button className="form-button" type="submit" id="register-button">Register</button>
                        <p className = "width-definer">Already have an account? <a href="./index">Login</a></p>
                    </form>


                </div>
                </div>
                
            </div>
            
            
        )
    }
}



export default RegisterView;
