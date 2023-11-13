import React from "react";
import logo from '../assets/icons/logo.png';

function Header() {
    return (
        <header>
            <nav className="navInscription">
                <div className='logoInscription'>
                    <img className='logoTogetherIns' src={logo} alt='logo together'/>
                    <p className="Together">Together</p>
                </div>
            </nav>
        </header> 
    );
  }
  
  export default Header;