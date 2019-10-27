import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Form, Button } from "react-bootstrap";
import { newAd, updateAd } from "../../API/api";
import { getOneAd } from "../../API/api";
import { restoreUser, deleteStorage } from "../../storage/storage";
import './Create.css';

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
        this.deleteProfile = this.deleteProfile.bind(this);
    }
    goTolist = () => {
        this.props.history.push('/list');
    };

    deleteProfile(event) {
        event.preventDefault();
        deleteStorage();
        this.props.history.push('/register');
    }

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
        if(this.state.ad.name.trim().length <= 3) {
            alert("El nombre ha de tener + de 3 letras");
            return;
        } if (!Number.isInteger(parseInt(this.state.ad.price))){
            alert("El precio ha de ser un número");
            return;
        } if (this.state.ad.description.trim().length <= 3) {
            alert("Descripción demasiado corta");
            return;
        } if (!this.state.ad.type || this.state.ad.type === '--') {
            alert("Debe de seleccionar un tipo de anuncio");
            return;
        } if (this.state.ad.photo.trim().length <= 3) {
            alert("URL foto de masiado corta");
            return;
        } if (this.state.ad.tags.length === 0) {
            alert("Debe de seleccionar al menos un tag");
            return;
        }
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
        const user = restoreUser();
        return(
            <div className="createDiv">
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
                    ad &&
                <React.Fragment>
                <h3>{ad.name ? "Editar anuncio" : "Crear nuevo anuncio"}</h3>
                <h6>{this.state.adID ? "id: " + this.state.adID : ""}</h6>
                <div className="formDiv">
                    <Form onSubmit={this.handleSubmit} className="form">
                            <Form.Label>Nombre anuncio</Form.Label>
                            <Form.Control type="name" placeholder="Nombre Anuncio"
                                          name="name"
                                          value={ad.name}
                                          onChange={this.handleChange}/>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="precio" placeholder="Precio"
                                          name="price"
                                          value={ad.price}
                                          onChange={this.handleChange}/>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows="3"
                                              name="description"
                                              value={ad.description}
                                              onChange={this.handleChange}/>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select"
                                          name="type"
                                          value={ad.type}
                                          onChange={this.handleChange}>
                                <option>--</option>
                                <option>buy</option>
                                <option>sell</option>
                            </Form.Control>
                                <Form.Label>Imagen anuncio</Form.Label>
                                <Form.Control type="photo" placeholder="Foto del anuncio"
                                              name="photo"
                                              value={ad.photo}
                                              onChange={this.handleChange}/>
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
                            <div className="divButtons">
                                <Button variant="primary" type="submit">Guardar</Button>
                                <Button variant="danger" onClick={this.goTolist}>Cancelar</Button>
                            </div>
                    </Form>
                </div>
                </React.Fragment>
                    }
                {
                    !ad &&
                        <h1>Loading...</h1>
                }
            </div>
        );
    }
}

export default withRouter(Create);