import React from 'react';
import './App.css';
// import LoginButton from './components/LoginButton.component';
import { Switch, Route } from 'react-router-dom';
import employee from './components/employee.component';
import Dashboard from './components/Dashboard.component';
import Profile from './components/Profile.component';
function App() {
    return (
        <div className="App">
            <Dashboard>
                <Switch>
                    <Route path="/employee" component={employee} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </Dashboard>
        </div>
    );
}

export default App;
