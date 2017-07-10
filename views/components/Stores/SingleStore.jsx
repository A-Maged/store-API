import React, { Component } from 'react';

class SingleStore extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id : '',
            store: {}
        }
    }
    

    componentWillMount(){

    }

    componentDidMount(){
        var self = this



        // save storeId to state 
               
        
        axios.get(`http://127.0.0.1:3000/api/v1/stores/show/${this.props.match.params.id}`)
            .then(function (response) {
                self.setState({store: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
                

    }


    render() {
        return (
            <div>
                <h2>id: {this.state.store._id}</h2>
                <h2>name: {this.state.store.name}</h2>
                <h2>description: {this.state.store.description}</h2>
            </div>
        );
    }
}

export default SingleStore;