import '../../css/LoginPage.css'
import { useHistory } from "react-router-dom";
import { useState } from 'react'
import { login } from '../../utils/loginUtils';

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

    const rawResponse = await fetch('http://localhost:12345/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({ email: email, password: password })
    });

    if (rawResponse?.status == 500) return;
    const content = await rawResponse.json();

    if (content?.token && rawResponse?.status == 200) {
      login();
      history.push("/")
    }

    if(rawResponse?.status == 401){
      alert('Email inválido ou senha incorreta!');
    }


  }

  return (
    <div className="component-loginpage">
      <div className="container-fluid box-body">
        <div className="row p-5 justify-content-center">
          <div className="col-md-3 bg-blue-poli p-4 shadown-blue-poli radius text-white">
            <div className="form-group text-center">
              <strong><h5>POLICS</h5></strong>
            </div>
            <div className="form-group">
              <small>Insira o seu e-mail</small>
              <input autoFocus onChange={handleChangeEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" />
            </div>
            <br />
            <div className="form-group">
              <small>Insira a sua senha</small>
              <input onChange={handleChangePassword} onKeyPress={handleEnterInPassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" />
            </div>
            <br />
            <div className="form-group">
              <button onClick={signin} type="button" className="btn btn-outline-light">Entrar</button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;