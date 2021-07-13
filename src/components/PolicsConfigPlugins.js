import {useState, useEffect} from 'react'
import getInstancePolicsApi from '../utils/policsApiRequestHelper';
import { Modal } from 'bootstrap';

const instancePolics = getInstancePolicsApi();
let modal;

function PolicsConfigPlugins() {

    useEffect(() => {
        modal = new Modal(document.querySelector('#configPluginModal'));
        getConfigPlugins();
        return () => {
            setconfigPlugins([]);
        }
    }, []);

    const [configPlugins, setconfigPlugins] = useState([]);

    async function getConfigPlugins() {
        const response = await instancePolics.get('configPlugins');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setconfigPlugins(data);
        }
    }

    function openModal() {
        modal.show();
    }

    function closeModal() {
        modal.hide();
    }
    
    return (
        <div className="row">
            
            <div className="d-flex flex-row justify-content-between">
                <h5>Configuração de plugin</h5>
                <button className="btn btn-outline-success btn-sm ms-3" type="button" onClick={openModal}>
                    Nova configuração de plugin
                </button>
            </div>

            <div className="table-responsive mt-3">
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

            <div className="modal fade" id="configPluginModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="companieModalLabel">Empresa</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">Nome</span>
                                <input type="text" aria-label="Nome da empresa" className="form-control" />
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">CNPJ</span>
                                <input type="text" aria-label="Cnpj da empresa" className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Criar nova Empresa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicsConfigPlugins;