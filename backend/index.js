// EXPRESS PERMET DE SIMPLIFIE ET ACCELERE LE PROCESSUS DE DEVELOPPEMENT D'APPLI ET API
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
// CORS PERMET DE GERER LES PROBLEMES DE SECURITE
const cors = require("cors");
// AVATAR
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images') // DOSSIER OU SONT STOCKEES LES IMAGES
	},
	filename: (req, file, cb) => {
		const idUser = req.params.idUser;
		const filename = `${idUser}-${Date.now()}-${file.originalname}`;
		cb(null, filename);
	}
})
const upload = multer({
	storage: storage
})
// CREER UNE SESSION
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// HACHER UN MOT DE PASSE
const bcrypt = require("bcrypt");
// LE SEL PERMET D'AMELIORER LA SECURITE DU HACHAGE. ICI ON DONNE LA VALEUR 10 AU MOT DE PASSE AVANT LE HACHAGE.
const saltRounds = 10;

// CONFIGURER LE .ENV
dotenv.config({path: './.env'})

const app = express();
app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	key: "CookieTogether",
	secret: "Together",
	resave: false,
	saveUninitialized: false,
	cookie:{
		expires: 3600000 //millisecondes 	// EXPIRE AU BOUT D'UNE HEURE
	},
}));

// AVATAR
app.use(express.static('public'));

// CONNEXION A LA BASE DE DONNEES
const db = mysql.createConnection({
	user: process.env.DATABASE_USER,
	host : process.env.DATABASE_HOST,
	password: process.env.DATABASE_PASSWORD,
	database : process.env.DATABASE
});

//////////////////////////////////////PAGE HOME/////////////////////////////////////////////////////
app.get('/myprofile/:user', (req, res) => {
	const idUser = req.params.user;
	db.query('SELECT * FROM user WHERE idUser = ' + idUser, (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération des données utilisateur :', err);
		res.status(500).json({ error: 'Erreur lors de la récupération des données utilisateur' });
	  } else {
		if (results.length === 1) {
		  res.json(results[0]);
		} else {
		  res.status(404).json({ error: 'Utilisateur non trouvé' });
		}
	  }
	});
  });

  app.get('/myprofile/message/:user', (req, res) => {
	const idUser = req.params.user;
	db.query('SELECT * FROM user WHERE idUser = ' + idUser, (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération des données utilisateur :', err);
		res.status(500).json({ error: 'Erreur lors de la récupération des données utilisateur' });
	  } else {
		if (results.length === 1) {
		  res.json(results[0]);
		} else {
		  res.status(404).json({ error: 'Utilisateur non trouvé' });
		}
	  }
	});
  });

  //SEARCHBAR
  app.post('/data', (req, res) => {
	const pseudoUser = req.body.pseudoUser;
	if(pseudoUser!==""){
		db.query('SELECT * FROM user WHERE pseudoUser LIKE ?', ["%"+pseudoUser+"%"], (err, result) => {
			if(result!==""){
				console.log(result);
				res.send(result)
			}
		})
	}else{
		res.send([])
	}
  });

  // FOLLOW FRIEND IF NOT FRIEND
app.post('/friendship', (req, res) => {
	const { id_User, id_Friend } = req.body;
	if (id_User === id_Friend) {
	  return res.status(400).json({ error: 'Vous ne pouvez pas vous suivre vous-même.' });
	}
	db.query('SELECT * FROM friend WHERE id_User = ? AND id_Friend= ?', [id_User, id_Friend], (err, results) => {
	  if (err) {
		console.error(err);
		return res.status(500).json({ error: 'Erreur de suivi' });
	  }
	  if (results.length > 0) {
		return res.status(400).json({ error: 'Vous êtes déjà amis avec cet utilisateur.' });
	  }
	  db.query('INSERT INTO friend (id_User, id_Friend) VALUES (?, ?)', [id_User, id_Friend], (err) => {
		if (err) {
		  console.error(err);
		  res.status(500).json({ error: 'Erreur de suivi' });
		} else {
		  res.json({ success: true });
		}
	  });
	});
  });

  // UNFOLLOW FRIEND IF FRIEND
  app.post('/unfollow', (req, res) => {
	const { id_User, id_Friend } = req.body;
	db.query('DELETE FROM friend WHERE id_User = ? AND id_Friend = ?', [id_User, id_Friend], (err) => {
	  if (err) {
		console.error(err);
		res.status(500).json({ error: 'Erreur de désabonnement' });
	  } else {
		res.json({ success: true });
	  }
	});
  });

  // DISPLAY FRIEND
  app.get('/follow/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	db.query(
	  'SELECT * FROM user JOIN friend ON user.idUser = friend.id_Friend WHERE friend.id_User = ?',
	  [idUser],
	  (err, results) => {
		if (err) {
		  console.error('Error fetching following users:', err);
		  res.status(500).json({ error: 'Internal server error' });
		} else {
		  res.json(results);
		}
	  }
	);
  });

    // THE RELATIONSHIP EXIST ?
	// app.get('/checkFollow/:idUser/:idFriend', (req, res) => {
	// 	const { idUser, idFriend } = req.params;
	  
	// 	const query = 'SELECT COUNT(*) AS count FROM friend WHERE id_User= ? AND id_Friend = ?';
	// 	connection.query(query, [idUser, idFriend], (error, results) => {
	// 	  if (error) {
	// 		console.error(error);
	// 		res.status(500).json({ error: 'Erreur lors de la vérification de la relation.' });
	// 	  } else {
	// 		const isFollowing = results[0].count > 0;
	// 		res.json({ isFollowing });
	// 	  }
	// 	});
	//   });

