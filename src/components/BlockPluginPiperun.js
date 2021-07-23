import TableActivityCompany from "./TableActivityCompany";
import TableCompany from "./TableCompany";

function BlockPluginPiperun(props) {
    return (
        <div hidden={!(props.config?.visible)}>
            <div className="row mt-3">
                <h5 className="text-primary">Empresas</h5>
                <TableCompany config={props.config} companies={props.companies} callbackSearchDataOfSpecificCompany={props.callbackSearchDataOfSpecificCompany} />
            </div>
            <div className="row mt-3">
                <h5 className="text-primary">Atividades</h5>
                <TableActivityCompany config={props.config} activities={props.activities} />
            </div>
        </div>
    );
}

export default BlockPluginPiperun;