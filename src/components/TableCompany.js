import { useState, useEffect } from 'react'

function TableCompany(props) {

    useEffect(() => {
        mount();
        return () => {
            umount();
        }
    }, [])

    function mount() {
        //TODO implementar
    }

    function umount() {
        //TODO implementar
    }

    function searchDataOfSpecificCompany(item) {
        if(props.callbackSearchDataOfSpecificCompany) props.callbackSearchDataOfSpecificCompany(item);
    }

    return (
        <table className="table table-hover table-sm">
            <thead className="table-dark">
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Empresa</th>
                    <th className="text-center">Nome</th>
                    <th className="text-center">CNPJ</th>
                    <th className="text-center">ID na Poli</th>
                    <th className="text-center">Website</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.companies.map((item) => {
                    return <tr key={item.id}>
                        <td className="text-center">#</td>
                        <td className="text-center">{item.id}</td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item.cnpj}</td>
                        <td className="text-center">Id na Poli</td>
                        <td className="text-center">{item.website}</td>
                        <td className="text-center">Pipe</td>
                        <td className="text-center">
                            <button onClick={()=>{searchDataOfSpecificCompany(item)}} type="button" className="btn btn-outline-primary btn-sm">Chamados <i className="bi bi-arrow-90deg-right"></i></button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default TableCompany;