// CREER UN POST
app.post('/addfeed', (req, res) => {
	const { contentFeed, idUser } = req.body;
	db.query('INSERT INTO feed (contentFeed, idUser) VALUES (?,?)', [contentFeed, idUser], (err, result) => {
	  if (err) throw err;
	  res.json({ message: 'Publication ajoutée avec succès'});
	});
  });
// RECUPERER LES FEED DE UTILISATEUR
  app.get('/addfeed/user/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	const query = 'SELECT user.pseudoUser, feed.contentFeed FROM user INNER JOIN feed ON user.idUser = feed.idUser WHERE user.idUser = ?';
	db.query(query, [idUser], (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération des publications : ' + err);
		res.status(500).send('Erreur lors de la récupération des publications');
	  } else {
		res.status(200).json(results);
	  }
	});
  });

// LIRE LES POST DE UTILISATEUR ET SES AMIS
app.get('/readfeed/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	const query = `
	  SELECT user.avatarUser, user.pseudoUser, feed.contentFeed FROM user INNER JOIN feed ON user.idUser = feed.idUser WHERE user.idUser = ?
	  UNION 
	  SELECT user.avatarUser, user.pseudoUser, feed.contentFeed FROM user INNER JOIN feed ON user.idUser = feed.idUser INNER JOIN friend ON user.idUser = friend.id_Friend WHERE friend.id_User = ? `;
	db.query(query, [idUser, idUser], (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération des publications : ' + err);
		res.status(500).send('Erreur lors de la récupération des publications');
	  } else {
		res.status(200).json(results);
	  }
	});
  });

  // LIRE UN POST DANS UNE MODALE
  app.get('/modalefeed/:idFeed', (req, res) => {
	const idFeed = req.params.idFeed;
	db.query('SELECT * FROM feed WHERE idFeed = ?', [idFeed], (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération du feed : ' + err);
		res.status(500).json({ error: 'Erreur serveur' });
	  } else {
		if (results.length === 0) {
		  res.status(404).json({ error: 'Feed non trouvé' });
		} else {
		  res.json(results[0]);
		}
	  }
	});
  });

  // CREER UN COMMENTAIRE DANS UN POST MODALE
  app.post('/modale/comment', (req, res) => {
	const { commentary, idFeed, idUser } = req.body;
	const query = 'INSERT INTO feedcommentary (commentary, idFeed, idUser) VALUES (?, ?, ?)';
	db.query(query, [commentary, idFeed, idUser], (err, result) => {
	  if (err) {
		console.error('Erreur lors de l\'ajout du commentaire : ' + err);
		res.status(500).send('Erreur lors de l\'ajout du commentaire');
	  } else {
		res.status(201).send('Commentaire ajouté avec succès');
	  }
	});
  });

  // AFFICHER LE COMMENTAIRE DANS LA MODALE
  app.get('/modale/getComment/:idFeed', (req, res) => {
	const idFeed = req.params.idFeed;
	const query = 'SELECT feedcommentary.*, user.pseudoUser FROM feedcommentary INNER JOIN user ON feedcommentary.idUser = user.idUser WHERE feedcommentary.idFeed = ?';
	db.query(query, [idFeed], (err, results) => {
	  if (err) {
		console.error(err);
		return res.status(500).send('Failed to fetch comments');
	  }
	  res.status(200).json(results);
	});
  });

  
//////////////////////////////////////////ADMIN/////////////////////////////////////////////////////////////
// CREER UN COMPTE POUR UTILISATEUR
app.post('/register', (req, res) => {
	const pseudoUser = req.body.pseudoUser;
	const mailUser = req.body.mailUser;
	const passwordUser = req.body.passwordUser;
	const birthdayUser = req.body.birthdayUser;
	const roleUser = req.body.roleUser;
	// HASH LE MOT DE PASSE
	bcrypt.hash(passwordUser, saltRounds, (err, hash) => {
		if(err){
			return res.json({Error: "Erreur de hash"});
		}
	// REQUETE
	db.query(
		"INSERT INTO user (pseudoUser,mailUser,passwordUser,birthdayUser, roleUser) VALUES (?,?,?,?,'user')",
		[pseudoUser, mailUser, hash, birthdayUser, roleUser],
		(err, result) => {
			if(err) return res.json({Error: "Problème de requête"});
			return res.status(200).send(true)
		}
		);
	});
});

// CREER UN COMPTE POUR ADMIN
app.post('/connect-admin/home/user/create', (req, res) => {
	const pseudoUser = req.body.pseudoUser;
	const mailUser = req.body.mailUser;
	const passwordUser = req.body.passwordUser;
	const birthdayUser = req.body.birthdayUser;
	const roleUser = req.body.roleUser;
	// HASH LE MOT DE PASSE
	bcrypt.hash(passwordUser, saltRounds, (err, hash) => {
		if(err){
			return res.json({Error: "Erreur de hash"});
		}
	// REQUETE
	db.query(
		"INSERT INTO user (pseudoUser,mailUser,passwordUser,birthdayUser, roleUser) VALUES (?,?,?,?,'user')",
		[pseudoUser, mailUser, hash, birthdayUser, roleUser],
		(err, result) => {
			if(err){
				return res.json({Error: "Problème de requête"});			
			}else{
				console.log(result);
			}

		}
		);
	});
});

// MODIFIER UN COMPTE UTILISATEUR POUR ADMIN
//LISTE DE TOUS LES UTILISATEURS
// app.get('/connect-admin/home/user/choiceUpdate', (req, res) => {
// 	const sql = "SELECT * FROM user";
// 	db.query(sql,(err , result)=>{
// 		if(err) return res.json({Message: "Erreur"});
// 		return res.json(result);
// 	})
// })
app.get('/connect-admin/home/user/choiceUpdate', (req, res) => {
	db.query('SELECT * FROM user', (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération des utilisateurs : ' + err);
		res.status(500).send('Erreur lors de la récupération des utilisateurs');
	  } else {
		res.json(results);
	  }
	});
  });
// CLIQUE SUR LE BOUTON MODIFIER
// app.put('/connect-admin/home/user/update/:idUser', (req, res) => {
// 	const idUser = req.params.idUser;
// 	const pseudoUser = req.body.pseudoUser;
// 	const mailUser = req.body.mailUser;
// 	const sql = 'UPDATE user SET `pseudoUser` = ?, `mailUser` = ? WHERE idUser = ?';
// 	db.query(sql, [pseudoUser, mailUser, idUser], (err, result) => {
// 		if(err) return res.json({Message: "Erreur"});
// 		return res.json(result);
// 	})
// })
app.put('/connect-admin/home/user/choiceUpdate/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	const pseudoUser = req.body.pseudoUser;
	const mailUser = req.body.mailUser;
	const sql = 'UPDATE user SET `pseudoUser` = ?, `mailUser` = ? WHERE idUser = ?';
	db.query(sql, [pseudoUser, mailUser, idUser], (err, result) => {
	  if (err) {
		console.error('Erreur lors de la mise à jour de l\'utilisateur : ' + err);
		res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
	  } else {
		console.log('Utilisateur mis à jour avec succès');
		res.status(200).send('Utilisateur mis à jour avec succès');
	  }
	});
  });

// SUPPRIMER UN COMPTE UTILISATEUR POUR ADMIN
// app.delete('/connect-admin/home/user/delete/:idUser', (req, res) => {
// 	const sql = 'DELETE FROM user WHERE idUser=?' ;
// 	const idUser = req.params.idUser;
// 	db.query(sql, [idUser], (err, result) => {
// 		if(err) return res.json({Message: "erreur"});
// 		return res.json(result);
// 	})
// })

app.delete('/connect-admin/home/user/delete/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	db.query('DELETE FROM user WHERE idUser = ?', [idUser], (err, result) => {
		if (err){
			console.error('Erreur lors de la suppression du compte : ' + err);
			res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
		}else{
			res.json({ message: 'Compte supprimé avec succès' });
			// res.clearCookie('CookieTogether');
	  		// res.redirect('/');
		}
	});
});

// LIRE LES COMPTES UTILISATEUR POUR ADMIN
app.get('/connect-admin/home/user/read', (req, res) => {
	const idUser = req.params.idUser;
	const sql = "SELECT * FROM user";
	db.query(sql,(err , result)=>{
		if(err) return res.json({Message: "Erreur"});
		return res.json(result);
	})
})

// SE CONNECTER EN TANT UTILISATEUR
app.post('/', (req, res) => {
	const mailUser = req.body.mailUser;
	const passwordUser = req.body.passwordUser;
	// REQUETE
	db.query(
		"SELECT * FROM user WHERE mailUser = ?",
		mailUser,
		(err, data) => {
			if(err) return console.log("erreur de login");
			if(data.length > 0) {
				bcrypt.compare(passwordUser,data[0].passwordUser, (err, response) => {
					if(response){
						res.cookie('CookieTogether', data[0].idUser)
						console.log('login success')
						res.status(200).json(data[0].idUser)
					}else{
						console.log('login failed')
					}
					if(err) return console.log('probleme de mot de passe');
				});
			}else {
				return console.log('utilisateur non trouvé');
			}
		}
	);
});

///////////////////////////////////////////PAGE PARAMETRE////////////////////////////////////////////
// GESTION DES AVATAR
app.post('/upload/:idUser', upload.single('image'), (req, res) => {
	// console.log(req.file)
	const idUser = req.params.idUser
	const image = req.file.filename;
	const sql = "UPDATE user SET avatarUser = ? WHERE idUser = ?";
	db.query(sql, [image, idUser],(err, result) =>{
		if(err) return res.status(500).json({Message: "Erreur dans la requête de l'avatar"});
		return res.json({Status: "Success"});
	})
})

app.get('/avatar/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	const sql = 'SELECT * FROM user WHERE idUser = ?';
	db.query(sql, [idUser], (err, result) => {
		if(err) return res.status(500).json("Error L211");
		return res.json(result);
	})
})

// RECUPERATION DES DONNEES DE PROFIL
app.get('/myprofile/parameter/:user', (req, res) => {
	const idUser = req.params.user;
	db.query('SELECT * FROM user WHERE idUser = ' + idUser, (err, results) => {
	  if (err) {
		console.error('Erreur lors de la récupération des données utilisateur :', err);
		res.status(500).json({ error: 'Erreur lors de la récupération des données utilisateur' });
	  } else {
		if (results.length === 1) {
		  res.json(results[0]);
		} else {
		  res.status(404).json({ error: 'Utilisateur non trouvé' });
		}
	  }
	});
  });

// L'UTILISATEUR MODIFIE SON PROFIL
//LISTE DES INFORMATIONS DE UTILISATEUR
app.get('/utilisateur/:idUser', (req, res) => {
	const idUser = req.params.idUser
	const sql = "SELECT * FROM user WHERE idUser = ?";
	db.query(sql, idUser, (err , result)=>{
		if(err) return res.json({Message: "Erreur"});
		return res.json(result[0]);
	})
})
// CLIQUE SUR LE BOUTON CONFIRMER
app.put('/utilisateur/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	const pseudoUser = req.body.pseudoUser;
	const mailUser = req.body.mailUser;
	const sql = 'UPDATE user SET `pseudoUser` = ?, `mailUser` = ? WHERE idUser = ?';
	db.query(sql, [pseudoUser, mailUser, idUser], (err, result) => {
		if(err) return res.json({Message: "Erreur"});
		return res.json(result);
	})
})

// L'UTILISATEUR SUPPRIME SON COMPTE
app.delete('/delete/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	db.query('DELETE FROM user WHERE idUser = ?', [idUser], (err, result) => {
		if (err){
			console.error('Erreur lors de la suppression du compte : ' + err);
			res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
		}else{
			res.json({ message: 'Compte supprimé avec succès' });
			// res.clearCookie('CookieTogether');
	  		// res.redirect('/');
		}
	});
});

// AFFICHAGE SELON LE ROLE DE L'UTILISATEUR
app.get('/roleUser/:idUser', (req, res) => {
	const idUser = req.params.idUser;
	db.query('SELECT roleUser FROM user WHERE idUser = ?', [idUser], (err, results) => {
		if(err){
			console.log("erreur du role de l'utilisateur", err);
			res.status(500).json({error: 'Erreur serveur'});
			return;
		}
		if(results.length === 0){
			res.status(404).json({error: 'utilisateur non trouvé'});
		}else{
			const roleUser = results[0].roleUser;
			res.json({roleUser: roleUser});
		}
	});
});

// DECONNEXION A LA SESSION
app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
	  if (err) {
		console.error('Erreur lors de la déconnexion :', err);
		return res.status(500).send('Erreur lors de la déconnexion');
	  }
	  res.clearCookie('CookieTogether');
	  res.redirect('/');
	});
  });

// ECOUTE LE PORT 3001
app.listen(3001, () => {
	console.log(`Le port de mon backend est le : 3001`);
});