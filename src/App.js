import React from 'react';
import './App.css';
// import LoginButton from './components/LoginButton.component';
import { Switch, Route } from 'react-router-dom';
import employee from './components/employee.component';
import Dashboard from './components/Dashboard.component';
function App() {
    return (
        <div className="App">
            <Dashboard>
                <Switch>
                    <Route path="/employee" component={employee} />
                    <Route path="/2" component={() => (<div> 2 </div>)} />
                </Switch>
            </Dashboard>
        </div>
    );
}

export default App;
