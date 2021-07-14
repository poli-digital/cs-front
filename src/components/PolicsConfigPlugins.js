import { useState, useEffect } from 'react'
import getInstancePolicsApi from '../utils/policsApiRequestHelper';
import { Modal } from 'bootstrap';

const instancePolics = getInstancePolicsApi();
let modal;

function PolicsConfigPlugins() {

    useEffect(() => {
        modal = new Modal(document.querySelector('#configPluginModal'));
        getConfigPlugins();
        return () => {
            modal.hide();
            setconfigPlugins([]);
        }
    }, []);

    const [configPlugins, setconfigPlugins] = useState([]);

    const [title, settitle] = useState('');
    const [token, settoken] = useState('');
    const [visible, setvisible] = useState(false);
    const [useAccordion, setuseAccordion] = useState(false);
    const [fieldId, setfieldId] = useState(false);
    const [fieldActivity, setfieldActivity] = useState(false);
    const [fieldTitle, setfieldTitle] = useState(false);
    const [fieldNotes, setfieldNotes] = useState(false);
    const [fieldCreation, setfieldCreation] = useState(false);
    const [fieldOwner, setfieldOwner] = useState(false);
    const [fieldStage, setfieldStage] = useState(false);
    const [fieldFunnel, setfieldFunnel] = useState(false);
    const [fieldStatus, setfieldStatus] = useState(false);
    const [fieldIdContact, setfieldIdContact] = useState(false);
    const [fieldName, setfieldName] = useState(false);
    const [fieldNumber, setfieldNumber] = useState(false);
    const [fieldCompany, setfieldCompany] = useState(false);
    const [fieldTalk, setfieldTalk] = useState(false);
    const [companyId, setcompanyId] = useState('default');
    const [pluginId, setpluginId] = useState('default')

    const [companies, setcompanies] = useState([]);
    const [plugins, setplugins] = useState([]);

    const [id, setid] = useState(null);
    const [isEdit, setisEdit] = useState(false);

    async function getCompanies() {

        const response = await instancePolics.get('companies');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setcompanies(data);
        }

    }

    async function getPlugins() {

        const response = await instancePolics.get('plugins');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setplugins(data);
        }

    }

    async function getConfigPlugins() {
        const response = await instancePolics.get('configPlugins');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setconfigPlugins(data);
        }
    }

    async function createOrUpdateAConfigPlugin() {

        if (title === null || title === '') return alert('Você deve preencher o campo título');
        if (token === null || token === '') return alert('Você deve preencher o campo token');
        if (companyId === null || companyId === '' || companyId === 'default') return alert('Você deve preencher o campo empresa');
        if (pluginId === null || pluginId === '' || pluginId === 'default') return alert('Você deve preencher o campo plugin');


        const configPluginInput = {
            token: token,
            visible: visible,
            title: title,
            use_accordion: useAccordion,
            field_id: fieldId,
            field_activity: fieldActivity,
            field_title: fieldTitle,
            field_notes: fieldNotes,
            field_creation: fieldCreation,
            field_owner: fieldOwner,
            field_stage: fieldStage,
            field_funnel: fieldFunnel,
            field_status: fieldStatus,
            field_id_contact: fieldIdContact,
            field_name: fieldName,
            field_number: fieldNumber,
            field_company: fieldCompany,
            field_talk: fieldTalk,
            company_id: companyId,
            plugin_id: pluginId
        }

        try {

            const response = isEdit ? await instancePolics.put(`configPlugins/${id}`, configPluginInput) : await instancePolics.post('configPlugins', configPluginInput);
            if (!response) return alert('Falha na requisição');
            if (response.status === 500) return alert('Erro no servidor');
            if (response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if (response.status === 200 || response.status === 201) {
                modal.hide();
                getConfigPlugins();
                return isEdit ? alert('A configuração de plugin foi modificada com sucesso!') : alert('Configuração de plugin criada com sucesso!');
            }
        } catch (err) {
            return alert('Erro no servidor');
        }

    }

    async function removeAConfigPlugin(id) {

        if (id === 1) return alert(`Você não pode excluir a configuração de plugin de id 1`)

        const confirmDelete = window.confirm(`Você realmente deseja excluir a configuração de plugin ${id}?`);
        if (!confirmDelete) return;

        try {
            const response = await instancePolics.delete(`configPlugins/${id}`);
            if (!response) return alert('Falha na requisição');
            if (response.status === 500) return alert('Erro no servidor');
            if (response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if (response.status === 404) return alert('A configuração de plugin não foi encontrada');
            if (response.status === 200 || response.status === 201) {
                setconfigPlugins(configPlugins.filter(item => item.id !== id));
                return alert('Configuração de plugin excluida com sucesso!');
            }

        } catch (err) {
            return alert('Erro no servidor');
        }
    }

    function clearSets() {
        settitle('');
        settoken('');
        setvisible(false);
        setuseAccordion(false);
        setfieldId(false);
        setfieldActivity(false);
        setfieldTitle(false);
        setfieldNotes(false);
        setfieldCreation(false);
        setfieldOwner(false);
        setfieldStage(false);
        setfieldFunnel(false);
        setfieldStatus(false);
        setfieldIdContact(false);
        setfieldName(false);
        setfieldNumber(false);
        setfieldCompany(false);
        setfieldTalk(false);
        setcompanyId('default');
        setpluginId('default')
    }

    function editSets(item) {
        setisEdit(true);
        setid(item.id);
        settitle(item.title);
        settoken(item.token);
        setvisible(item.visible);
        setuseAccordion(item.use_accordion);
        setfieldId(item.field_id);
        setfieldActivity(item.field_activity);
        setfieldTitle(item.field_title);
        setfieldNotes(item.field_notes);
        setfieldCreation(item.field_creation);
        setfieldOwner(item.field_owner);
        setfieldStage(item.field_stage);
        setfieldFunnel(item.field_funnel);
        setfieldStatus(item.field_status);
        setfieldIdContact(item.field_id_contact);
        setfieldName(item.field_name);
        setfieldNumber(item.field_number);
        setfieldCompany(item.field_company);
        setfieldTalk(item.field_talk);
        setcompanyId(item.config_plugins_company.id);
        setpluginId(item.config_plugins_plugin.id);
    }

    function openModal(item) {
        if(item){
            editSets(item);
        } else{
            clearSets();
            setisEdit(false);
        } 
        getCompanies();
        getPlugins();
        modal.show();
    }

    function closeModal() {
        modal.hide();
    }

    return (
        <div className="row">

            <div className="d-flex flex-row justify-content-between">
                <h5>Configuração de plugin</h5>
                <button className="btn btn-outline-success btn-sm ms-3" type="button" onClick={()=>{openModal()}}>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {configPlugins.map((item) => {
                            return <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.token}</td>
                                <td>{item.config_plugins_company.name}</td>
                                <td>{item.config_plugins_plugin.name}</td>
                                <td>
                                    <div className="d-flex flex-row justify-content-end">
                                        <button onClick={() => { removeAConfigPlugin(item.id) }} className="btn btn-outline-danger btn-sm me-1">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button onClick={()=>{openModal(item)}} className="btn btn-outline-warning btn-sm me-1">
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>



            <div className="modal fade" id="configPluginModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="companieModalLabel">Configuração de plugin</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Plugin</span>
                                <select className="form-select" value={pluginId} onChange={(event) => { setpluginId(event.target.value) }}>
                                    <option value='default'>Escolha uma Opção</option>
                                    {plugins.map((item) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })}
                                </select>
                            </div>
                            <br/>
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Título</span>
                                <input type="text" aria-label="Titulo" className="form-control" value={title} onChange={(event) => { settitle(event.target.value) }} />
                            </div>
                            <br />
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Token</span>
                                <input type="text" aria-label="Token" className="form-control" value={token} onChange={(event) => { settoken(event.target.value) }} />
                            </div>
                            <br />
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={visible} onChange={(event) => { setvisible(event.target.checked) }} />
                                <label className="form-check-label">Visível</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={useAccordion} onChange={(event) => { setuseAccordion(event.target.checked) }} />
                                <label className="form-check-label">Usar Sanfona</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldId} onChange={(event) => { setfieldId(event.target.checked) }} />
                                <label className="form-check-label">Campo Id</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldActivity} onChange={(event) => { setfieldActivity(event.target.checked) }} />
                                <label className="form-check-label">Campo Atividade</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldTitle} onChange={(event) => { setfieldTitle(event.target.checked) }} />
                                <label className="form-check-label">Campo Titulo</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldNotes} onChange={(event) => { setfieldNotes(event.target.checked) }} />
                                <label className="form-check-label">Campo Notas</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldCreation} onChange={(event) => { setfieldCreation(event.target.checked) }} />
                                <label className="form-check-label">Campo Criação</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldOwner} onChange={(event) => { setfieldOwner(event.target.checked) }} />
                                <label className="form-check-label">Campo Dono</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldStage} onChange={(event) => { setfieldStage(event.target.checked) }} />
                                <label className="form-check-label">Campo Etapa</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldFunnel} onChange={(event) => { setfieldFunnel(event.target.checked) }} />
                                <label className="form-check-label">Campo Funil</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldStatus} onChange={(event) => { setfieldStatus(event.target.checked) }} />
                                <label className="form-check-label">Campo Status</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldIdContact} onChange={(event) => { setfieldIdContact(event.target.checked) }} />
                                <label className="form-check-label">Campo Id do contato</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldName} onChange={(event) => { setfieldName(event.target.checked) }} />
                                <label className="form-check-label">Campo Nome</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldNumber} onChange={(event) => { setfieldNumber(event.target.checked) }} />
                                <label className="form-check-label">Campo Número</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldCompany} onChange={(event) => { setfieldCompany(event.target.checked) }} />
                                <label className="form-check-label">Campo Empresa</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" checked={fieldTalk} onChange={(event) => { setfieldTalk(event.target.checked) }} />
                                <label className="form-check-label">Campo Conversa</label>
                            </div>
                            <br />
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Empresa</span>
                                <select className="form-select" value={companyId} onChange={(event) => { setcompanyId(event.target.value) }}>
                                    <option value='default'>Escolha uma Opção</option>
                                    {companies.map((item) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })}
                                </select>
                            </div>                 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-success btn-sm" onClick={createOrUpdateAConfigPlugin}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicsConfigPlugins;