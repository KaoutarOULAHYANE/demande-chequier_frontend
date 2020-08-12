import React, { useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getComptes } from '../actions';
import history from '../history';
import axios from 'axios';

function UpdateDemande() {

    const demandeUpdate = useSelector(state => state.demandeUpdate);
    const comptes = useSelector(state => state.comptes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComptes(1));
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        if (demandeUpdate.compte.id != undefined)
            demandeUpdate.compte = "http://localhost:8080/comptes/" + demandeUpdate.compte.id;
        else
            demandeUpdate.compte = "http://localhost:8080/comptes/" + demandeUpdate.compte;
        console.log(demandeUpdate);
        axios.patch('http://localhost:8080/demandeChequiers/' + demandeUpdate.id, demandeUpdate)
            .then(res => {
                console.log(res.data);
                console.log("Updated succefully");
                history.goBack();
            })
            .catch(error =>
                console.log(error.message))
    }

    function handleChange(evt) {
        const value = evt.target.value;
        demandeUpdate[evt.target.name] = value;
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNumeroCompte">
                    <Form.Label>Numero compte</Form.Label>
                    <Form.Control as="select"
                        name="compte"
                        defaultValue={demandeUpdate.compte.id}
                        onChange={handleChange}
                        selected>
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
                </Form.Group>
                <Form.Group controlId="formMotif">
                    <Form.Label>Motif</Form.Label>
                    <Form.Control
                        type="text"
                        name="motif"
                        defaultValue={demandeUpdate.motif}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formDateExecution">
                    <Form.Label>Date Execution</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_execution"
                        defaultValue={demandeUpdate.date_execution}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formMontantChequier">
                    <Form.Label>Montant Chequier</Form.Label>
                    <Form.Control
                        type="number"
                        name="montant_chequier"
                        defaultValue={demandeUpdate.montant_chequier}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formStatut">
                    <Form.Label>Statut</Form.Label>
                    <Form.Control as="select"
                        defaultValue={demandeUpdate.statut}
                        onChange={handleChange}
                        name="statut">
                        <option value="Enregistré">Enregistré</option>
                        <option value="Confirmé et signé">Confirmé et signé</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container >
    );
}

export default UpdateDemande;
