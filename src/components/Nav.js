import { logout } from "../utils/loginUtils";
import { useHistory } from 'react-router-dom'
import Admin from "./pages/Admin";
import DashBoard from "./pages/DashBoard";

function Nav(props) {

    const userAuth = props.userAuth;
    const history = useHistory();

    function goLogout() {
        logout();
        history.push('/login');
    }

    const renderPage = (component) => {
        const renderPageFunction = props.renderPageFunction;
        if(renderPageFunction) renderPageFunction(component);
    }

    return (
        <div className="poli-nav">
            <div className="navbar navbar-dark bg-dark text-white mb-3">
                <nav className="container d-flex flex-row flex-wrap justify-content-between">
                    <div><h3 className="mb-0">{props.title}</h3></div>
                    <div>
                        <div className="dropdown">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className="rounded-circle dropdown-toggle border border-white" width="35" height="35" alt="" loading="lazy" />
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><span className="dropdown-item text-primary">{userAuth}</span></li>
                                <li><span onClick={()=>{renderPage(<DashBoard/>)}} className="dropdown-item">Tela principal</span></li>
                                <li><span onClick={()=>{renderPage(<Admin/>)}} className="dropdown-item">Administração</span></li>
                                <li><span onClick={goLogout} className="dropdown-item">Sair</span></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );

}

export default Nav;