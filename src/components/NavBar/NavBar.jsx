import React from "react";
import { Navbar } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {deleteStorage} from "../../storage/storage";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    componentDidMount() {

    }

    deleteProfile(event) {
        event.preventDefault();
        this.props.unloadSession();
        deleteStorage();
    }
    render() {
        return(
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
                        Bienvenido: <b>{ this.props.session.name }</b>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavBar);