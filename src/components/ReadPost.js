import React, { useState,useEffect } from "react";
import axios from "axios";
import Btnsm from '../components/btn/Btnsm';

function ReadPost() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/connect-admin/home/user/readPost')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
    return (
    <section className="bg-admin">
        <div className="grid-admin">
        {data.map((post, key) => {
            return(
            <div key={key} className="text-center search">
                <p className="searchFirstname">{post.pseudoUser}</p>
                <p className="searchName">{post.contentFeed}</p>
                <div className="searchButton">
                    <Btnsm type="submit" className="btn" caracteristique="sm" text="POST"/>
                </div> 
            </div>        
        )})}
        </div>
    </section>
    );
  }
  
export default ReadPost;