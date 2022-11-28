import React, { Component } from 'react';

import '../Pages/Login.scss';
import sample from '../assets/Background.mp4';

class LoginView extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        document.title = 'Login'

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

                {/*<a href= "/homepage/homepage.html">homepage</a>*/}
                <div className="form-container">
                    <form onSubmit={this.props.onSubmit("login")} method='POST'>

                        <h1 className="form-title">Login</h1>

                        <input className="form-input" placeholder="mail" type="text" name="mail" id="mail" />

                        <input className="form-input" placeholder="password" type="password" name="password" id="password" />

                        <div className="error-text" id="errorField"></div>

                        <button className="form-button" type="submit" id="login-button">Login</button>
                        <p className = "width-definer">Don't have an account? <a href="./register">Register</a></p>
                        

                    </form>

                </div>
                </div>
                
            </div>
            
            
        )
    }
}



export default LoginView;
