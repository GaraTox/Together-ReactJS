import React, {useState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function FooterParameter() {
    const [roleUser, setRoleUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('idUser');
    fetch(`/roleUser/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setRoleUser(data.roleUser);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du rôle de l\'utilisateur', error);
      });
  }, []);
    return (
        <footer>
            {roleUser === 'admin' && (
            <div className="footerParameter">
                <p><Link to="/myprofile/parameter/mentions">Mentions légales</Link></p>
                <p><Link to="/conditions">Conditions d'utilisation</Link></p>
                <p><Link to="/connect-admin/home" className="textAdmin">Admin</Link></p>
            </div> 
            )}
            {roleUser === 'user' && (
            <div className="footerParameter">
                <p><Link to="/myprofile/parameter/mentions">Mentions légales</Link></p>
                <p><Link to="/conditions">Conditions d'utilisation</Link></p>
            </div>
            )}
        </footer>
    );
  }
  
  export default FooterParameter;