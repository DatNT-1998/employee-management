import { takeLatest, put } from 'redux-saga/effects';

import employeeActionTypes from './employee.type';

import { addEmployeeSuccess, updateEmployeeSuccess, delEmployeeSuccess } from './employee.action';


// function* fetchDataSaga() {
//     try {
//         const requestGet = yield fetch(`https://5f851ca6c29abd0016190236.mockapi.io/api/v1/emloyees`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Accept': '*/*'
//             })

//         })
//         const responeGet = yield requestGet.json();
//         yield put(setListEmployeeSuccess(responeGet));
//     } catch (error) {

//     }
// }

function* addEmployeeSaga(data) {
    try {
        const requestAdd = yield fetch(`https://5f851ca6c29abd0016190236.mockapi.io/api/v1/emloyees`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',

            }),
            body: JSON.stringify(data.payload)
        })
        const responeAdd = yield requestAdd.json();
        yield put(addEmployeeSuccess(responeAdd));
    } catch (error) {
        console.log(error);
    }
}

function* SagaDeleteData(data) {
    try {
        const requestDelete = yield fetch(`https://5f851ca6c29abd0016190236.mockapi.io/api/v1/emloyees/${data.payload.key}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': '*/*'

            })
        })
        const responeDelete = yield requestDelete.json();
        yield put(delEmployeeSuccess(responeDelete));
    } catch (error) {
        console.log(error);
    }
}

function* SagaEditData(data) {
    if (data)
        try {
            const requestEdit = yield fetch(`https://5f851ca6c29abd0016190236.mockapi.io/api/v1/emloyees/${data.payload.key}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': '*/*'

                }),
                body: JSON.stringify(data.payload)
            })
            console.log("payload data nek", data.payload);
            const responeEdit = yield requestEdit.json();
            yield put(updateEmployeeSuccess(responeEdit));
        } catch (error) {
            console.log(error);
        }
    else return;
}


export default function* employeeSaga() {
    yield takeLatest(employeeActionTypes.ADD_EMPLOYEE, addEmployeeSaga);
    yield takeLatest(employeeActionTypes.UPDATE_EMPLOYEE, SagaEditData);
    yield takeLatest(employeeActionTypes.DEL_EMPLOYEE, SagaDeleteData);
}