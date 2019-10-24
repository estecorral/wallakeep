import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/user";
import { getAds } from "../../API/api";
import {Navbar, FormControl, Button, Form, Card} from "react-bootstrap";

class List extends React.Component {
    constructor(props) {
        super(props);
            this.state= {
                ads: [],
                adsByMyTag: [],
                myTag: ''
            };
    }
    componentDidMount() {
        console.log(this.context);
        let adFind = [];
        getAds().then(ads => {
            ads.map(ad => {
                const tagsMap = ad.tags;
                 tagsMap.find(tag => {
                    if (tag === this.context.user.tag) {
                        adFind.push(ad);
                    }
                });
            });
            this.setState({
                ads: ads,
                adsByMyTag: adFind,
                myTag: this.context.user.tag,
            });
        });
    }
    buildAds = () => {
       return this.state.adsByMyTag.map((ad, i) => {
            return(
            <Card key={i} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`http://localhost:3001${ad.photo}`}/>
                <Card.Body>
                    <Card.Title>{ad.name}</Card.Title>
                    <Card.Text>
                       {ad.description}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            )
        });
    };

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
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Bienvenido: <b>{this.context.user.name}</b>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <h1>Resultados de su busqueda por {this.context.user.tag}:</h1>
                <div className="cards">
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