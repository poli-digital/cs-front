import '../../css/DashBoard.css'
import { useState, useEffect } from 'react'
import TableCompany from '../TableCompany';
import { getInstancePiperunApi, getInstancePolichatApi } from '../../utils/policsApiRequestHelper';
import TableActivityCompany from '../TableActivityCompany';
import TableContacts from '../TableContacts';

function DashBoard() {

    const [inputSearch, setinputSearch] = useState('');

    const [companies, setcompanies] = useState([]);
    const [activities, setactivities] = useState([]);
    const [contacts, setcontacts] = useState([]);

    async function searchCompany() {
        try {
            const response = await getInstancePiperunApi().get(`companies?name=${inputSearch}`);
            if (!response) return;
            if (response.data.data instanceof Array) setcompanies(response.data.data);
        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro ao listar empresas'
            console.log(message);
        }
    }

    async function searchDataOfSpecificCompany(item) {
        await searchActivities(item);
        await searchContacts(item);
    }

    async function searchActivities(item) {

        const companyId = item.id;

        try {
            //const url = `deals?company_id=${companyId}&pipeline_id=${grupo.id}&with=owner,stage,pipeline,notes`
            const url = `deals?company_id=${companyId}&with=owner,stage,pipeline,notes`
            const response = await getInstancePiperunApi().get(url);
            if (!response) return;
            if (response.data.data instanceof Array) setactivities(response.data.data);
        } catch (err) {
            let message = err.response?.data?.message;
            message = message ? message : 'Erro ao listar chamados'
            console.log(message);
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


            async function handleDoubleContacts() {

                let arrayContacts = []

                for(let i = 0; i < companiesToSearchInPolichat.length; i++){
                    for(let j = 0; j < contactPhones.length; j++){
                        const response = await getInstancePolichatApi().get(`${companiesToSearchInPolichat[i].companyIdPolichat}/contacts?phone=${contactPhones[j]}`);
                        console.log(response);
                        if(response){
                            const contactsJson = response.data.data;
    
                            for(let k = 0; k < contactsJson.length; k++){
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
            console.log('handledContact', handledContact);
            
            //let handledContact = await handleDoubleContacts();
            //console.log('handledContact', handledContact);
            //setcontacts(handledContact);

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

                            <div className="row mt-3">
                                <h5>Empresas</h5>
                                <TableCompany companies={companies} callbackSearchDataOfSpecificCompany={searchDataOfSpecificCompany} />
                            </div>


                            <div className="row mt-3">
                                <h5>Atividades</h5>
                                <TableActivityCompany activities={activities} />
                            </div>

                            <div className="row mt-3">
                                <h5>Contatos</h5>

                                <TableContacts contacts={contacts} />

                                <table className="table table-bordered table-sm border-dark">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colSpan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;