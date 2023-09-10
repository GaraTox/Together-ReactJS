import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function FooterParameter() {
    const roleUser = useSelector((state) => state.roleUser);
    return (
        <footer>
            {roleUser === 'user' && 
            <div className="footerParameter bg bg-dark">
                <p><Link to="/myprofile/parameter/mentions" className="text-secondary">Mentions légales</Link></p>
                <p><Link to="/conditions" className="text-secondary">Conditions d'utilisation</Link></p>
            </div>
            }
            {roleUser === 'admin' && 
            <div className="footerParameter bg bg-dark">
                <p><Link to="/myprofile/parameter/mentions" className="text-secondary">Mentions légales</Link></p>
                <p><Link to="/conditions" className="text-secondary">Conditions d'utilisation</Link></p>
                <p><Link to="/connect-admin/home" className="text-danger">Admin</Link></p>
            </div>
            }
        </footer>
    );
  }
  
  export default FooterParameter;