import Nav from '../Nav'
import '../../css/Main.css'
import {useEffect, useState} from 'react'
import DashBoard from './DashBoard';

function Main() {

  useEffect(() => {
    getUserLogged();
    return () => {
      setemailLoggedUser('');
    }
  }, [])

  const [emailLoggedUser, setemailLoggedUser] = useState('');
  const [componentMain, setcomponentMain] = useState(<DashBoard/>);

  function getUserLogged() {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    if(user) setemailLoggedUser(user.email);
  }

  function renderPage(componentPage) {
    setcomponentMain(componentPage);
  }

  return (
    <div className="poli-main">

      <Nav title="POLICS" userAuth={emailLoggedUser} renderPageFunction={renderPage}/>
      {componentMain}


    </div>
  );
}

export default Main;