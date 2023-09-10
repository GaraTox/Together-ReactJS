// store.js
import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Store
const initStore = {
  connected: false,
  idUser: 0, // Par défaut, 0 si aucune valeur n'est trouvée
  avatarUser: '',
  pseudoUser: '',
  mailUser: '',
  birthdayUser: '',
  roleUser: ''
};

// Actions creators
const setConnected = (value) => ({
  type: "setConnected",
  payload: value,
});

const setIdUser = (value) => ({
  type: "setIdUser",
  payload: value,
});

const setAvatarUser = (value) => ({
  type: "setAvatarUser",
  payload: value,
});

const setPseudoUser = (value) => ({
  type: "setPseudoUser",
  payload: value,
});

const setMailUser = (value) => ({
  type: "setMailUser",
  payload: value,
});

const setBirthdayUser = (value) => ({
    type: "setBirthdayUser",
    payload: value,
  });

const setRoleUser = (value) => ({
  type: "setRoleUser",
  payload: value,
});

// Reducer
const rootReducers = (state = initStore, action) => {
  switch (action.type) {
    case "setConnected":
      return {
        ...state,
        connected: action.payload,
      };
    case "setIdUser":
      return {
        ...state,
        idUser: action.payload,
      };
    case "setAvatarUser":
      return {
        ...state,
        avatarUser: action.payload,
      };
    case "setPseudoUser":
      return {
        ...state,
        pseudoUser: action.payload,
      };
    case "setMailUser":
      return {
        ...state,
        mailUser: action.payload,
      };
    case "setBirthdayUser":
      return {
        ...state,
        birthdayUser: action.payload,
      };
    case "setRoleUser":
        return {
        ...state,
        roleUser: action.payload,
    };
    default:
      return state;
  }
};

// Create the Redux store
const persistConfig = {
  key: 'root', // La clé racine pour le stockage local
  storage, // Utilisez le stockage local (vous pouvez changer cela en sessionStorage ou tout autre stockage)
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = legacy_createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor, setConnected, setIdUser, setAvatarUser, setPseudoUser, setMailUser, setBirthdayUser, setRoleUser };
