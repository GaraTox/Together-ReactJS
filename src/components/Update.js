import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const {idUser} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/connect-admin/home/user/read'+idUser)
    .then(res => {
      console.log(res)
      setValues({...values, pseudoUser: res.data[0].pseudoUser, mailUser: res.data[0].mailUser})
    })
    .catch(err => console.log(err))
  }, [])
  
  const [values, setValues] = useState({
    pseudoUser: '',
    mailUser:'',
  })

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('/connect-admin/home/user/update/'+idUser, values)
    .then(res => {
      console.log(res)
      navigate('/connect-admin/home')
    })
    .catch(err => console.log(err));
  }

    return (
        <section>
        <h4 className="text-center mt-5 ">Modifier les données de l'utilisateur</h4>
        <div className="blocUpdate">
        <form method="POST" onSubmit={handleUpdate} className="formUpdate text-center p-3">
          <div className="mb-3">
            <label for="exampleInput" className="form-label">Pseudo</label>
            <input type="text" onChange={e => setValues({...values, pseudoUser: e.target.value})} 
            value={values.pseudoUser}
            className="form-control" id="fnames" name="pseudoUser" autocomplete="off" required/>
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">Mail</label>
            <input type="text" onChange={e => setValues({...values, mailUser: e.target.value})}
            value={values.mailUser}
            className="form-control" id="names" name="mailUser" autocomplete="off" required/>
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">Mot de passe</label>
            <input type="password" onChange={e => setValues({...values, passwordUser: e.target.value})}
            className="form-control" id="passw" name="passwordUser" autocomplete="off" required/>
          </div>
          <button type="submit" className="btn btn-success" id="inscription" name="inscription">Modifier</button>
          </form>
        </div>
        </section>
    );
  }
  
export default Update;