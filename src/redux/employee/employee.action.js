import employeeActionTypes from './employee.type';

export const addEmployee = item => ({
    type: employeeActionTypes.ADD_EMPLOYEE,
    payload: item

});

export const updateEmployee = item => ({
    type: employeeActionTypes.UPDATE_EMPLOYEE,
    payload: item

});

export const delEmployee = item => ({
    type: employeeActionTypes.DEL_EMPLOYEE,
    payload: item

});

export const setListEmployee = (data) => ({
    type: employeeActionTypes.SET_LISTEMPLOYEE,
    data
})