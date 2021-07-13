import '../css/App.css';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Main from './pages/Main';

function App() {
  return (
    <Router>
      
      <Switch>
        
        <PublicRouter exact path="/login">
          <LoginPage/>
        </PublicRouter> 
        
        <PrivateRouter exact path="/">
          <Main/>
        </PrivateRouter>
        
        <Route>
          <NotFound/>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
