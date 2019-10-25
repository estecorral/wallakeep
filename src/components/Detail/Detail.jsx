import React from "react";
import { withRouter } from "react-router-dom";
import { getOneAd} from "../../API/api";
import {Navbar, Figure, Badge, Card, Button} from "react-bootstrap";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const adID = this.props.match.params.id;

        getOneAd(adID).then(ad => {
            this.setState({ ad });
            console.log(this.state);
        })
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
            {
                ad
                &&
                <Figure>
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="400x300"
                        src={`http://localhost:3001${ad.photo}`}
                    />
                    <Figure.Caption>
                        <h4>{ad.name} <Badge variant="info">{ad.price}€</Badge> <Badge variant="success"> {ad.type}</Badge></h4>
                        {ad.description}
                    </Figure.Caption>
                    <br/>
                    <Button variant="primary">Editar</Button>
                </Figure>
            }
            </div>
        );
    }
}

export default withRouter(Detail);