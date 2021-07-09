import {Redirect, Route} from 'react-router-dom'
import { isLogin } from '../utils/loginUtils';

function PrivateRouter({children, ...props}) {
    return (
        <Route {...props} render={()=> {return isLogin() ? children : <Redirect to="/login"/>}}/>
    );
}

export default PrivateRouter;