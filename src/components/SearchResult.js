import React, {useState, useEffect} from "react";
import axios from "axios";
import Btnsm from '../components/btn/Btnsm';

function SearchResult() {
    const [results, setResults] = useState('');
    // // AFFICHER LES DONNEES DE L'UTILISATEUR
    // const [user, setUser] = useState('');

    // // RECUPERATION DES DONNEES GRACE A ID
    // useEffect(() => {
    //     const user = localStorage.getItem('idUser');
    //     console.log("user =>" + user);
    //     axios.get(`http://localhost:3001/myprofile/${user}`)
    //     .then((response) => {
    //         setUser(response.data);
    //     })
    //     .catch((error) => {
    //         console.log("========L24===========");
    //         console.log("error : ", error);
    //         console.log("Error user : " + user);
    //     })
    // }, [])

    // // AVATAR
    // const [file, setFile] = useState();
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const user = localStorage.getItem('idUser');
    //     axios.get(`http://localhost:3001/avatar/${user}`)
    //     .then(res => {
    //         setData(res.data[0])
    //     })
    //     .catch(err => console.log(err));
    // }, [])
    return (
    <section>
        <div className="grid-admin">
            {results ? results.map((result, index) => (
            <div key={index} className="text-center bg bg-light search">
                <p className="searchFirstname">{result.pseudoUser}</p>
                <p className="searchName">{result.mailUser}</p>
                <div className="searchButton">
                    <Btnsm type="submit" className="btn" caracteristique="sm" text="Ajouter"/>
                </div>
            </div>
            )) : <p>Aucun résultat trouvé...</p>}
        </div>
        <hr/>
    </section>
    );
  }
  
  export default SearchResult;