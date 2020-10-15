import employeeActionTypes from './employee.type';

const INITIAL_STATE = {
    employees: [],
}

const employeeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case employeeActionTypes.ADD_EMPLOYEE: {
            let newData = [...state.employees, action.payload];
            newData.map((data, index) => (
                data.index = index + 1
            ))
            return {
                employees: newData
            }
        }
        case employeeActionTypes.DEL_EMPLOYEE:
            let temp = state.employees.filter((item) => item.key !== action.payload.key);
            temp.map((data, index) => (
                data.index = index + 1
            ))
            return {
                employees: temp
            }
        case employeeActionTypes.UPDATE_EMPLOYEE: {
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
        case employeeActionTypes.SET_LISTEMPLOYEE:
            return {
                employees: action.payload
            }
        default:
            return state;
    }
}
export default employeeReducer;