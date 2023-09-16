// EXPRESS PERMET DE SIMPLIFIE ET ACCELERE LE PROCESSUS DE DEVELOPPEMENT D'APPLI ET API
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
// CORS PERMET DE GERER LES PROBLEMES DE SECURITE
const cors = require("cors");
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
	methods: ["GET", "POST"],
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

// CONNEXION A LA BASE DE DONNEES
const db = mysql.createConnection({
	user: process.env.DATABASE_USER,
	host : process.env.DATABASE_HOST,
	password: process.env.DATABASE_PASSWORD,
	database : process.env.DATABASE
});

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
			return res.redirect('/connect-admin/home')
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
			if(err) return res.json({Error: "Problème de requête"});
			return res.redirect('/connect-admin/home')
		}
		);
	});
});

// MODIFIER UN COMPTE UTILISATEUR POUR ADMIN
//LISTE DE TOUS LES UTILISATEURS
app.get('/connect-admin/home/user/choiceUpdate', (req, res) => {
	const sql = "SELECT * FROM user";
	db.query(sql,(err , result)=>{
		if(err) return res.json({Message: "Erreur"});
		return res.json(result);
	})
})
// CLIQUE SUR LE BOUTON MODIFIER
app.put('/connect-admin/home/user/update/:idUser', (req, res) => {
	const pseudoUser = req.body.pseudoUser;
	const mailUser = req.body.mailUser;
	const sql = 'UPDATE user SET `pseudoUser` = ?, `mailUser` = ? WHERE idUser = ?';
	const idUser = req.params.idUser;
	db.query(sql, [pseudoUser, mailUser, idUser], (err, result) => {
		if(err) return res.json({Message: "Erreur"});
		return res.json(result);
	})
})

// SUPPRIMER UN COMPTE UTILISATEUR POUR ADMIN
app.delete('/connect-admin/home/user/delete/:idUser', (req, res) => {
	const sql = 'DELETE FROM user WHERE idUser=?' ;
	const idUser = req.params.idUser;
	db.query(sql, [idUser], (err, result) => {
		if(err) return res.json({Message: "erreur"});
		return res.json(result);
	})
})

// LIRE LES COMPTES UTILISATEUR POUR ADMIN
app.get('/connect-admin/home/user/read', (req, res) => {
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
			if(err) return res.json({Error: "Erreur de login"});
			if(data.length > 0) {
				bcrypt.compare(passwordUser,data[0].passwordUser, (err, response) => {
					if(response){
						req.session.user = data;
						console.log(req.session.user)
						
						res.redirect('/myprofile')
					}
					if(err) return res.json({Error: "Probleme de mot de passe"});
				});
			}else {
				return res.json({ Error: "Utilisateur non trouvé" });
			}
		}
	);
});

// RECUPERATION DES DONNEES DE PROFIL
app.get('/myprofile/parameter/:idUser', (req, res) => {
    const idUser = req.params.idUser;
    const sql = `SELECT * FROM user WHERE idUser = ${idUser}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
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