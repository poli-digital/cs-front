import Nav from '../Nav'
import '../../css/Main.css'
import { useEffect, useState } from 'react'
import DashBoard from './DashBoard';
import Wellcome from './Wellcome';

function Main() {

  useEffect(() => {
    mount();
    return () => {
      unmount();
    }
  }, [])

  function mount() {
    getUserLogged();
    const companyLocalstorage = localStorage.getItem('company');
    if (companyLocalstorage) {
      setcomponentMain(<DashBoard />);
    } else {
      setcomponentMain(<DashBoard />);
    }
  }

  function unmount() {
    setemailLoggedUser('');
  }

  const [emailLoggedUser, setemailLoggedUser] = useState('');
  const [componentMain, setcomponentMain] = useState(null);//<DashBoard/>

  function getUserLogged() {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    if (user) setemailLoggedUser(user.email);
  }

  function renderPage(componentPage) {
    setcomponentMain(componentPage);
  }

  return (
    <div className="poli-main">

      <Nav title="POLICS" userAuth={emailLoggedUser} renderPageFunction={renderPage} />
      {componentMain}


    </div>
  );
}

export default Main;