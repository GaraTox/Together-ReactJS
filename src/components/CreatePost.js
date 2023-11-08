import React, {useState, useEffect} from "react";
import axios from "axios";
import Btnsm from '../components/btn/Btnsm';

function CreatePost() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState('');
  const [contentFeed, setContentFeed] = useState('');

  // AFFICHER LA LISTE DES UTILISATEURS
  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs : ' + error.response.data.error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/connect-admin/home/user/createPost', { idUser, contentFeed });
      console.log(response.data.message);
      setIdUser('');
      setContentFeed('');
      setMessage('Publication ajoutée avec succès');


    } catch (error) {
      console.error('Erreur lors de la création du post : ' + error.response.data.error);
    }
  };

    return (
        <section className="bg-admin">
        <h4 className="text-center pt-3">Créer un post</h4>
        <div className="blocCreate">
        <form method="POST" className="formCreate text-center p-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Pseudo</label>
            <select type="text"  className="form-control" id="idUser" value={idUser} onChange={(e) => setIdUser(e.target.value)} name="pseudoUser" autoComplete="off" required>
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user.idUser} value={user.idUser}>
                {user.pseudoUser}
              </option>
            ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInput" className="form-label">Contenu</label>
            <textarea type="type"  className="form-control" id="contenuUser" value={contentFeed} onChange={(e) => setContentFeed(e.target.value)} name="contenuUser" autoComplete="off" required></textarea>
          </div>
          <Btnsm  type="submit" className="btn" caracteristique="sm" text="Créer"/>
          {message && <p className="text-success">{message}</p>}
          </form>
        </div>
        </section>
    );
  }
  
export default CreatePost;