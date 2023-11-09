import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import profil from '../assets/icons/person-fill.svg';
import ModaleUpdateFeed from "./modales/ModaleUpdateFeed";
import ModaleReport from "./modales/ModaleReport";
import Btnsm from "./btn/Btnsm";
import friend from '../assets/icons/people.svg';
import send from '../assets/icons/send.png';
import conversation from '../assets/icons/conversation.png';
import modifier from '../assets/icons/modifier.png';
import supprimer from '../assets/icons/supprimer.png';
import dislike from '../assets/icons/dislike.png';
import like from '../assets/icons/aimer.png';
import commentaire from '../assets/icons/commentaire.png';
import signaler from '../assets/icons/signaler.png';
import ModaleFeed from "./modales/ModaleFeed";

function Home() {
    // MODALE
    const [isModaleFeedOpen, setIsModaleFeedOpen] = useState(false);
    const [isModaleReportOpen, setIsModaleReportOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [idFeedRecup, setIdFeedRecup] = useState();

    const openPostModal = (post) => {
      setSelectedPost(post);
      setIsModaleFeedOpen(true);
      console.log(post);
      setIdFeedRecup(post.idFeed);
      console.log(post.idFeed);
    };
    
    const closeModaleFeed = () => {
      setIsModaleFeedOpen(false);
    };

    // AFFICHER LES DONNEES DE L'UTILISATEUR
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const users = localStorage.getItem('idUser');

    useEffect(() => {
        const user = localStorage.getItem('idUser');
        // console.log("user =>" + user);
        axios.get(`http://localhost:3001/myprofile/${user}`)
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.log("========L22 mon gars===========");
            console.log("error : ", error);
            console.log("Error user : " + user);
        })
    }, [])
    useEffect(() => {
        const user = localStorage.getItem('idUser');
        axios.get(`http://localhost:3001/avatar/${user}`)
        .then(res => {
            setData(res.data[0])
        })
        .catch(err => console.log(err));
    }, [])

    // AFFICHER SES AMIS
    const [followingUsers, setFollowingUsers] = useState([]);
    useEffect(() => {
        getFollowingUsers();
    }, []);
    const getFollowingUsers = () => {
        const idUser = localStorage.getItem('idUser');
        axios.get(`/follow/${idUser}`)
          .then(response => {
            setFollowingUsers(response.data);
          })
          .catch(error => {
            console.error('Error fetching following users:', error);
          });
      };

    // AJOUTER FEED
    const [contentFeed, setContentFeed] = useState('');
    const handlePost = async () => {
        const idUser = localStorage.getItem('idUser');
        try {
          await axios.post('/addfeed', { idUser: idUser, contentFeed });
          console.log('le post a été envoyer')
        } catch (error) {
          console.error('Erreur lors de la création de la publication : ' + error);
        }
      }

    // LIRE FEED
    const [posts, setPosts] = useState([]);
    const idUser = localStorage.getItem('idUser');
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const [feedResponse, likesResponse] = await Promise.all([
            axios.get(`/readfeed/${idUser}`),
            axios.get('/getLikes'),
        ]);
        
        const feeds = feedResponse.data;
        const likes = likesResponse.data;

        const combinedData = feeds.map((feed) => ({
          ...feed,
          likes: likes.filter((like) => like.idFeed === feed.idFeed),
      }));

      const combinedDataWithCount = combinedData.map((item) => ({
        ...item,
        numberOfLikes: item.likes.length,
        liked: item.likes.some((like) => like.idUser === parseInt(idUser))
    }));

          setPosts(combinedDataWithCount);
          // console.log()
        } catch (error) {
          console.error('Erreur lors de la récupération des publications : ' + error);
        }
      };
      fetchPosts();
    }, [idUser]);

    const fetchPosts = async () => {
      try {
        const [feedResponse, likesResponse] = await Promise.all([
          axios.get(`/readfeed/${idUser}`),
          axios.get('/getLikes'),
      ]);
      
      const feeds = feedResponse.data;
      const likes = likesResponse.data;

      const combinedData = feeds.map((feed) => ({
        ...feed,
        likes: likes.filter((like) => like.idFeed === feed.idFeed),
    }));

    const combinedDataWithCount = combinedData.map((item) => ({
      ...item,
      numberOfLikes: item.likes.length,
      liked: item.likes.some((like) => like.idUser === parseInt(idUser))
  }));

        setPosts(combinedDataWithCount);
        // console.log()
      } catch (error) {
        console.error('Erreur lors de la récupération des publications : ' + error);
      }
    };

