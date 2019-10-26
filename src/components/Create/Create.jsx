import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Form, Button } from "react-bootstrap";
import { newAd, updateAd } from "../../API/api";
import { getOneAd } from "../../API/api";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ad: {
                name: '',
                price: '',
                description: '',
                type: '',
                photo: '',
                tags: [],
            },
            adID: this.props.match.params.id,
        };

        if (this.state.adID) {
            getOneAd(this.state.adID).then(ad => {
                this.setState({ ad } );
            });
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    goTolist = () => {
        this.props.history.push('/list');
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(({ ad }) => ({
            ad: {
                ...ad,
                [name]: [name] === ['tags'] ? ad.tags.push(value) : value,
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.adID) {
            newAd(this.state.ad).then(res => console.log(res));
                setTimeout(() => {
                    this.goTolist();
                }, 1000);
        } else {
            updateAd(this.state.adID, this.state.ad).then(res => {
                setTimeout(() => {
                    this.props.history.push(`/detail/${this.state.adID}`);
                }, 1000);
            });
        }
    }

    render() {
        const { ad } = this.state;

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
                        <Navbar.Text>
                            Bienvenido: <b>{}</b>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <h3>{ad.name ? "Editar anuncio" : "Crear nuevo anuncio"}</h3>
                <h6>{this.state.adID ? "id: " + this.state.adID : ""}</h6>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nombre anuncio</Form.Label>
                        <Form.Control type="name" placeholder="Nombre Anuncio"
                                      name="name"
                                      value={ad.name}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="precio" placeholder="Precio"
                                      name="price"
                                      value={ad.price}
                                      onChange={this.handleChange}/>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows="3"
                                          name="description"
                                          value={ad.description}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group controlId="type">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control as="select"
                                      name="type"
                                      value={ad.type}
                                      onChange={this.handleChange}>
                            <option>--</option>
                            <option>buy</option>
                            <option>sell</option>
                        </Form.Control>
                        <Form.Group controlId="photo">
                            <Form.Label>Imagen anuncio</Form.Label>
                            <Form.Control type="photo" placeholder="Foto del anuncio"
                                          name="photo"
                                          value={ad.photo}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control as="select" name="tags"
                                      onChange={this.handleChange}
                                      style={this.state.adID ? {display: 'none'} : {display: 'true'}} multiple>
                            <option>lifestyle</option>
                            <option>mobile</option>
                            <option>motor</option>
                            <option>work</option>
                        </Form.Control>
                        <Form.Control as="select" name="tags"
                                      value={ad.tags}
                                      onChange={this.handleChange}
                                      style={this.state.adID ? {display: 'true'} : {display: 'none'}}
                                      multiple>
                            <option>lifestyle</option>
                            <option>mobile</option>
                            <option>motor</option>
                            <option>work</option>
                        </Form.Control>
                        <br/>
                        <Button variant="primary" type="submit">Guardar</Button>
                        <Button variant="danger" onClick={this.goTolist}>Cancelar</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default withRouter(Create);