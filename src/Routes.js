import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import seConnecter from './components/main/login';
import sinscrire from './components/main//register';
import home from './components/main/home';
import message from './components/main/message';
import searchs from './components/main/search';
import parameter from './components/main/parameter';
import cruduser from './components/main/cruduser';
import crudpost from './components/main/crudpost';
import crud from './components/main/adminHome';
import create from './components/main/create';
import choiceUpdate from './components/main/choiceUpdate';
import update from './components/main/update';
import deleted from './components/main/delete';
import read from './components/main/read';
import moderation from './components/main/moderation';
import mentions from './components/main/mentions';
import conditions from './components/main/conditions';

function LaRoute() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" Component={seConnecter}/>
        <Route path="/register" Component={sinscrire}/>
        <Route path="/myprofile" Component={home}/>
        <Route path="/myprofile/resultsearch" Component={searchs}/>
        <Route path="/myprofile/message" Component={message}/>
        <Route path="/myprofile/parameter" Component={parameter}/>
        <Route path="/connect-admin/home" Component={crud}/>
        <Route path="/connect-admin/home/user" Component={cruduser}/>
        <Route path="/connect-admin/home/post" Component={crudpost}/>
        <Route path="/connect-admin/home/user/create" Component={create}/>
        <Route path="/connect-admin/home/user/choiceUpdate" Component={choiceUpdate}/>
        <Route path="/connect-admin/home/user/update/:idUser" Component={update}/>
        <Route path="/connect-admin/home/user/delete" Component={deleted}/>
        <Route path="/connect-admin/home/user/read" Component={read}/>
        <Route path="/connect-admin/moderation" Component={moderation}/>
        <Route path="/myprofile/parameter/mentions" Component={mentions}/>
        <Route path="/conditions" Component={conditions}/>
      </Routes>
    </Router>
    </div>
  );
}

export default LaRoute;