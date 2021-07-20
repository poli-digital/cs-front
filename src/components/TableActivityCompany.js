import { useState, useEffect } from 'react'
import '../css/TableActivityCompany.css'

function TableActivityCompany(props) {

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
        <div className="polics-tableactivitycompany polics-table-overflow-400">
            <table className="table table-hover table-sm">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Atividade</th>
                        <th className="text-center">Titulo</th>
                        <th className="text-center">Notas</th>
                        <th className="text-center">Criação</th>
                        <th className="text-center">Dono</th>
                        <th className="text-center">Etapa</th>
                        <th className="text-center">Funil</th>
                        <th className="text-center">Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.activities.map((item) => {
                        return <tr key={item.id}>
                            <td className="text-center">#</td>
                            <td className="text-center">{item.id}</td>
                            <td className="text-center">{item.title}</td>
                            <td className="text-center">Notas</td>
                            <td className="text-center">{item.created_at}</td>
                            <td className="text-center">{item.owner.name}</td>
                            <td className="text-center">{item.stage.name}</td>
                            <td className="text-center">{item.pipeline.name}</td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">Pipe</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableActivityCompany;