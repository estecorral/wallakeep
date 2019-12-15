import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import './Create.css';
import NavBar from "../NavBar";

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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.adID) {
            this.loadAdd(this.state.adID);
            //this.props.loadAdd(this.state.adID);
        }
    }

    loadAdd = adID => {
        this.props.loadAdd(adID).then(() => {
            this.setState({
                ad: this.props.add,
            });
        });
    };

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
            this.props.createAdd(this.state.ad)
                .then(() => this.goTolist());
        } else {
            this.props.saveAdd(this.state.adID, this.state.ad)
                .then(() => this.props.history.push(`/detail/${this.state.adID}`));
        }
    }

    render() {
        if (Object.keys(this.state.ad).length !== 0 || !this.state.adID) {
            const add = this.state.ad;
            return(
                <div className="createDiv">
                    <NavBar/>
                    {
                        add &&
                        <React.Fragment>
                            <h3>{this.state.name ? "Editar anuncio" : "Crear nuevo anuncio"}</h3>
                            <h6>{this.state.adID ? "id: " + this.state.adID : ""}</h6>
                            <div className="formDiv">
                                <Form onSubmit={this.handleSubmit} className="form">
                                    <Form.Label>Nombre anuncio</Form.Label>
                                    <Form.Control type="name" placeholder="Nombre Anuncio"
                                                  name="name"
                                                  value={add.name}
                                                  onChange={this.handleChange}/>
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="precio" placeholder="Precio"
                                                  name="price"
                                                  value={add.price}
                                                  onChange={this.handleChange}/>
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows="3"
                                                  name="description"
                                                  value={add.description}
                                                  onChange={this.handleChange}/>
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control as="select"
                                                  name="type"
                                                  value={add.type}
                                                  onChange={this.handleChange}>
                                        <option>--</option>
                                        <option>buy</option>
                                        <option>sell</option>
                                    </Form.Control>
                                    <Form.Label>Imagen anuncio</Form.Label>
                                    <Form.Control type="photo" placeholder="Foto del anuncio"
                                                  name="photo"
                                                  value={add.photo}
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
                                                  value={add.tags}
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
                </div>
            );
        } else {
            return (
                <div>Loading ...</div>
            );
        }

    }
}

export default withRouter(Create);