import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link ,Redirect } from 'react-router-dom'


class AddStore extends Component {
    constructor () {
        super();
        this.state = {
            fireRedirect: false,
            name: '',
            description: '',
            tags: []
        }
    }



    handleSubmit(event){
        event.preventDefault()
    
        // submit data
        axios.post('http://127.0.0.1:3000/api/v1/stores/add',{
            name: this.state.name,
            description: this.state.description,
            tags: this.state.tags
        })     
        .catch(function (error) {
            console.log(error);
        });

        // redirect
        this.setState({ fireRedirect: true })
    }



    updateTags(e){

        var tempArray = this.state.tags
        tempArray.push(e.target.value)
        this.setState({tags: tempArray }) 
    }

    render() {
        const { fireRedirect } = this.state

        return (
            <div>
                <h1>add/edit store </h1>

                <form onSubmit={e => this.handleSubmit(e)} action="/api/v1/stores/add" method="post">
                    <div>
                        <input onChange={e=>{ this.setState({name: e.target.value }) } } type="text" name="name" placeholder="name" />
                    </div>
                  
                    <textarea onChange={e=>{ this.setState({description: e.target.value }) } }  name="description" placeholder="description"></textarea>

                    <div>
                        <input  onChange={ e => this.updateTags(e) }  type="checkbox" name="tags" value="tech" id="tech" />
                        <label  htmlFor="tech">tech</label>

                        <input onChange={ e => this.updateTags(e) } type="checkbox" name="tags" value="sports" id="sports" />
                        <label htmlFor="sports">sports</label>

                        <input onChange={ e => this.updateTags(e) } type="checkbox" name="tags" value="node" id="node" />
                        <label htmlFor="node">node</label>
                    </div>
                
                    <button>add</button>
                </form>


                {fireRedirect && (
                    <Redirect to={'/'}/>
                )}
            </div>
        );
    }
}

export default AddStore;