import {useState, useEffect} from 'react'
import getInstancePolicsApi from '../utils/policsApiRequestHelper';
import { Modal } from 'bootstrap';

const instancePolics = getInstancePolicsApi();
let modal;

function PolicsCompanies() {

    useEffect(() => {
        modal = new Modal(document.querySelector('#companieModal'));
        getCompanies();
        return () => {
            modal.hide();
            setcompanies([]);
        }
    }, []);
    
    const [companies, setcompanies] = useState([]);
    const [companyName, setcompanyName] = useState('');
    const [cnpj, setcnpj] = useState('');

    function handleCompanyName(event) {
        const text = event.target.value;
        setcompanyName(text);    
    }

    function handleCnpj(event) {
        const text = event.target.value;
        setcnpj(text);
    }

    async function getCompanies() {

        const response = await instancePolics.get('companies');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setcompanies(data);
        }

    }

    async function createANewCompany() {

        if(companyName === null || companyName === '') return alert('Você deve preencher o nome da empresa');
        if(cnpj === null || cnpj === '') return alert('Você deve preencher o campo CNPJ da empresa');
        if(isNaN(cnpj)) return alert('O campo CNPJ deve conter apenas números');
        if(cnpj.length !== 14) return alert('O campo CNJP deve conter 14 caracteres númericos')

        try{
            const response = await instancePolics.post('companies', {"name": companyName,"cnpj": cnpj});
            if (!response) return alert('Falha na requisição');
            if(response.status === 500) return alert('Erro no servidor');
            if(response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if(response.status === 200 || response.status === 201){
                modal.hide();
                getCompanies();
                return alert('Empresa criada com sucesso!');
            }
        }catch(err){
            return alert('Erro no servidor');
        }

    }

    async function removeACompany(id, name) {

        if(id === 1)return alert(`Você não pode excluir a empresa de id 1`)

        const confirmDelete = window.confirm(`Você realmente deseja excluir a empresa ${name}?`);
        if(!confirmDelete) return;
        
        try{
            const response = await instancePolics.delete(`companies/${id}`);
            if (!response) return alert('Falha na requisição');
            if(response.status === 500) return alert('Erro no servidor');
            if(response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if(response.status === 404) return alert('Empresa não encontrada');
            if(response.status === 200 || response.status === 201){
                setcompanies(companies.filter(item => item.id !== id));
                return alert('Empresa excluida com sucesso!');
            }
            
        }catch(err){
            return alert('Erro no servidor');
        }
        
    }

    async function editACompany(id) {
        console.log(id);
    }

    function clearSets() {
        setcompanyName('');
        setcnpj('');
    }

    function openModal() {
        clearSets()
        modal.show();
    }

    function closeModal() {
        modal.hide();
    }

    return (
        <div className="row">
            <div className="d-flex flex-row justify-content-between">
                <h5>Empresas</h5>
                <button className="btn btn-outline-success btn-sm ms-3" type="button" onClick={openModal}>
                    Nova empresa
                </button>
            </div>
            
            <div className="table-responsive mt-3">
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
                                <td>
                                    <div className="d-flex flex-row justify-content-end">
                                        <button onClick={()=>{removeACompany(item.id, item.name)}} className="btn btn-outline-danger btn-sm me-1">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button onClick={()=>{editACompany(item.id)}} className="btn btn-outline-warning btn-sm me-1">
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="companieModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="companieModalLabel">Empresa</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">Nome</span>
                                <input onChange={handleCompanyName} value={companyName} type="text" aria-label="Nome da empresa" className="form-control" />
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">CNPJ</span>
                                <input onChange={handleCnpj} value={cnpj} type="text" aria-label="Cnpj da empresa" className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={createANewCompany} type="button" className="btn btn-primary">Criar nova Empresa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicsCompanies;