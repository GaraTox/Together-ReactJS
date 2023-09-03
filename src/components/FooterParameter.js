import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FooterParameter() {
    // const [roleUser, setRoleUser] = useState("");

    // axios.defaults.withCredentials = true;

    // useEffect(() => {
    //     axios.get('http://localhost:3001/')
    //     .then( (response) => {
    //       if(response.data.loggedIn == true){
    //         setRoleUser(response.data.user[0].roleUser)
    //       }
    //     })
    //     // .catch(err => console.log(err))
    //   }, [])

    return (
        <footer>
            {/* {roleUser == 'user' &&  */}
            {/* <div className="footerParameter bg bg-dark">
                <p><Link to="/myprofile/parameter/mentions" className="text-secondary">Mentions légales</Link></p>
                <p><Link to="/conditions" className="text-secondary">Conditions d'utilisation</Link></p>
            </div> */}
            {/* } */}
            {/* {roleUser == 'admin' && */}
            <div className="footerParameter bg bg-dark">
                <p><Link to="/myprofile/parameter/mentions" className="text-secondary">Mentions légales</Link></p>
                <p><Link to="/conditions" className="text-secondary">Conditions d'utilisation</Link></p>
                <p><Link to="/connect-admin/home" className="text-danger">Admin</Link></p>
            </div>
            {/* } */}
        </footer>
    );
  }
  
  export default FooterParameter;