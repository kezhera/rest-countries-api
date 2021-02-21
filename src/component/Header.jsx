import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
  
    }

    // function 
    // document.getElementById('header').classList.add('dark-mode')
    // document.getElementById('content').classList.add('dark-mode')

    // function
    // document.getElementById('header').classList.add('light-mode')
    // document.getElementById('content').classList.add('light-mode')

    componentDidMount(){
        if( localStorage.getItem("darkMode") === 'dark' ){
            document.getElementById('header').classList.add('dark-mode')
            document.getElementById('content').classList.add('dark-mode')
        }else{
            document.getElementById('header').classList.add('light-mode')
            document.getElementById('content').classList.add('light-mode')
        }
    }
    componentDidUpdate(){
        if( localStorage.getItem("darkMode") === 'dark' ){
            document.getElementById('header').classList.add('dark-mode')
            document.getElementById('content').classList.add('dark-mode')
        }else{
            document.getElementById('header').classList.add('light-mode')
            document.getElementById('content').classList.add('light-mode')
        }
    }

    handleClick = e => {
        if(localStorage.getItem("darkMode") == 'dark'){
            localStorage.setItem("darkMode", "light");
            document.getElementById('header').classList.remove('dark-mode')
            document.getElementById('content').classList.remove('dark-mode')

            document.getElementById('header').classList.add('light-mode')
            document.getElementById('content').classList.add('light-mode')
        }else{
            localStorage.setItem("darkMode", "dark")

            document.getElementById('header').classList.add('dark-mode')
            document.getElementById('content').classList.add('dark-mode')

            document.getElementById('header').classList.remove('light-mode')
            document.getElementById('content').classList.remove('light-mode')
        }

    }
    render() { 
   
        return ( 
            <header className="header" id="header">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <Link to="/" className="logo">
                            <h1>Where in the world?</h1>
                        </Link>
                        <div className="box">
                            <div className="toggle-mode">
                                <button className="mode-btn" onClick={this.handleClick}>
                                    <i className="fa fa-moon-o" aria-hidden="true"></i>
                                    <span>Dark Mode</span>
                                </button>

                                <button className="mode-btn" onClick={this.handleClick}>
                                    <i className="fa fa-moon-o" aria-hidden="true"></i>
                                    <span>light Mode</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
         );
    }
}
 
export default Header;