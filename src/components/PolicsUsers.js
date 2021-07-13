import { useState, useEffect } from 'react'
import getInstancePolicsApi from '../utils/policsApiRequestHelper';
import { Modal } from 'bootstrap';

const instancePolics = getInstancePolicsApi();
let modal;

function PolicsUsers() {

    useEffect(() => {
        modal = new Modal(document.querySelector('#userModal'));
        getUsers();
        return () => {
            modal.hide();
            setusers([]);
        }
    }, []);

    const [users, setusers] = useState([]);

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [statusId, setstatusId] = useState('dafault');
    const [roleId, setroleId] = useState('dafault');
    const [companyId, setcompanyId] = useState('dafault');

    const [companies, setcompanies] = useState([]);
    const [roles, setroles] = useState([]);

    async function getUsers() {
        const response = await instancePolics.get('users');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setusers(data);
        }
    }

    async function getCompanies() {

        const response = await instancePolics.get('companies');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setcompanies(data);
        }

    }

    async function getRoles() {

        const response = await instancePolics.get('roles');

        if (!response || response?.status === 401) return;

        const data = response.data;
        if (data instanceof Array) {
            setroles(data);
        }

    }

    async function createANewUser() {

        if(name === null || name === '') return alert('Você deve preencher o campo nome');
        if(email === null || email === '') return alert('Você deve preencher o campo e-mail');
        if(password === null || password === '') return alert('Você deve preencher o campo senha');
        if(statusId === null || statusId === '' || statusId === 'dafault') return alert('Você deve preencher o campo status');
        if(roleId === null || roleId === '' || roleId === 'dafault') return alert('Você deve preencher o campo papel');
        if(companyId === null || companyId === '' || companyId === 'dafault') return alert('Você deve preencher o campo empresa');

        const userInput = {
            name : name,
            email : email,
            password : password,
            blocked : statusId,
            role_id : roleId,
            company_id : companyId
          }

        try{

            const response = await instancePolics.post('users', userInput);
            if (!response) return alert('Falha na requisição');
            if(response.status === 500) return alert('Erro no servidor');
            if(response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if(response.status === 200 || response.status === 201){

                modal.hide();
                getUsers();
                return alert('Usuário criado com sucesso!');
                
            }
        }catch(err){
            return alert('Erro no servidor');
        }

    }

    async function removeAUser(id, name) {
        
        if(id === 1)return alert(`Você não pode excluir o usuário de id 1`)

        const confirmDelete = window.confirm(`Você realmente deseja excluir o usuário ${name}?`);
        if(!confirmDelete) return;
        
        try{
            const response = await instancePolics.delete(`users/${id}`);
            if (!response) return alert('Falha na requisição');
            if(response.status === 500) return alert('Erro no servidor');
            if(response.status === 401) return alert('Você precisa de permissão para continuar com esta ação');
            if(response.status === 404) return alert('Empresa não encontrada');
            if(response.status === 200 || response.status === 201){
                setusers(users.filter(item => item.id !== id));
                return alert('Usuário excluido com sucesso!');
            }
            
        }catch(err){
            return alert('Erro no servidor');
        }
    }

    async function editAUser(id) {
        console.log(id);
    }

    function clearSets() {
        setname('');
        setemail('');
        setpassword('');
        setstatusId('dafault');
        setroleId('dafault');
        setcompanyId('dafault');
    }

    function openModal() {
        clearSets();
        getRoles();
        getCompanies();
        modal.show();
    }

    function closeModal() {
        modal.hide();
    }

    return (
        <div className="row">

            <div className="d-flex flex-row justify-content-between">
                <h5>Usuários</h5>
                <button className="btn btn-outline-success btn-sm ms-3" type="button" onClick={openModal}>
                    Novo usuário
                </button>
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-bordered table-sm border-dark">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Papel</th>
                            <th scope="col">Empresa</th>
                            <th></th>
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
                                    <td>
                                        <div className="d-flex flex-row justify-content-end">
                                            <button onClick={()=>{removeAUser(item.id, item.name)}} className="btn btn-outline-danger btn-sm me-1">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                            <button onClick={()=>{editAUser(item.id)}} className="btn btn-outline-warning btn-sm me-1">
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="userModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="companieModalLabel">Usuário</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">Nome</span>
                                <input type="text" aria-label="Nome do usuário" className="form-control" autoComplete="off" onChange={(event) => {setname(event.target.value)}} value={name}/>
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">E-mail</span>
                                <input type="text" aria-label="Email" className="form-control" autoComplete="off" onChange={(event) => {setemail(event.target.value)}} value={email}/>
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">Senha</span>
                                <input type="text" aria-label="Senha" className="form-control" autoComplete="off" onChange={(event) => {setpassword(event.target.value)}} value={password}/>
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">Status</span>
                                <select className="form-select" value={statusId} onChange={(event) => {setstatusId(event.target.value)}}>
                                    <option value='dafault'>Escolha uma Opção</option>
                                    <option value="0">Ativo</option>
                                    <option value="1">Bloqueado</option>
                                </select>
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">Papel</span>
                                <select className="form-select" value={roleId} onChange={(event) => {setroleId(event.target.value)}}>
                                    <option value='dafault'>Escolha uma Opção</option>
                                    {roles.map((item) => {return (<option key={item.id} value={item.id}>{item.nickname}</option>)})}
                                </select>
                            </div>
                            <br />
                            <div className="input-group">
                                <span className="input-group-text">Empresa</span>
                                <select className="form-select" value={companyId} onChange={(event) => {setcompanyId(event.target.value)}}>
                                    <option value='dafault'>Escolha uma Opção</option>
                                    { companies.map((item) => {return (<option key={item.id} value={item.id}>{item.name}</option>)})}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={createANewUser}>Criar novo Usuário</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicsUsers;