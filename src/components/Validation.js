function Validation(values){
    let error = {}
    const email_patt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(values.pseudoUser === ""){
        error.pseudoUser = "Le pseudo ne peut pas être vide";
    }else{
        error.pseudoUser = "";
    }

    if(values.mailUser === ""){
        error.mailUser = "L'adresse mail ne peut pas être vide";
    }else if(!email_patt.test(values.mailUser)){
        error.mailUser = "Mail non valide";
    }else{
        error.mailUser = "";
    }

    if(values.passwordUser === ""){
        error.passwordUser ="le mot de passe ne peux pas etre vide";
    }else if(!password_patt.test(values.passwordUser)){
        error.passwordUser="Mot de passe non valide";
    }else{
        error.passwordUser="";
    }
}

export default Validation;