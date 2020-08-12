import React, { useEffect, useState } from 'react'
import { Table, Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCreditCard, faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faDollarSign, faAdjust, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getDemandes, getDemandeUpdate, getComptes, getFiltredDemandes, clearFiltredData } from '../actions';
import history from '../history';

function ListDemandes() {

    const abonne = useSelector(state => state.abonne);
    const demandes = useSelector(state => state.data);
    const filtredData = useSelector(state => state.filtredData);
    const comptes = useSelector(state => state.comptes);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        abonne: 1,
        compte: "",
        date_debut: "",
        date_fin: "",
        statut: "",
        montant_max: "",
        montant_min: ""
    })

    const [pagination, setPagination] = useState({
        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0
    })

    useEffect(() => {
        dispatch(getDemandes(1));
        dispatch(getComptes(1));
    }, [])

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(state);
        dispatch(getFiltredDemandes(state));
    }

    function clear() {
        dispatch(clearFiltredData());
        document.getElementById("searchForm").reset();
    }
    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit} id="searchForm">
                <Form.Row>
                    <Form.Group as={Col} controlId="formCompte">
                        <Form.Label>Numero Compte</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" name="compte" defaultValue="" onChange={handleChange}>
                                <option key={0} value="" selected disabled>
                                    Selectionner compte ...
                                </option>
                                {
                                    comptes.map((compte) =>
                                        <option
                                            key={compte.id}
                                            value={compte.id}>
                                            {compte.numero_compte}
                                        </option>
                                    )
                                }
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDateDebut">
                        <Form.Label>Date début</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name="date_debut" onChange={handleChange} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDateFin">
                        <Form.Label>Date fin</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="date" name="date_fin" onChange={handleChange} />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formMontantMin">
                        <Form.Label>Montant min</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" name="montant_min" onChange={handleChange} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formMontantMax">
                        <Form.Label>Montant max</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" name="montant_max" onChange={handleChange} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formStatut">
                        <Form.Label>Statut</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faAdjust} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" name="statut" defaultValue="" onChange={handleChange}>
                                <option key={0} value="" selected disabled>
                                    Selectionner statut ...
                                </option>
                                <option value="Enregistré">Enregistré</option>
                                <option value="Confirmé et signé">Confirmé et signé</option>
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row align="right">
                    <Form.Group as={Col} controlId="formRecheche">
                        <Button variant="warning" type="submit" align="right">
                            Rechercher
                        </Button>
                    </Form.Group>
                </Form.Row>
                {
                    filtredData != null ?
                        <Form.Row align="right">
                            <Form.Group as={Col} controlId="formReset">
                                <Button variant="primary" align="right" onClick={() => clear()}>
                                    Clear
                        </Button>
                            </Form.Group>
                        </Form.Row> : ""
                }
            </Form>
            <Table bordered hover responsive>
                <thead className="thead-dark">
                    <tr>
                        <th>Numero Compte</th>
                        <th>Motif</th>
                        <th>Date Execution</th>
                        <th>Montant cheque</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (filtredData != null) ?
                            filtredData.map((demande, index) => {
                                return <tr key={demande.id}>
                                    <td>{demande.compte.numero_compte}</td>
                                    <td>{demande.motif}</td>
                                    <td>{demande.date_execution}</td>
                                    <td>{demande.montant_chequier}</td>
                                    <td>{demande.statut}</td>
                                    <td>
                                        <Container>
                                            <Row className="justify-content-md-center">
                                                <Button variant="outline-primary">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="outline-success"
                                                    onClick={() => {
                                                        dispatch(getDemandeUpdate(demande))
                                                        history.push('/updateDemande')
                                                    }
                                                    }>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </Button>
                                                <Button variant="outline-danger"
                                                    onClick={() => {
                                                        axios.delete('http://192.168.1.102:8080/demandeChequiers/' + demande.id)
                                                            .then(res => {
                                                                demandes.splice(index, 1);
                                                                console.log(res.data);
                                                                console.log("Deleted succefully");
                                                            })
                                                            .catch(error =>
                                                                console.log(error.message))
                                                    }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            })
                            : demandes.map((demande, index) => {
                                return <tr key={demande.id}>
                                    <td>{demande.compte.numero_compte}</td>
                                    <td>{demande.motif}</td>
                                    <td>{demande.date_execution}</td>
                                    <td>{demande.montant_chequier}</td>
                                    <td>{demande.statut}</td>
                                    <td>
                                        <Container>
                                            <Row className="justify-content-md-center">
                                                <Button variant="outline-primary">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Button>
                                                <Button variant="outline-success"
                                                    onClick={() => {
                                                        dispatch(getDemandeUpdate(demande))
                                                        history.push('/updateDemande')
                                                    }
                                                    }>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </Button>
                                                <Button variant="outline-danger"
                                                    onClick={() => {
                                                        axios.delete('http://192.168.1.102:8080/demandeChequiers/' + demande.id)
                                                            .then(res => {
                                                                demandes.splice(index, 1);
                                                                console.log(res.data);
                                                                console.log("Deleted succefully");
                                                            })
                                                            .catch(error =>
                                                                console.log(error.message))
                                                    }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </Row>
                                        </Container>
                                    </td>
                                </tr>
                            })
                    }
                </tbody>
            </Table>
        </Container >
    );
}


export default ListDemandes