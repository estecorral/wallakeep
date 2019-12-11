import React from "react";
import { withRouter } from "react-router-dom";
import { getOneAd } from "../../API/api";
import { Navbar, Figure, Badge, Button } from "react-bootstrap";
import { restoreUser, deleteStorage } from "../../storage/storage";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const adID = this.props.match.params.id;
        this.getAdd(adID);
        getOneAd(adID).then(ad => {
            this.setState({ ad });
        });
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    getAdd(adID) {
        this.props.loadAdd(adID);
    }

    goTolist = () => {
        this.props.history.push('/list');
    };

    gotoEdit = (event) => {
        event.preventDefault();
        this.props.history.push(`/create/${event.target.id}`);
    };

    deleteProfile(event) {
        event.preventDefault();
        deleteStorage();
        this.props.history.push('/register');
    }

    render() {
        const user = restoreUser();
        if (Object.keys(this.props.add).length !== 0) {
            return(
                <div>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand>
                            <img
                                alt=""
                                src="../../../img/shopping-outline.svg"
                                className="d-inline-block align-top"
                            />
                            {' Wallakeep '}
                        </Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text onClick={this.deleteProfile}>
                                Bienvenido: <b>{ user.name }</b>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    {
                        <Figure className="figure">
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="500x400"
                                src={this.props.add.photo.slice(1,7) === 'images' ? `http://localhost:3001${this.props.add.photo}` : `${this.props.add.photo}`}
                            />
                            <Figure.Caption>
                                <h4>{this.props.add.name} <Badge variant="info">{this.props.add.price}€</Badge> <Badge variant={this.props.add.type === 'sell' ? "danger" : "success"}> {this.props.add.type}</Badge></h4>
                                {this.props.add.description}
                            </Figure.Caption>
                            <br/>
                            {
                                this.props.add.tags.map((tag, i) => {
                                    return(
                                        <Badge pill key={i} variant="secondary">
                                            {tag}
                                        </Badge>
                                    );
                                })
                            }
                            <br/>
                            <Button variant="primary" id={this.props.add._id} onClick={this.gotoEdit}>Editar</Button>
                            <Button variant="danger" onClick={this.goTolist}>Volver</Button>
                        </Figure>
                    }
                </div>
            );
        } else {
            return (
                <div>
                    Cargando datos anuncio....
                </div>
            )
        }

    }
}

export default withRouter(Detail);