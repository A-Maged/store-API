import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'


import Stores from './components/Stores/index.jsx'
import SingleStore from './components/Stores/SingleStore.jsx'
import AddStore from './components/Stores/AddStore.jsx'



const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


ReactDOM.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/">all stores</Link></li>
                <li><Link to="/add">add new store</Link></li>
            </ul>

            <hr/>

            <Switch>
                <Route exact path="/" component={Stores}/>
                <Route path="/add" component={AddStore}/>
                <Route path="/singleStore/:id" component={SingleStore}/>

                {/*
                    a last route to catch 404
                    <Route component={NoMatch}/>            
                */}

                {/* redirect to the store instead of a 404 */}
                <Route component={Stores}/>
            </Switch>

        </div>
    </Router>,
    document.getElementById('root')
);
