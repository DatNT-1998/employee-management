import employeeActionTypes from './employee.type';

const INITIAL_STATE = {
    employees: [],
}

const employeeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case employeeActionTypes.ADD_EMPLOYEE:
            console.log(action)
            return {
                employees: [...state.employees, action.payload]
            }
        case employeeActionTypes.DEL_EMPLOYEE:
            console.log(action)
            return {
                employees: state.employees.filter((item) => item.key !== action.payload)
            }
        case employeeActionTypes.UPDATE_EMPLOYEE:
            return {

            }
        case employeeActionTypes.SET_LISTEMPLOYEE:
            return {
                employees: action.data
            }
        default:
            return state;
    }
}
export default employeeReducer;