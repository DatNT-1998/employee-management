import employeeActionTypes from './employee.type';

export const addEmployee = item => ({
    type: employeeActionTypes.ADD_EMPLOYEE,
    payload: item
});

export const addEmployeeSuccess = item => ({
    type: employeeActionTypes.ADD_EMPLOYEE_SUCCESS,
    payload: item
});

export const addEmployeeError = error => ({
    type: employeeActionTypes.ADD_EMPLOYEE_SUCCESS,
    payload: error
});

export const updateEmployee = item => ({
    type: employeeActionTypes.UPDATE_EMPLOYEE,
    payload: item
});

export const updateEmployeeSuccess = item => ({
    type: employeeActionTypes.UPDATE_EMPLOYEE_SUCCESS,
    payload: item
});

export const updateEmployeeError = error => ({
    type: employeeActionTypes.UPDATE_EMPLOYEE_ERROR,
    payload: error
});

export const delEmployee = item => ({
    type: employeeActionTypes.DEL_EMPLOYEE,
    payload: item

});

export const delEmployeeSuccess = item => ({
    type: employeeActionTypes.DEL_EMPLOYEE_SUCCESS,
    payload: item

});

export const delEmployeeEror = item => ({
    type: employeeActionTypes.DEL_EMPLOYEE,
    payload: item

});

export const setListEmployee = (data) => ({
    type: employeeActionTypes.SET_LISTEMPLOYEE,
    payload: data
})

export const setListEmployeeSuccess = (data) => ({
    type: employeeActionTypes.SET_LISTEMPLOYEE,
    payload: data
})