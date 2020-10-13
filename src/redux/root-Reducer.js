import { combineReducers } from 'redux';
import employeeReducer from './employee/employee.reducer';

const rootReducer = combineReducers({
    employee: employeeReducer
});

export default rootReducer;