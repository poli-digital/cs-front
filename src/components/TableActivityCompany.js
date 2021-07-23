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
                        <th className="text-center" hidden={!(props.config?.field_activity)}>Atividade</th>
                        <th className="text-center" hidden={!(props.config?.field_title)}>Titulo</th>
                        <th className="text-center" hidden={!(props.config?.field_notes)}>Notas</th>
                        <th className="text-center" hidden={!(props.config?.field_creation)}>Criação</th>
                        <th className="text-center" hidden={!(props.config?.field_owner)}>Dono</th>
                        <th className="text-center" hidden={!(props.config?.field_stage)}>Etapa</th>
                        <th className="text-center" hidden={!(props.config?.field_funnel)}>Funil</th>
                        <th className="text-center" hidden={!(props.config?.field_status)}>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.activities.map((item) => {
                        return <tr key={item.id}>
                            <td className="text-center">#</td>
                            <td className="text-center" hidden={!(props.config?.field_activity)}>{item.id}</td>
                            <td className="text-center" hidden={!(props.config?.field_title)}>{item.title}</td>
                            <td className="text-center" hidden={!(props.config?.field_notes)}>Notas</td>
                            <td className="text-center" hidden={!(props.config?.field_creation)}>{item.created_at}</td>
                            <td className="text-center" hidden={!(props.config?.field_owner)}>{item.owner.name}</td>
                            <td className="text-center" hidden={!(props.config?.field_stage)}>{item.stage.name}</td>
                            <td className="text-center" hidden={!(props.config?.field_funnel)}>{item.pipeline.name}</td>
                            <td className="text-center" hidden={!(props.config?.field_status)}>{item.status}</td>
                            <td className="text-center">Pipe</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableActivityCompany;