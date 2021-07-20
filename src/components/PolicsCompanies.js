import { useState, useEffect } from 'react'
import getInstancePolicsApi from '../utils/policsApiRequestHelper';
import { Modal } from 'bootstrap';

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

    const [id, setid] = useState(null);
    const [isEdit, setisEdit] = useState(false);

    async function getCompanies() {

        const response = await getInstancePolicsApi().get('companies');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setcompanies(data);
        }

    }

    async function createOrUpdateACompany() {

        if (companyName === null || companyName === '') return alert('Você deve preencher o nome da empresa');
        if (cnpj === null || cnpj === '') return alert('Você deve preencher o campo CNPJ da empresa');
        if (isNaN(cnpj)) return alert('O campo CNPJ deve conter apenas números');
        if (cnpj.length !== 14) return alert('O campo CNJP deve conter 14 caracteres númericos');

        const company = {
            name: companyName,
            cnpj: cnpj
        }

        try {
            const response = isEdit ? await getInstancePolicsApi().put(`companies/${id}`, company) : await getInstancePolicsApi().post('companies', company);
            if (!response) return alert('Falha na requisição');
            if (response.status === 500) return alert('Erro no servidor');
            if (response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if (response.status === 200 || response.status === 201) {
                modal.hide();
                getCompanies();
                return isEdit ? alert('Empresa foi modificada com sucesso!') : alert('Empresa criada com sucesso!');
            }
        } catch (err) {
            return alert('Erro no servidor');
        }

    }

    async function removeACompany(id, name) {

        if (id === 1) return alert(`Você não pode excluir a empresa de id 1`)

        const confirmDelete = window.confirm(`Você realmente deseja excluir a empresa ${name}?`);
        if (!confirmDelete) return;

        try {
            const response = await getInstancePolicsApi().delete(`companies/${id}`);
            if (!response) return alert('Falha na requisição');
            if (response.status === 500) return alert('Erro no servidor');
            if (response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if (response.status === 404) return alert('Empresa não encontrada');
            if (response.status === 200 || response.status === 201) {
                setcompanies(companies.filter(item => item.id !== id));
                return alert('Empresa excluida com sucesso!');
            }

        } catch (err) {
            return alert('Erro no servidor');
        }

    }

    function clearSets() {
        setcompanyName('');
        setcnpj('');
    }

    function editSets(item) {
        setisEdit(true);
        setid(item.id);
        setcompanyName(item.name);
        setcnpj(item.cnpj);
    }

    function openModal(item = null) {
        if (item) {
            editSets(item);
        } else {
            clearSets();
            setisEdit(false);
        }
        modal.show();
    }

    function closeModal() {
        modal.hide();
    }

    return (
        <div className="row">
            <div className="d-flex flex-row justify-content-between">
                <h5>Empresas</h5>
                <button className="btn btn-outline-success btn-sm ms-3" type="button" onClick={() => { openModal() }}>
                    Nova empresa
                </button>
            </div>

            <div className="table-responsive  mt-3">
                <table className="table table-hover table-sm">
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
                                        <button onClick={() => { removeACompany(item.id, item.name) }} className="btn btn-outline-danger btn-sm me-1">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button onClick={() => { openModal(item) }} className="btn btn-outline-warning btn-sm me-1">
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
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">Nome</span>
                                <input onChange={(event) => { setcompanyName(event.target.value) }} value={companyName} type="text" aria-label="Nome da empresa" className="form-control" />
                            </div>
                            <br />
                            <div className="input-group input-group-sm">
                                <span className="input-group-text">CNPJ</span>
                                <input onChange={(event) => { setcnpj(event.target.value) }} value={cnpj} type="text" aria-label="Cnpj da empresa" className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={createOrUpdateACompany} type="button" className="btn btn-outline-success btn-sm">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicsCompanies;