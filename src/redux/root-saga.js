import { all } from 'redux-saga/effects';

import employeeSaga from './employee/employee.sagas';

export default function* rootSaga() {
    yield all([
        employeeSaga(),
    ]);
}