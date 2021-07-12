import '../../css/LoginPage.css'
import { useHistory } from "react-router-dom";
import { useState } from 'react'
import { login } from '../../utils/loginUtils';
import { handleUrl } from '../../utils/utilsHelper';
import { fetchPost } from '../../utils/policsApiRequestHelper';

function LoginPage() {

  let history = useHistory();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  function handleChangeEmail(event) {
    let text = event.target.value;
    setemail(text);
  }

  function handleChangePassword(event) {
    let text = event.target.value;
    setpassword(text);
  }

  function handleEnterInPassword(event) {
    if (event.key === 'Enter') {
      signin();
    }
  }

  async function signin() {

    try {

      let url = handleUrl(process.env.REACT_APP_URL_BACKEND);

      const rawResponse = await fetchPost(`${url}auth/login`, { email: email, password: password })

      if (!rawResponse || rawResponse?.status === 500) return;
      
      const content = await rawResponse.json();

      if (rawResponse?.status === 200 && content?.token && content?.user) {
        login(content.token, content.user);
        history.push("/")
      }

      if (rawResponse?.status === 401) {
        alert('Email inválido ou senha incorreta!');
      }

    } catch (err) {
      alert('Erro ao fazer login, tente novamente mais tarde.');
    }

  }

  return (
    <div className="component-loginpage">
      <form>
      <div className="container-fluid box-body">
        <div className="row p-5 justify-content-center">
          <div className="col-md-3 bg-blue-poli p-4 shadown-blue-poli radius text-white">
            <div className="form-group text-center">
              <strong><h5>POLICS</h5></strong>
            </div>
            <div className="form-group">
              <small>Insira o seu e-mail</small>
              <input autoFocus onChange={handleChangeEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" autoComplete="off"/>
            </div>
            <br />
            <div className="form-group">
              <small>Insira a sua senha</small>
              <input onChange={handleChangePassword} onKeyPress={handleEnterInPassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" autoComplete="off"/>
            </div>
            <br />
            <div className="form-group">
              <button onClick={signin} type="button" className="btn btn-outline-light">Entrar</button>
            </div>
          </div>
          <br />
        </div>
      </div>
      </form>
    </div>
  );
}

export default LoginPage;