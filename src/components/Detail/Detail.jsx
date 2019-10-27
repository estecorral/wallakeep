import React from "react";
import { withRouter } from "react-router-dom";
import { getOneAd } from "../../API/api";
import { Navbar, Figure, Badge, Button } from "react-bootstrap";
import { restoreUser, deleteStorage } from "../../storage/storage";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        const adID = this.props.match.params.id;

        getOneAd(adID).then(ad => {
            this.setState({ ad });
        });
        this.deleteProfile = this.deleteProfile.bind(this);
    }
    goTolist = () => {
        this.props.history.push('/list');
    };

    gotoEdit = (event) => {
        event.preventDefault();
        this.props.history.push(`/create/${event.target.id}`);
    };

    deleteProfile(event) {
        event.preventDefault();
        deleteStorage();
        this.props.history.push('/register');
    }

    render() {
        const { ad } = this.state;
        const user = restoreUser();
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
                        <Navbar.Text onClick={this.deleteProfile}>
                            Bienvenido: <b>{ user.name }</b>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            {
                ad
                &&
                <Figure className="figure">
                    <Figure.Image
                        width={171}
                        height={180}
                        alt="500x400"
                        src={ad.photo.slice(1,7) === 'images' ? `http://localhost:3001${ad.photo}` : `${ad.photo}`}
                    />
                    <Figure.Caption>
                        <h4>{ad.name} <Badge variant="info">{ad.price}€</Badge> <Badge variant={ad.type === 'sell' ? "danger" : "success"}> {ad.type}</Badge></h4>
                        {ad.description}
                    </Figure.Caption>
                    <br/>
                        {
                            ad.tags.map((tag, i) => {
                                return(
                                    <Badge pill key={i} variant="secondary">
                                        {tag}
                                    </Badge>
                                );
                            })
                        }
                    <br/>
                        <Button variant="primary" id={ad._id} onClick={this.gotoEdit}>Editar</Button>
                        <Button variant="danger" onClick={this.goTolist}>Volver</Button>
                </Figure>
            }
            </div>
        );
    }
}

export default withRouter(Detail);