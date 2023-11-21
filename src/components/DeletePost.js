import React,{useState, useEffect} from "react";
import Btnsm from '../components/btn/Btnsm';
import axios from "axios";

function DeletePost() {
  const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/readPost')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const deleteNews = (idFeed) => {
        fetch(`/connect-admin/home/user/deletePost/${idFeed}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'Actualité supprimée avec succès') {
              setUser(user.filter((feed) => feed.idFeed !== idFeed));
              setMessage('Publication supprimée avec succès');
            }
          });
      };
      
    return (
    <section className="bg-admin">
        <div className="grid-admin">
        {data.map((feed, index) => {
            return(
        <div key={index} className="text-center search">
            <p className="searchFirstname">{feed.pseudoUser}</p>
            <p className="searchName border border-dark rounded p-1">{feed.contentFeed}</p>
            <div className="searchButton">
                <Btnsm onClick={() => deleteNews(feed.idFeed)} type="submit" className="btn" caracteristique="sm" text="Supprimer"/>
            </div> 
        </div>
        )})}
        {message && <p className="text-success">{message}</p>}
        </div>
    </section>
    );
  }
  
export default DeletePost;