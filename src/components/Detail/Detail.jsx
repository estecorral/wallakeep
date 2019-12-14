import React from "react";
import { withRouter } from "react-router-dom";
import { Figure, Badge, Button } from "react-bootstrap";
import { deleteStorage } from "../../storage/storage";
import NavBar from "../NavBar";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};


        this.deleteProfile = this.deleteProfile.bind(this);
    }

    componentDidMount() {
        const adID = this.props.match.params.id;
        this.getAdd(adID);
    }

    getAdd(adID) {
        this.props.loadAdd(adID).then(() => {
            this.setState({
                add: this.props.add,
            })
        });
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
        if (Object.keys(this.state).length !== 0) {
            const add = this.state.add;
            return(
                <div>
                    <NavBar/>
                    {
                        <Figure className="figure">
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="500x400"
                                src={add.photo.slice(1,7) === 'images' ? `http://localhost:3001${add.photo}` : `${add.photo}`}
                            />
                            <Figure.Caption>
                                <h4>{add.name} <Badge variant="info">{add.price}€</Badge> <Badge variant={add.type === 'sell' ? "danger" : "success"}> {add.type}</Badge></h4>
                                {add.description}
                            </Figure.Caption>
                            <br/>
                            {
                                add.tags.map((tag, i) => {
                                    return(
                                        <Badge pill key={i} variant="secondary">
                                            {tag}
                                        </Badge>
                                    );
                                })
                            }
                            <br/>
                            <Button variant="primary" id={add._id} onClick={this.gotoEdit}>Editar</Button>
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