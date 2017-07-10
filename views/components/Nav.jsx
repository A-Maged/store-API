import React from 'react'
import { Link } from 'react-router'



class Nav extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">all stores</Link></li>
                    <li><Link to="/add">add a new store</Link></li>
                </ul>
            </div>
        );
    }

export default Nav;