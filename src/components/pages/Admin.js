import PolicsCompanies from '../PolicsCompanies';
import PolicsConfigPlugins from '../PolicsConfigPlugins';
import PolicsUsers from '../PolicsUsers';

function Admin() {

    return (
        <div className="poli-admin">

            <div className="container">

                <PolicsCompanies />
                <br />
                <PolicsUsers />
                <br />
                <PolicsConfigPlugins />

            </div>


        </div>
    );
}

export default Admin;