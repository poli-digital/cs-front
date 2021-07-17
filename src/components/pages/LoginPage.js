import '../../css/LoginPage.css'
import { useHistory } from "react-router-dom";
import { useState } from 'react'
import { login } from '../../utils/loginUtils';
import getInstancePolicsApi from '../../utils/policsApiRequestHelper';

function LoginPage() {

  let history = useHistory();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  async function signin() {

    try {

      const instancePolics = getInstancePolicsApi();
      const response = await instancePolics.post('auth/login', {email:email, password:password});

      if (!response || response?.status === 500) return alert('Não foi possível fazer o login, tente novamente');

      if (response?.status === 401) {
        alert('Email inválido ou senha incorreta!');
      }

      const data = response.data;

      if (response?.status === 200 && data?.token && data?.user) {
        login(data.token, data.user);
        history.push("/")
      }

    } catch (err) {
      //console.log(err.toJSON());
      //console.log(err.request);
      //console.log(err.config);
      //console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
      let message = err.response?.data?.message;
      message = message ? message : 'Erro ao fazer login, tente novamente mais tarde.'
      
      alert(message);
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
              <input autoFocus onChange={(event)=>{setemail(event.target.value)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" autoComplete="off"/>
            </div>
            <br />
            <div className="form-group">
              <small>Insira a sua senha</small>
              <input onChange={(event)=>{setpassword(event.target.value)}} onKeyPress={(event)=>{if (event.key === 'Enter') signin()}} type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" autoComplete="off"/>
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