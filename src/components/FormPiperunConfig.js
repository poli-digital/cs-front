import { useState, useEffect } from 'react'
import {getCompanies} from '../utils/dataSelectUtils';
import getInstancePolicsApi from '../utils/policsApiRequestHelper';

function FormPiperunConfig(props) {

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
    const [useAccordion, setuseAccordion] = useState(Boolean(props.useAccordion));
    const [fieldActivity, setfieldActivity] = useState(Boolean(props.fieldActivity));
    const [fieldTitle, setfieldTitle] = useState(Boolean(props.fieldTitle));
    const [fieldNotes, setfieldNotes] = useState(Boolean(props.fieldNotes));
    const [fieldCreation, setfieldCreation] = useState(Boolean(props.fieldCreation));
    const [fieldOwner, setfieldOwner] = useState(Boolean(props.fieldOwner));
    const [fieldStage, setfieldStage] = useState(Boolean(props.fieldStage));
    const [fieldFunnel, setfieldFunnel] = useState(Boolean(props.fieldFunnel));
    const [fieldStatus, setfieldStatus] = useState(Boolean(props.fieldStatus));
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
            use_accordion : useAccordion,
            field_activity : fieldActivity,
            field_title : fieldTitle,
            field_notes : fieldNotes,
            field_creation : fieldCreation,
            field_owner : fieldOwner,
            field_stage : fieldStage,
            field_funnel : fieldFunnel,
            field_status : fieldStatus,
            company_id: companyId,
        }

        try {
            const response = id ? await getInstancePolicsApi().put(`configPlugins/${id}`, configPluginInput) : await getInstancePolicsApi().post('configPlugins', configPluginInput);
            if (response.status === 200 || response.status === 201) {
                id ? alert('A configuração de plugin foi modificada com sucesso!') : alert('Configuração de plugin criada com sucesso!');
                const callbackSendForm = props.callbackSendForm;
                if(callbackSendForm) callbackSendForm();
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
            <div className="form-check form-switch" >
                <input className="form-check-input" type="checkbox" checked={useAccordion} onChange={(event) => { setuseAccordion(event.target.checked) }} />
                <label className="form-check-label">Usar Sanfona</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={fieldActivity} onChange={(event) => { setfieldActivity(event.target.checked) }} />
                <label className="form-check-label">Campo Atividade</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={fieldTitle} onChange={(event) => { setfieldTitle(event.target.checked)}} />
                <label className="form-check-label">Campo Titulo</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={fieldNotes} onChange={(event) => { setfieldNotes(event.target.checked)}} />
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

export default FormPiperunConfig;