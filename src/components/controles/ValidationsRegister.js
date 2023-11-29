import dayjs from 'dayjs';
import { date } from 'yup';
import * as Yup from 'yup';

const limit = dayjs().subtract(16, "years").format("YYYY-MM-DD");
const isUnderage = (birthdate) => {
  const thirteenYearsAgo = dayjs().subtract(16, 'years');
  return dayjs(birthdate, 'DD/MM/YYYY').isAfter(thirteenYearsAgo);
};

export const Validation = Yup.object().shape({
  pseudoUser: Yup.string()
    .min(4, "Le pseudo doit comporter au moins 4 caractères.")
    .required("Le pseudo est requis."),
  mailUser: Yup.string()
    .email("L'email n'est pas valide.")
    .required("L'email est requis."),
  birthdayUser: Yup.string()
    .transform((originalValue) => dayjs(originalValue, 'DD/MM/YYYY').format('YYYY-MM-DD'))
    .max(limit, 'Vous devez avoir 16 ans pour vous inscrire.')
    .required('La date de naissance est requise.'),
  passwordUser: Yup.string()
    .min(5, "Le mot de passe doit comporter au moins 5 caractères.")
    .required("Le mot de passe est requis."),
  conditions: Yup.boolean().oneOf([true], 'Vous devez accepter les termes et conditions'),
});