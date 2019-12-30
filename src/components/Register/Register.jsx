import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/user";
import './Register.css';
import {Button, Navbar} from "react-bootstrap";
import Form from "../form/Form";
import Input from "../Input/Input";

import { saveUser, deleteStorage } from '../../storage/storage';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        deleteStorage();
    }

    handleSubmit(event) {
        this.props.loadSession(event);
        saveUser(event);
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
                            <Form onSubmit={this.handleSubmit} initialValue={{name:'', surname:''}} >
                                <Input type="text" name="name"/>
                                <Input type="text" name="surname"/>
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