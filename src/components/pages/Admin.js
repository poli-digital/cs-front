import { useState, useEffect } from 'react'
import { fetchGet } from '../../utils/policsApiRequestHelper';
import { handleUrl } from '../../utils/utilsHelper';

const url = handleUrl(process.env.REACT_APP_URL_BACKEND);
const token = localStorage.getItem('jwt');

function Admin() {

    useEffect(() => {
        getCompanies();
        getUsers();
        getConfigPlugins();
        return () => {
            setcompanies([]);
            setusers([]);
            setconfigPlugins([]);
        }
    }, []);

    const [companies, setcompanies] = useState([]);
    const [users, setusers] = useState([]);
    const [configPlugins, setconfigPlugins] = useState([]);


    async function getCompanies() {

        const rawResponse = await fetchGet(`${url}companies`, token);
        if (!rawResponse || rawResponse?.status === 401) return;

        const response = await rawResponse.json();
        if (response instanceof Array) {
            setcompanies(response);
        }
    }

    async function getUsers() {

        const rawResponse = await fetchGet(`${url}users`, token);
        if (!rawResponse || rawResponse?.status === 401) return;

        const response = await rawResponse.json();
        if (response instanceof Array) {
            setusers(response);
        }

    }

    async function getConfigPlugins() {

        const rawResponse = await fetchGet(`${url}configPlugins`, token);
        if (!rawResponse || rawResponse?.status === 401) return;

        const response = await rawResponse.json();
        if (response instanceof Array) {
            setconfigPlugins(response);
        }

    }

    return (
        <div className="poli-admin">

            <div className="container">

                <div className="row">
                    <h5>Empresas</h5>
                    <table className="table table-bordered table-sm border-dark">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">CNPJ</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {companies.map((item) => {
                                return <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.cnpj}</td>
                                    <td></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <h5>Usuarios</h5>
                    <table className="table table-bordered table-sm border-dark">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                <th scope="col">Papel</th>
                                <th scope="col">Empresa</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map((item) => {
                                    return <tr key={item.id}>
                                        <th>{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.blocked ? 'Bloqueado' : 'Ativo'}</td>
                                        <td>{item.role.nickname}</td>
                                        <td>{item.company.name}</td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <h5>Configurações de Plugins</h5>
                    <table className="table table-bordered table-sm border-dark">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Token</th>
                                <th scope="col">Empresa</th>
                                <th scope="col">Plugin</th>
                            </tr>
                        </thead>
                        <tbody>

                            {configPlugins.map((item) => {
                                return <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.token}</td>
                                    <td>{item.config_plugins_plugin.name}</td>
                                    <td>{item.config_plugins_company.name}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>


            </div>


        </div>
    );
}

export default Admin;