import React, { Component, useState, useEffect } from 'react';

import { useSessionStorage } from './components/useStorage.js';

import ReactDOM from "react-dom/client";
import {Routes, Route, useNavigate} from "react-router-dom";

import LoginView from './Pages/Login.js';
import RegisterView from './Pages/Register.js';
import UserView from './Pages/UserView.js';
import ConfigurationView from './Pages/Configuration';
import StatisticsView from './Pages/Statistics';
import LeaderboardView from './Pages/LeaderboardView.js';
import NotAdmin from './Pages/NotAdmin.js';

import PageNotFound from './Pages/PageNotFound.js';

import ProfilePlaceholder from './assets/UserView/panda.png'; 

import NavBar from "./components/navbar.js";


class User{
  constructor(ID, achievements, admin, currentStrike, daysAttended, lessonsProgress, mail, name, password, profilePicture){
    this.ID = ID;
    this.achievements = achievements;
    this.admin = admin;
    this.currentStrike = currentStrike;
    this.daysAttended = daysAttended;
    this.lessonsProgress = lessonsProgress;
    this.mail = mail;
    this.name = name;
    this.password = password;
    this.profilePicture = profilePicture;
  }
}

function App() {
  const [userData, setUserData] = useSessionStorage('userData',null);
  const [leaderboardData, setLeaderboardData] = useSessionStorage('leaderboardData',null);
  const [statisticsData, setStatisticsData] = useSessionStorage('statisticsData',null);
  const [loggedIn, setLoggedIn] = useSessionStorage('loggedIn',false);
  let navigate = useNavigate()


  function updateLoggedIn(){
    sessionStorage.getItem('loggedIn') 
    
  }


  /*
    //update real time
  useEffect(() => {
    const interval = setInterval(() => {
      updateLoggedIn();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  */

  

  const loginRouteChange = mode => async (e) =>{
    e.preventDefault();

    if (mode === "signup"){ // CONDICIONAL PARA SABER SI ESTÁ EN LOGIN O EN SIGNUP, FALTA VALIDAR EL REPETIR CONTRASEÑAS

        const mail = document.getElementById('mail').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const username = document.getElementById('name').value;
        const token = document.getElementById('token').value;
        
        // Check there are no empty fields
        if (mail === '' || password === '' || passwordConfirm === '' || username === '' || token === '') {
            document.getElementById('errorField').innerHTML = "Please fill all the fields";
            return;
        }

        // Regex for email validation
        const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailRegex.test(mail)) {
            document.getElementById('errorField').innerHTML = "Please enter a valid email";
            return;
        }

        if (password !== passwordConfirm) {
            document.getElementById('errorField').innerHTML = "Passwords don't match";
            return;
        }

        const data = {
            mail: mail,
            password: password,
            name: username,
            token: token
        }

        fetch('https://user-api-b5pden6qnq-uc.a.run.app/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.error) {
                document.getElementById('errorField').innerHTML = data.error;
                console.log(data);
            } else {
                document.getElementById('errorField').innerHTML = "User created successfully";
                setUserData(data)
                setLoggedIn(true)
                navigate('usuario')
            }
        })
    }
    else{ // ESTÁ EN LOGIN
      // Validar Login:

        e.preventDefault();
        // API on https://user-api-b5pden6qnq-uc.a.run.app
        // Call /login with body { mail: mail, password: password }
        // If user is found, redirect to homepage, save user in local storage and log to console
        // If user is not found, show error message

        const mail = document.getElementById('mail').value;
        const password = document.getElementById('password').value;

        // Check there are no empty fields
        if (mail === '' || password === '') {
            document.getElementById('errorField').innerHTML = "Please fill all the fields";
            return;
        }

        // Regex for email validation
        const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailRegex.test(mail)) {
            document.getElementById('errorField').innerHTML = "Please enter a valid email";
            return;
        }

        fetch('https://user-api-b5pden6qnq-uc.a.run.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: mail, password: password }),
        }) 
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                document.getElementById('errorField').innerHTML = data.error;
                console.log(data.error);
              } else {
                    console.log(data);
                    setUserData(data);

                    setLoggedIn(true);
                    let path = 'usuario'; 
                    navigate(path);
                    //window.location.href = path
                } 
            }
            )

        
        // Validar contraseña repetida

      } 

    }

  
  
/*
Flow:
Login, if not logged in -> do not show pages -> redirect to login
Get data & insert as props 
Maybe loading screen to get all data? 
Get ALL data just after logging in

*/

  
  
  if (loggedIn === true){
    return (
      <LoggedInSection fun={loginRouteChange} userData={userData}/>
    );
  }
  else if (loggedIn === false){
    return(
      <NotLoggedIn fun={loginRouteChange} />
    );
    
  }
  else {
    console.log("Error:",loggedIn)
    setLoggedIn(false)
  }
}

class NotLoggedIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      fun : this.props.fun,
    }
  }

  render(){
    return(
      <div className="app">
        <Routes>
            <Route path="/register" element={<RegisterView onSubmit={this.state.fun} /> } />
            <Route path="*" element={<LoginView onSubmit={this.state.fun} /> } />
        </Routes>
      </div>
    );
  }
}


class LoggedInSection extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      fun: this.props.fun,
      userData : this.props.userData,
      //leaderboardData : this.props.leaderboardData,
      //statisticsData : this.props.statisticsData,
      currentPage: 'usuario',
      //showNav: true,
  }
    
    //this.updateState = this.updateState.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    //this.updateNavbar = this.updateNavbar.bind(this);
  }

  componentDidMount() {
    /*
    this.updateState()
    setInterval(this.updateState, 1e3); // x seconds */
    console.log(this.state.userData)
  }
  updateNavbar(){
    /*
    this.setState({
      showNav: !this.state.showNav
    })*/
  }

  updateCurrentPage(page){
    this.setState({currentPage: page})
  }  
    render(){
      return(
        <div className="App">
          <NavBar data = {this.state.userData} />
          <Routes>
            <Route path="/" element={<UserView data = {this.state.userData} updateCurrentPage={this.updateCurrentPage} /> } />
            <Route path="usuario" element={ <UserView data = {this.state.userData} updateCurrentPage={this.updateCurrentPage}/>} />
            <Route path="configuracion" element={ <ConfigurationView data = {this.state.userData} updateCurrentPage={this.updateCurrentPage}/>} />
            <Route path="estadisticas" element={  <StatisticsView data = {this.state.statisticsData} updateCurrentPage={this.updateCurrentPage}/> } />
            <Route path="leaderboard" element={ <LeaderboardView data = {this.state.leaderboardData} user = {this.state.userData} updateCurrentPage={this.updateCurrentPage}/>} />
            <Route path="*" element={<PageNotFound updateCurrentPage={this.updateCurrentPage}/> } />
          </Routes>
        </div>
      );
    }
}

export default App;
