// EXPRESS PERMET DE SIMPLIFIE ET ACCELERE LE PROCESSUS DE DEVELOPPEMENT D'APPLI ET API
const express = require("express");
const mysql = require("mysql");
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
	secret: "subscribe",
	resave: false,
	saveUninitialized: false,
	cookie:{
		expires: 60 * 60 * 24	// EXPIRE AU BOUT D'UNE JOURNEE
	},
}));

// CONNEXION A LA BASE DE DONNEES
const db = mysql.createConnection({
	user: 'root',
	host : 'localhost',
	password: '',
	database : 'together'
});

// CREER UN COMPTE POUR UTILISATEUR ET ADMIN
app.post('/register', (req, res) => {
	const pseudoUser = req.body.pseudoUser;
	const mailUser = req.body.mailUser;
	const passwordUser = req.body.passwordUser;
	const birthdayUser = req.body.birthdayUser;
	const roleUser = req.body.roleUser;
	// HACHER LE MOT DE PASSE
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
						return res.redirect('/myprofile')
					}
					if(err) return res.json({Error: "Probleme de mot de passe"});
				});
			}	
		}
	);
});

app.get('/', (req, res) => {
	if(req.session.user){
		res.send({loggedIn: true, user: req.session.user})
		return res.redirect('/myprofile')
	}else{
		res.send({loggedIn: false})
	}
})

// DECONNEXION A LA SESSION
app.get('/'), (req, res) => {
	res.clearCookie('CookieTogether');
	return res.redirect('/')
}

// ECOUTE LE PORT 3001
app.listen(3001, () => {
	console.log(`Le port de mon backend est le : 3001`);
});