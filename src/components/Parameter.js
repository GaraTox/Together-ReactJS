import React from "react";
import { connect } from "react-redux";
import profil from '../assets/icons/person-circle.svg';

function Parameter({ idUser, pseudoUser, mailUser }) {
    // NETTOYER REACT DEVTOOL
    // useEffect(() => {
    //     localStorage.clear();
    // })

    return (
        <section>
            <div className="blocParametre">
                <p className="text-center">Vos paramètres de profil</p>
                <div className="blocInfo text-center">
                    <div className="blocProfil">
                        <img className="imgPhoto" src={profil} alt="profil"/>
                    </div>
                    <div className="infoPerso">
                        <p>{idUser}</p>
                        <p>{pseudoUser}</p>
                        <p>{mailUser}</p>
                    </div>
                </div>
            </div>
        </section>
    );
  }

  const mapStateToProps = (state) => {
    return {
      idUser: state.idUser,
      pseudoUser: state.pseudoUser,
      mailUser: state.mailUser,
    };
  };
  
  export default connect(mapStateToProps)(Parameter);