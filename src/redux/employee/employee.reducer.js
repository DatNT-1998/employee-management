import employeeActionTypes from './employee.type';

const INITIAL_STATE = {
    employees: [],
}

const employeeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case employeeActionTypes.ADD_EMPLOYEE: {
            return { ...state }
        }
        case employeeActionTypes.ADD_EMPLOYEE_SUCCESS: {
            let newData = [...state.employees, action.payload];
            newData.map((data, index) => (
                data.index = index + 1
            ))
            return {
                employees: newData
            }
        }
        case employeeActionTypes.DEL_EMPLOYEE:
            return { ...state }
        case employeeActionTypes.DEL_EMPLOYEE_SUCCESS:
            let tempp = state.employees.filter((item) => item.key !== action.payload.key);
            tempp.map((data, index) => (
                data.index = index + 1
            ))
            return {
                employees: tempp
            }
        case employeeActionTypes.UPDATE_EMPLOYEE: {
            return { ...state }
        }
        case employeeActionTypes.UPDATE_EMPLOYEE_SUCCESS: {
            for (let i = 0; i < state.employees.length; i++) {
                if (state.employees[i].key === action.payload.key) {
                    state.employees[i] = action.payload
                }
            }
            const newData = state.employees;
            newData.map((data, index) => (data.index = index + 1))
            return {
                employees: [...newData]
            }
        }
        case employeeActionTypes.UPDATE_EMPLOYEE_ERROR: {
            return { ...state }
        }
        case employeeActionTypes.SET_LISTEMPLOYEE:
            return {
                employees: action.payload
            }
        default:
            return state;
    }
}
export default employeeReducer;