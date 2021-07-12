import '../../css/DashBoard.css'

function DashBoard() {
    return (
        <div className="polics-dashboard">
            <div className="container-fluid">
                <div className="row" id="linha1">
                    <div className="col-lg-3" id="coluna1">

                        <div className="container d-flex justify-content-center border border-dark">
                            <div className="row">
                                <input type="text" placeholder="Pesquisar empresa" />
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-9" id="coluna2">

                        <div className="container border border-dark">

                            <div className="row d-flex justify-content-between">
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Usuários</span>
                                    </div>
                                    <div className="row">
                                        <span>4</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Canais</span>
                                    </div>
                                    <div className="row">
                                        <span>3</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Ativos</span>
                                    </div>
                                    <div className="row">
                                        <span>172</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Receptivos</span>
                                    </div>
                                    <div className="row">
                                        <span>19</span>
                                    </div>
                                </div>
                                <div className="col-md-2 p-3 border border-dark rounded">
                                    <div className="row">
                                        <span>Mensagens</span>
                                    </div>
                                    <div className="row">
                                        <span>500</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <h5>Empresas</h5>
                                <table className="table table-bordered table-sm border-dark">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colSpan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row mt-3">
                                <h5>Atividades</h5>
                                <table className="table table-bordered table-sm border-dark">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colSpan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row mt-3">
                                <h5>Contatos</h5>
                                <table className="table table-bordered table-sm border-dark">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colSpan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;