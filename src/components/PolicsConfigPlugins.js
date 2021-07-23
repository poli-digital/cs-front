import { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import FormPiperunConfig from './FormPiperunConfig';
import { getPlugins, getConfigPlugins } from '../utils/dataSelectUtils';
import getInstancePolicsApi from '../utils/policsApiRequestHelper';
import FormPolichaConfig from './FormPolichaConfig';

function PolicsConfigPlugins() {

    const [modal, setmodal] = useState(null);
    const [bodyModal, setbodyModal] = useState(null);
    const [selectedPluginId, setselectedPluginId] = useState(0);
    const [plugins, setplugins] = useState([]);
    const [configPlugins, setconfigPlugins] = useState([]);

    useEffect(() => {
        mount();
        return () => {
            unmount();
        }
    }, []);

    async function mount() {
        const elementModal = document.querySelector('#modal');
        elementModal.addEventListener('hide.bs.modal', (event) => {
            closeModal();
        });

        setmodal(new Modal(elementModal));

        const plugins = await getPlugins();
        setplugins(plugins);

        const configPlugins = await getConfigPlugins();
        setconfigPlugins(configPlugins);
    }

    function unmount() {
        setmodal(null);
        setplugins([]);
    }

    function openModal() {
        if (modal) modal.show();
    }

    function closeModal() {
        if (modal) modal.hide();
        setbodyModal(null);
        setselectedPluginId(0);
    }

    async function callbackSendFormFunction() {
        closeModal();
        const configPlugins = await getConfigPlugins();
        setconfigPlugins(configPlugins);
    }

    function handleChangeSelectedPlugin(event) {
        setselectedPluginId(event.target.value);
        const text = plugins[event.target.value - 1]?.name;
        switch (text) {
            case 'Piperun':
                setbodyModal(<FormPiperunConfig pluginId={event.target.value} callbackSendForm={callbackSendFormFunction} />);
                break;
            case 'Polichat':
                setbodyModal(<FormPolichaConfig pluginId={event.target.value} callbackSendForm={callbackSendFormFunction} />);
                break;
            case 'Superlógica':
                setbodyModal(null);
                break;
            case 'Datawarehouse':
                setbodyModal(null);
                break;
            default:
                setbodyModal(null);
                break;
        }
    }

    async function removeAConfigPlugin(item) {
        const id = item.id;

        if (id === 1) return alert(`Você não pode excluir a configuração de plugin de id 1`)

        const confirmDelete = window.confirm(`Você realmente deseja excluir a configuração de plugin ${id}?`);
        if (!confirmDelete) return;

        try {
            const response = await getInstancePolicsApi().delete(`configPlugins/${id}`);
            if (!response) return alert('Falha na requisição');
            if (response.status === 200 || response.status === 201) {
                setconfigPlugins(configPlugins.filter(item => item.id !== id));
                return alert('Configuração de plugin excluida com sucesso!');
            }
        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro no servidor'
            alert(message);
        }
    }

    function editAConfigPlugin(item) {
        setselectedPluginId(item.plugin_id);
        const text = item.config_plugins_plugin.name;
        switch (text) {
            case 'Piperun':
                setbodyModal(<FormPiperunConfig id={item.id}
                    pluginId={item.plugin_id}
                    title={item.title}
                    token={item.token}
                    visible={item.visible}
                    useAccordion={item.use_accordion}
                    fieldActivity={item.field_activity}
                    fieldTitle={item.field_title}
                    fieldNotes={item.field_notes}
                    fieldCreation={item.field_creation}
                    fieldOwner={item.field_owner}
                    fieldStage={item.field_stage}
                    fieldFunnel={item.field_funnel}
                    fieldStatus={item.field_status}
                    companyId={item.company_id}
                    callbackSendForm={callbackSendFormFunction} />)
                break;
            case 'Polichat':
                setbodyModal(<FormPolichaConfig id={item.id}
                    pluginId={item.plugin_id}
                    title={item.title}
                    token={item.token}
                    visible={item.visible}
                    fieldIdContact={item.field_id_contact}
                    fieldName={item.field_name}
                    fieldNumber={item.field_number}
                    fieldCompany={item.field_company}
                    fieldTalk={item.field_talk}
                    companyId={item.company_id}
                    callbackSendForm={callbackSendFormFunction}
                    />);
                break;
            case 'Superlógica':
                setbodyModal(null);
                break;
            case 'Datawarehouse':
                setbodyModal(null);
                break;
            default:
                setbodyModal(null);
                break;
        }
        openModal();
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
                <table className="table table-hover table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Token</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Plugin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {configPlugins.map((item) => {
                            return <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.token?.length > 10 ? `${item.token.slice(0, 10)}...` : item.token}</td> 
                                <td>{item.config_plugins_company.name}</td>
                                <td>{item.config_plugins_plugin.name}</td>
                                <td>
                                    <div className="d-flex flex-row justify-content-end">
                                        <button onClick={() => { removeAConfigPlugin(item) }} className="btn btn-outline-danger btn-sm me-1">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button onClick={() => { editAConfigPlugin(item) }} className="btn btn-outline-warning btn-sm me-1">
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="modal" tabIndex="-1">

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="companieModalLabel">Configuração de plugin</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Plugin</span>
                                <select className="form-select" value={selectedPluginId} onChange={handleChangeSelectedPlugin}>
                                    <option value='0'>Escolha uma Opção</option>
                                    {plugins.map((item) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })}
                                </select>
                            </div>
                            <br />
                            {bodyModal}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicsConfigPlugins;