import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/user";
import './Register.css';
import {Navbar} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                surname: '',
                tag: null,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(({ user }) => ({
            user: {
                ...user,
                [name]: value
            }
        }));
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.user.name.trim().length === 0 || this.state.user.surname.trim().length === 0) {
            alert('Alguno de los campos esta vacio');
        }
        this.user = this.state.user;
        this.props.history.push("/list");
    }

        render()
        {
            return (
                <div className="all">
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>
                            <img
                                alt=""
                                src="../../../img/shopping-outline.svg"
                                className="d-inline-block align-top"
                            />
                            {' Wallakeep '}
                        </Navbar.Brand>
                    </Navbar>
                    <div className="general">
                        <div className="formReg">
                            <h1>Inicio de sesión:</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Name"
                                                  name="name"
                                                  onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group controlId="surname">
                                    <Form.Label>Surname:</Form.Label>
                                    <Form.Control type="text" placeholder="Surname"
                                                  name="surname"
                                                  onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="tag">
                                    <Form.Label>Tag:</Form.Label>
                                    <Form.Control as="select"
                                                  name="tag"
                                                  onChange={this.handleChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }
}
Register.contextType = UserContext;

export default withRouter(Register);