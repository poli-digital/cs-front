import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../utils/loginUtils';

function PublicRouter({children, ...props}) {
    return (
        <Route {...props} render={()=>{return isLogin() ? <Redirect to="/"/> : children }} />
    );
}

export default PublicRouter;