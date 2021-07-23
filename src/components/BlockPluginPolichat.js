import TableContacts from "./TableContacts";

function BlockPluginPolichat(props) {
    return (
        <div hidden={!(props.config?.visible)}>
            <div className="row mt-3">
                <h5 className="text-primary">Contatos</h5>
                <TableContacts config={props.config} contacts={props.contacts} />
            </div>
        </div>
    );
}

export default BlockPluginPolichat;