import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Route, Switch, Router} from 'react-router-dom';
import ListDemandes from './listDemandes';
import UpdateDemande from './updateDemande';
import history from '../history'

function NavBar() {

    return (
        <Router history={history}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/listeDemandes">Liste des demandes</Nav.Link>
                        <Nav.Link href="/updateDemande">Modifier demande</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Switch>
                    <Route path="/listeDemandes" component={ListDemandes}></Route>
                    <Route path="/UpdateDemande" component={UpdateDemande}></Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default NavBar;
