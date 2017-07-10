import React, { Component } from 'react';
import $ from 'jquery';


import {Link} from 'react-router-dom'

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name: 'cm',
            stores : []
        }

    }

 

    updateState(stateObj){
          this.setState(stateObj)
    }



    getStores(){
        var self = this

        axios.get('http://127.0.0.1:3000/api/v1/stores')
            .then(function (response) {
                self.updateState({stores: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        var self = this
        
        self.getStores()    
    }



    componentWillReceiveProps(){
        var self = this
        
        self.getStores()    
        
    }

    renderStores() {
        var self = this;
     
        return self.state.stores.map(function(store) {
            return (
                <li key={store.name}>

                    <Link to={"/singlestore/" + store.slug}>
                        {store.name}                
                    </Link>
                </li>)
        });
    }



    render() {
        return (
            <div>
                {this.renderStores()}
            </div>
        );
    }
}

export default Stores;