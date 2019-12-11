import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/user";
import { getTags, getAds} from "../../API/api";
import {Navbar, FormControl, Button, Form, Card, Jumbotron, Badge, Alert} from "react-bootstrap";
import { restoreUser, deleteStorage } from "../../storage/storage";
import './List.css';
import {Spinner} from "react-bootstrap";


class List extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                ads: [],
                myTag: restoreUser().tag,
                price: '',
                name: '',
                type: '',
                tags: []
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.actualizaAds();
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    componentDidMount() {
        this.updateUserFromStorage();
        getTags().then(tags => {
            this.setState({
                tags,
            });
        });
    }

    deleteProfile(event) {
        event.preventDefault();
        deleteStorage();
        this.props.history.push('/register');
    }

    updateUserFromStorage() {
        if (restoreUser() !== null) {
            return this.context.updateUser(restoreUser());
        }
        this.props.history.push('/register');
    }

    actualizaAds() {
        this.props.loadAdds(this.state.myTag, this.state.price, this.state.name, this.state.type);
    }

    goDetail = (event) => {
        event.preventDefault();
        this.props.history.push(`/detail/${event.target.id}`);
    };

    newAdd = () => {
        this.props.clearAdd();
        this.props.history.push('/create');
    };

    buildAds = () => {
        if(this.props.adds.length !== 0) {
            return this.props.adds.map((ad) => {
                return(
                    <Card key={ad._id} className="cards">
                        <Card.Img variant="top" src={ad.photo.slice(1,7) === 'images' ? `http://localhost:3001${ad.photo}` :
                            `${ad.photo}`}/>
                        <Card.Body>
                            <Card.Title>{ad.name} <Badge variant="info">{ad.price}€</Badge> <Badge variant={ad.type === 'sell' ? "danger" : "success"}> {ad.type}</Badge></Card.Title>
                            <Card.Text>
                                {ad.description}
                            </Card.Text>
                            <Button variant="primary" id={ad._id} onClick={this.goDetail}>Detalle</Button>
                        </Card.Body>
                    </Card>
                )
            });
        }else {
            return (
                <div>
                    {this.props.ui.isFetching && <Spinner animation="border" variant="primary" />}
                    {this.props.ui.error && <Alert variant={'danger'}>{this.props.error}</Alert>}
                </div>
            );
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        this.actualizaAds();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
                [name]: value,
        });
    }
    render()
    {
        // antigua versión con context
        const user = this.context.user;
        if (Object.entries(user).length === 0) {
            return null;
        }
        return (
            <div>
                <Navbar bg="primary" variant="dark" className="navStyle">
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
                            Bienvenido: <b>{this.props.session.user.name}</b>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Jumbotron className="jumbo">
                    <h2>Filtrar anuncios</h2>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl as="select" name="price" placeholder="Precio" className="mr-sm-2" onChange={this.handleChange}>
                            <option>Rango de precios</option>
                            <option>all</option>
                            <option>1-100</option>
                            <option>101-500</option>
                            <option>501-2000</option>
                            <option>2001-10000000</option>
                        </FormControl>
                        <FormControl type="text" name="name" placeholder="Nombre" className="mr-sm-2" onChange={this.handleChange}/>
                        <FormControl as="select" name="myTag" placeholder="Tag" className={"mr-sm-2"}
                                     onChange={this.handleChange}>
                            <option>Tag</option>
                            <option>all</option>
                            {
                                this.state.tags.map((tag, i) => {
                                    return <option key={i}>{ tag }</option>;
                                })
                            }
                        </FormControl>
                            <FormControl as="select" name="type" placeholder="tipo" className="mr-sm-2" onChange={this.handleChange}>
                                <option>Tipo</option>
                                <option>sell</option>
                                <option>buy</option>
                            </FormControl>
                        <Button variant="outline-info" type="submit">Search</Button>
                    </Form>
                    <br/>
                    <h5>Busqueda por Precio: {this.state.price}, Nombre: {this.state.name}, Tag: {this.state.myTag}, Venta: {this.state.type}</h5>
                    <Button variant="danger" onClick={this.newAdd}>Crear nuevo Anuncio</Button>
                </Jumbotron>
                <div className="divCars">
                {
                    this.buildAds()
                }
                </div>
            </div>
        );
    }
}

List.contextType = UserContext;

export default withRouter(List);