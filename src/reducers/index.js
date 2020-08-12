import dataReducer from './data';
import demandeUpdateReducer from './demandeUpdate';
import comptesReducer from './comptes';
import filtredDataReducer from './filtredData';

import { combineReducers } from 'redux';

const allReducers = combineReducers(
    {
        data: dataReducer,
        demandeUpdate : demandeUpdateReducer,
        comptes : comptesReducer,
        filtredData : filtredDataReducer,
    }
);

export default allReducers;
