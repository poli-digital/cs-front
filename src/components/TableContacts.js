import { useState, useEffect } from 'react'

function TableContacts(props) {

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

    return (
        <table className="table table-hover table-sm">
            <thead className="table-dark">
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Id</th>
                    <th className="text-center">Nome</th>
                    <th className="text-center">Número</th>
                    <th className="text-center">Empresa</th>
                    <th className="text-center">Conversa</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.contacts.map((item) => {
                    return <tr key={item.id}>
                        <td className="text-center">#</td>
                        <td className="text-center">{item.id}</td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item.phone}</td>
                        <td className="text-center">{item.companyNamePolichat}</td>
                        <td className="text-center">Conversa</td>
                        <td className="text-center">Chat</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default TableContacts;