// SIGNALER UNE PUBLICATION
const openReportModal = (post) => {
  setSelectedPost(post);
  setIsModaleReportOpen(true);
  console.log(post);
  setIdFeedRecup(post.idFeed);
  console.log(post.idFeed);
};

const closeModaleReport = () => {
  setIsModaleReportOpen(false);
};

    // CONDITIONS D'AFFICHAGE MODIFIER / SUPPRIMER SI C'EST MES POSTS
    const userFeed = localStorage.getItem('idUser');
    const [moddel, setModdel] = useState([]);
  useEffect(() => {
    fetch(`/moddel/${userFeed}`)
      .then((response) => response.json())
      .then((data) => setModdel(data))
      .catch((error) => console.error('Erreur:', error));
  }, [userFeed]);

  // SUPPRIMER SON FEED
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/feedread')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Erreur de récupération:', error);
      });
  }, []);
  const handleDeleteClick = (idFeed) => {
    setPostIdToDelete(idFeed);
  };
  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      axios.delete(`http://localhost:3001/feeddelete/${postIdToDelete}`)
        .then(() => {
          setPosts(posts.filter((post) => post.idFeed !== postIdToDelete));
          setPostIdToDelete(null);
        })
        .catch((error) => {
          console.error('Error deleting feed item:', error);
        });
    }
  };
  const handleCancelDelete = () => {
    setPostIdToDelete(null);
  };

  // MODIFIER UN POST
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/feedupdate')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching publications: ' + error);
      });
  }, []);

  const handleEditClick = (post) => {
    setSelectedPublication(post);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedPublication(null);
    setIsModalOpen(false);
  };

  const handleSavePublication = (updatedPublication) => {
    axios.put(`http://localhost:3001/feedupdate/${updatedPublication.idFeed}`, updatedPublication)
      .then((response) => {
        console.log('Publication updated: ' + response.data);
        const updatedPublications = posts.map((post) =>
          post.idFeed === updatedPublication.idFeed ? updatedPublication : post
        );
        setPosts(updatedPublications);
        handleModalClose();
      })
      .catch((error) => {
        console.error('Error updating publication: ' + error);
      });
  };

  // LIKE OU DISLIKE
  const [liked, setLiked] = useState(false);
  const handleLikeClick = (idFeed) => {
    if (liked) {
      axios.post('/like', { idFeed: idFeed, idUser: idUser })
        .then((response) => {
          if (response.status === 200) {
            setLiked(false);
            fetchPosts();
          }
        })
        .catch((error) => {
          console.error('Erreur lors du dislike:', error);
        });
    } else {
      axios.post('/like', { idFeed: idFeed, idUser: idUser })
        .then((response) => {
          if (response.status === 201) {
            setLiked(true);
            fetchPosts();
          }
        })
        .catch((error) => {
          console.error('Erreur lors du like:', error);
        });
    }
  };
    return (
    <section>
    {/* MODALE AFFICHER FEED */}
    {isModaleFeedOpen && <ModaleFeed post={selectedPost} idFeed={idFeedRecup} closeModal={closeModaleFeed} />}
    {/* MODALE SIGNALER UN FEED */}
    {isModaleReportOpen && <ModaleReport post={selectedPost} idFeed={idFeedRecup} closeModal={closeModaleReport} />}
    {/* MODALE MODIFIER FEED */}
    {isModalOpen && (<ModaleUpdateFeed post={selectedPublication} onSave={handleSavePublication} onClose={handleModalClose}/>)}
    {/* MODALE SUPPRIMER SON FEED */}
    {postIdToDelete && (
      <section className='bg_modal_del'>
        <div className='content_modal_del'>
            <div className='titleDel'>
              <h4 className='text-center'>Voulez-vous supprimer cette publication ?</h4>
            </div>
            <div className='bodyDel'>
              <Btnsm onClick={handleConfirmDelete} className="btn" caracteristique="sm" text="OUI"/>
              <Btnsm onClick={handleCancelDelete} className="btn" caracteristique="sm" text="NON"/>
            </div>
        </div>
      </section>
      )}
      <div className="contenuPrincipal">
        <div className="blocAmis">
            <button className="btn_friend" type="submit">
                <div className="titreAmis">
                    <p className="text-center text-light bg bg-dark">
                        <img src={friend} className="me-1 mb-1 bg bg-light rounded p-1 m-1" alt="message"/>
                        <strong>Amis</strong>
                    </p>
                </div>
            </button>
            <div className="blocContenu">
            <ul className="text-center mt-2">
                {followingUsers.map(user => (
                    <li key={user.idUser}>
                        <img className="border border-dark" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt="photo de profil"/>
                        {user.pseudoUser}
                        <hr/>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="blocPublication">
            <div className="blocInputComm">
                <div className="w-100">
                    <div>
                        <img className="imgProfil" src={user.avatarUser ? `http://localhost:3001/images/${user.avatarUser}` : profil} alt="photo de profil"/>
                        <form className="formPubli" method="#" action="#">
                            <input type="text" placeholder="Publier une publication ..." value={contentFeed}
                            onChange={(e) => setContentFeed(e.target.value)}/>
                            <button onClick={handlePost} type="submit"><img className="btnSend" src={send} alt="bouton de validation"/></button>
                        </form>
                    </div>
                    <Link className="blocConversation" to={`/myprofile/message/${users}`}>
                        <img className="messageConv" src={conversation} alt="messagerie privée"/>
                        <p className="mess">Messages</p>
                    </Link>
                </div>
            </div>
            {posts.map((post, key) => (
                <div key={key} className="blocPubli">
                <div className="nomPubli">
                <img className="imgProfil" src={post.avatarUser ? `http://localhost:3001/images/${post.avatarUser}` : ''} alt="photo de profil"/>
                    <p className="nameFirstname">{post.pseudoUser}</p>
                    {moddel.some((item) => item.idFeed === post.idFeed) && (
                      <div className="modifierSupprimer">
                        <img onClick={() => handleEditClick(post)} className="imgModifier" src={modifier} alt="modifier le commentaire"/>
                        <img onClick={() => handleDeleteClick(post.idFeed)} className="imgSupprimer" src={supprimer} alt="supprimer le commentaire"/>
                      </div>
                    )}
                </div>
                <div className="blocCommentaire">
                    <p>{post.contentFeed}</p>
                </div>
                <div className="blocAimer">
                <button onClick={() => handleLikeClick(post.idFeed)} type="submit" className="btnAime">
                  <img className="imgAime" src={post.liked ? like : dislike} alt={liked ? "Je n'aime plus" : "J'aime"} />
                  {post.numberOfLikes}
                </button>
                <button onClick={() => openPostModal(post)} type="submit" className="btnComm"><img className="imgComm" src={commentaire} alt="commentaire"/></button>
                <button onClick={() => openReportModal(post)} type="submit" className="btnSignaler"><img className="imgSignaler" src={signaler} alt="signaler"/></button>
                </div>
            </div>
            ))}
        </div>
    </div>
    </section>
    );
  }
  
  export default Home;