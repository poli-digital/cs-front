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
                    <th className="text-center" hidden={!(props.config?.field_id_contact)}>Id</th>
                    <th className="text-center" hidden={!(props.config?.field_name)}>Nome</th>
                    <th className="text-center" hidden={!(props.config?.field_number)}>Número</th>
                    <th className="text-center" hidden={!(props.config?.field_company)}>Empresa</th>
                    <th className="text-center" hidden={!(props.config?.field_talk)}>Conversa</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.contacts.map((item) => {
                    return <tr key={item.id}>
                        <td className="text-center">#</td>
                        <td className="text-center" hidden={!(props.config?.field_id_contact)}>{item.id}</td>
                        <td className="text-center" hidden={!(props.config?.field_name)}>{item.name}</td>
                        <td className="text-center" hidden={!(props.config?.field_number)}>{item.phone}</td>
                        <td className="text-center" hidden={!(props.config?.field_company)}>{item.companyNamePolichat}</td>
                        <td className="text-center" hidden={!(props.config?.field_talk)}>Conversa</td>
                        <td className="text-center">Chat</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default TableContacts;