import axios from 'axios';

export const getDemandes = (id) => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/abonnes/' + id + '/demandes?projection=p1')
      .then(response => {
        const result = response.data;
        const listDemandes = result._embedded.demandeChequiers;
        console.log(listDemandes);
        dispatch(getDemandesSuccess(listDemandes))
      })
      .catch(error => {
        dispatch(getDemandesFailure(error.message))
      })
  }
}

export const getDemandesSuccess = demandes => {
  return {
    type: "GET_DEMANDES_SUCCESS",
    payload: demandes
  }
}

export const getDemandesFailure = error => {
  return {
    type: "GET_DEMANDES_FAILURE",
    payload: error
  }
}

export const getAbonne = () => {
  return {
    type: 'SIGN_IN',
  }
};

export const getDemandeUpdate = (demande) => {
  return {
    type: 'UPDATE',
    data: demande
  }
};

export const getComptes = (id) => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/abonnes/' + id + '/comptes')
      .then(response => {
        const result = response.data;
        const listComptes = result._embedded.comptes;
        dispatch(getComptesSuccess(listComptes))
      })
      .catch(error => {
        dispatch(getComptesFailure(error.message))
      })
  }
}

export const getComptesSuccess = demandes => {
  return {
    type: "GET_COMPTES_SUCCESS",
    payload: demandes
  }
}

export const getComptesFailure = error => {
  return {
    type: "GET_COMPTES_FAILURE",
    payload: error
  }
}

export const getFiltredDemandes = (filter) => {
  return (dispatch) => {
    axios
      .post('http://localhost:8080/search', filter)
      .then(response => {
        const result = response.data;
        console.log(result);
        dispatch(getFiltredDemandesSuccess(result))
      })
      .catch(error => {
        dispatch(getFiltredDemandesFailure(error.message))
      })
  }
}

export const clearFiltredData = () => {
  return {
    type: "CLEAR_FILTRED_DEMANDES",
    payload: null
  }
}

export const getFiltredDemandesSuccess = demandes => {
  return {
    type: "GET_FILTRED_DEMANDES_SUCCESS",
    payload: demandes
  }
}

export const getFiltredDemandesFailure = error => {
  return {
    type: "GET_FILTRED_DEMANDES_FAILURE",
    payload: error
  }
}
