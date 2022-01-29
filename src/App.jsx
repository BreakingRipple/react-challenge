import React, { Component } from 'react';
import axios from 'axios'
import Search from './components/search';
import List from './components/List';

export default class App extends Component {

    state = {
        allPhotos: [],
        errorMsg: ''
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/photos`).then(
            response => {
                const { data } = response
                this.setState({ allPhotos: data })
            },
            error => {
                this.setState({ errorMsg: error.message })
            }
        )
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Search {...this.state}/>
                <List />
            </div>
        )
    }
}


