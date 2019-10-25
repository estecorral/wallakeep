import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/user";
import { getTags, getAds} from "../../API/api";
import {Navbar, FormControl, Button, Form, Card, Jumbotron, Badge} from "react-bootstrap";

class List extends React.Component {
    constructor(props) {
        super(props);
            this.state= {
                ads: [],
                myTag: this.props.match.params.tag,
                price: '',
                name: '',
                type: '',
                tags: []
            };
        this.actualizaAds();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getTags().then(tags => {
            this.setState({
                tags,
            });
        });
    }

    actualizaAds() {
        getAds(this.state.myTag, this.state.price, this.state.name, this.state.type).then(ads => {
            this.setState({
                ads: ads,
            });
        });
    }

    goDetail = (event) => {
        console.log(event.target.id);
        event.preventDefault();
        this.props.history.push(`/detail/${event.target.id}`);
    };

    buildAds = () => {
                 return this.state.ads.map((ad) => {
                    return(
                        <Card key={ad._id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`http://localhost:3001${ad.photo}`}/>
                            <Card.Body>
                                <Card.Title>{ad.name} <Badge variant="info">{ad.price}€</Badge> <Badge variant="success"> {ad.type}</Badge></Card.Title>
                                <Card.Text>
                                    {ad.description}
                                </Card.Text>
                                <Button variant="primary" id={ad._id} onClick={this.goDetail}>Detalle</Button>
                            </Card.Body>
                        </Card>
                    )
                });
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
        return (
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
                        <Navbar.Text>
                            Bienvenido: <b>{this.context.user.name}</b>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Jumbotron>
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
                        <FormControl as="select" name="myTag" placeholder="Tag" className={"mr-sm-2"} onChange={this.handleChange}>
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
                </Jumbotron>
                <div className="row">
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