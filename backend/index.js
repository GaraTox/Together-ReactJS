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

// CREER UN COMPTE POUR UTILISATEUR ET ADMIN
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
			return res.redirect('/')
		}
		);
	});
});



// MODIFIER UN COMPTE UTILISATEUR POUR ADMIN

// SUPPRIMER UN COMPTE UTILISATEUR POUR ADMIN

// LIRE LES COMPTES UTILISATEUR POUR ADMIN

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

// app.get('/', (req, res) => {
// 	if(req.session.user){
// 		res.send({loggedIn: true, user: req.session.user})
// 		return res.redirect('/myprofile')
// 	}else{
// 		res.send({loggedIn: false})
// 	}
// })

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