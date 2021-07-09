import { logout } from "../utils/loginUtils";
import { useHistory } from 'react-router-dom'

function Nav(props) {

    let history = useHistory();

    function goLogout() {
        logout();
        history.push('/login');
    }

    return (
        <div className="poli-nav">
            <div className="navbar navbar-dark bg-dark text-white">
                <nav className="container d-flex flex-row flex-wrap justify-content-between">
                    <div><h3 className="mb-0">{props.title}</h3></div>
                    <div>
                        <div className="dropdown">
                            <img src="https://avatars.githubusercontent.com/u/7959297?v=4" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className="rounded-circle dropdown-toggle border border-white" height="35" alt="" loading="lazy" />
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Admin</a></li>
                                <li><a className="dropdown-item" href="#">Configurações</a></li>
                                <li><a onClick={goLogout} className="dropdown-item">Sair</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );

}

export default Nav;