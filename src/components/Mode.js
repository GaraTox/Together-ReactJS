import React, {useState} from "react";
import Btnlg from './btn/Btnlg';
import ModalModifyUser from "./modales/ModaleModifyUser";


function Mode() {
    // MODALE
    const [openModalModi, setOpenModalModi] = useState(false);

    return (
        <section>
            {openModalModi && <ModalModifyUser closeModal={setOpenModalModi}/>}
            <div className="mode">
                <div className="btnDelete">
                    <Btnlg onClick={() => {setOpenModalModi(true)}}  className="btn" caracteristique="lg" text="Modifier votre profil"/>
                    <Btnlg  className="btn" caracteristique="lg mt-3" text="Supprimer ce compte"/>
                </div>
            </div>
        </section>
    );
  }
  
  export default Mode;