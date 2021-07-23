import '../../css/DashBoard.css'
import { useState, useEffect } from 'react'
import TableCompany from '../TableCompany';
import { getConfigPiperun, getInstancePiperunApi, getInstancePolichatApi, getConfigPolichat } from '../../utils/policsApiRequestHelper';
import TableActivityCompany from '../TableActivityCompany';
import TableContacts from '../TableContacts';
import BlockPluginPiperun from '../BlockPluginPiperun';
import BlockPluginPolichat from '../BlockPluginPolichat';

function DashBoard() {

    const [inputSearch, setinputSearch] = useState('');

    const [companies, setcompanies] = useState([]);
    const [activities, setactivities] = useState([]);
    const [contacts, setcontacts] = useState([]);
    const [configPiperun, setconfigPiperun] = useState(null);
    const [configPolichat, setconfigPolichat] = useState(null);

    useEffect(async () => {
        mount();
        return () => {

        }
    }, []);

    async function mount() {
        try {
            const newConfigPiperun = await getConfigPiperun();
            if (newConfigPiperun) setconfigPiperun(newConfigPiperun);

            const newConfigPolichat = await getConfigPolichat();
            if (newConfigPolichat) setconfigPolichat(newConfigPolichat)
        } catch (error) {
            console.log('Erro ao encontrar configuração do piperun')
        }

    }

    function unmount() {
        setconfigPiperun(null);
        setconfigPolichat(null);
    }

    async function searchCompany() {
        try {
            const response = await getInstancePiperunApi(configPiperun.token).get(`companies?name=${inputSearch}`);
            if (!response) return;
            if (response.data.data instanceof Array) setcompanies(response.data.data);
        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro ao listar empresas'
            console.log(message, err);
        }
    }

    async function searchDataOfSpecificCompany(item) {
        await searchActivities(item);
        await searchContacts(item);
    }

    async function searchActivities(item) {
        try {
            const companyId = item.id;
            const url = `deals?company_id=${companyId}&with=owner,stage,pipeline,notes`
            const response = await getInstancePiperunApi(configPiperun.token).get(url);
            if (!response) return;
            if (response.data.data instanceof Array) setactivities(response.data.data);
        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro ao listar chamados'
            console.log(message, err);
        }
    }

    async function searchContacts(item) {

        try {

            const companiesToSearchInPolichat = [
                { companyIdPolichat: 1, companyNamePolichat: 'Polichat corporativo' },
                { companyIdPolichat: 476, companyNamePolichat: 'Polichat soluções adminsitrativas e web ltda' },
                { companyIdPolichat: 4240, companyNamePolichat: 'Polichat Financeiro' }
            ];

            const arrayObjContactPhone = item.contact_phones;
            //Obtem uma lista com número dos contatos, removendo os elementos repetidos
            const contactPhones = Array.from(new Set(arrayObjContactPhone.map(item => item.phone.slice(-8))).values());

            /**
             * Efetua requisição na api do polichat buscando números de telefone especificos e
             * remove números repetidos, essa comparação é feita pelo (id do chat)
             */
            async function handleDoubleContacts() {

                let arrayContacts = []

                for (let i = 0; i < companiesToSearchInPolichat.length; i++) {
                    for (let j = 0; j < contactPhones.length; j++) {
                        const response = await getInstancePolichatApi(configPolichat.token).get(`${companiesToSearchInPolichat[i].companyIdPolichat}/contacts?phone=${contactPhones[j]}`);
                        console.log(response);
                        if (response) {
                            const contactsJson = response.data.data;

                            for (let k = 0; k < contactsJson.length; k++) {
                                const contactJsonModified = { ...contactsJson[k], ...companiesToSearchInPolichat[i] };
                                if (arrayContacts.find(item => item.id == contactsJson[k].id) == undefined) {
                                    arrayContacts.push(contactJsonModified);
                                }
                            }
                        }
                    }
                }

                return arrayContacts;
            }

            let handledContact = await handleDoubleContacts();
            setcontacts(handledContact);

        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro ao listar contatos'
            console.log(message);
        }
    }

    return (
        <div className="polics-dashboard">
            <div className="container-fluid">
                <div className="row" id="linha1">
                    <div className="col-lg-3" id="coluna1">

                        <div className="container d-flex justify-content-center border border-dark">
                            <div className="row d-flex flex-column">
                                <input type="text" value={inputSearch} onChange={(event) => { setinputSearch(event.target.value) }} onKeyPress={(event) => { if (event.key === 'Enter') searchCompany() }} placeholder="Pesquisar empresa" id="inputPesquisa" />
                                <br />
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-9" id="coluna2">

                        <div className="container border border-dark">

                            <div className="row d-flex justify-content-between">
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Usuários</span>
                                    </div>
                                    <div className="row">
                                        <span>4</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Canais</span>
                                    </div>
                                    <div className="row">
                                        <span>3</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Ativos</span>
                                    </div>
                                    <div className="row">
                                        <span>172</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Receptivos</span>
                                    </div>
                                    <div className="row">
                                        <span>19</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Mensagens</span>
                                    </div>
                                    <div className="row">
                                        <span>500</span>
                                    </div>
                                </div>
                            </div>

                            <BlockPluginPiperun config={configPiperun} companies={companies} activities={activities} callbackSearchDataOfSpecificCompany={searchDataOfSpecificCompany} />

                            <BlockPluginPolichat config={configPolichat} contacts={contacts} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;