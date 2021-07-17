import { useState, useEffect } from 'react'
import { getCompanies } from '../utils/dataSelectUtils';
import getInstancePolicsApi from '../utils/policsApiRequestHelper';

function FormPolichaConfig(props) {

    useEffect(() => {
        mount();
        return () => {
            unmount();
        }
    }, [])

    const [id, setid] = useState(props.id);
    const [pluginId, setpluginId] = useState(props.pluginId);
    const [title, settitle] = useState(props.title ? props.title : '');
    const [token, settoken] = useState(props.token ? props.token : '');
    const [visible, setvisible] = useState(Boolean(props.visible));
    const [fieldIdContact, setfieldIdContact] = useState(Boolean(props.fieldIdContact));
    const [fieldName, setfieldName] = useState(Boolean(props.fieldName));
    const [fieldNumber, setfieldNumber] = useState(Boolean(props.fieldNumber));
    const [fieldCompany, setfieldCompany] = useState(Boolean(props.fieldCompany));
    const [fieldTalk, setfieldTalk] = useState(Boolean(props.fieldTalk));
    const [companyId, setcompanyId] = useState(props.companyId);

    const [companies, setcompanies] = useState([]);

    async function mount() {
        const companies = await getCompanies();
        setcompanies(companies);
    }

    function unmount() {
        setcompanies([]);
    }

    async function sendForm() {

        if (!title || title === '') return alert('Você deve preencher o campo título');
        if (!token || token === '') return alert('Você deve preencher o campo token');
        if (!companyId || companyId === '0') return alert('Você deve preencher o campo empresa');
        if (!pluginId || pluginId === '0') return alert('Você deve preencher o campo plugin');

        let configPluginInput = {
            plugin_id: pluginId,
            title: title,
            token: token,
            visible: visible,
            field_id_contact: fieldIdContact,
            field_name: fieldName,
            field_number: fieldNumber,
            field_company: fieldCompany,
            field_talk: fieldTalk,
            company_id: companyId,
        }

        try {
            const response = id ? await getInstancePolicsApi().put(`configPlugins/${id}`, configPluginInput) : await getInstancePolicsApi().post('configPlugins', configPluginInput);
            if (response.status === 200 || response.status === 201) {
                id ? alert('A configuração de plugin foi modificada com sucesso!') : alert('Configuração de plugin criada com sucesso!');
                const callbackSendForm = props.callbackSendForm;
                if (callbackSendForm) callbackSendForm();
            }
        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro no servidor'
            return alert(message);
        }
    }

    return (
        <div>
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
                    <option value='0'>Escolha uma Opção</option>
                    {companies.map((item) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })}
                </select>
            </div>
            <br />
            <button type="button" className="btn btn-outline-success btn-sm" onClick={sendForm}>Salvar</button>
        </div>
    );
}

export default FormPolichaConfig;