import * as Yup from 'yup';

export const Validation = Yup.object().shape({
  mailUser: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  passwordUser: Yup.string()
    .min(5, "Le mot de passe doit comporter au moins 5 caractères")
    .required("Le mot de passe est requis"),
});