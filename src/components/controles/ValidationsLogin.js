import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  mailUser: Yup.string()
    .email('L\'email n\'est pas valide')
    .required('L\'email est requis'),
  passwordUser: Yup.string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .required('Le mot de passe est requis'),
});

export default validationSchema;