import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Input, Typography } from 'antd';


export default class Search extends Component {
    keyWordContainer = React.createRef()
    
    search = (value)=>{
        const {allPhotos} = this.props
        if (!value.trim()) {
            return alert('输入不能为空')
        }

        let result = []
        result = allPhotos.filter((data)=>{
            return data.title.search(value) !== -1;
        })

        PubSub.publish('updateListState', {filteredPhotos:result, isFirst:false})

    }

    render() {
        const { Search } = Input;
        const { Title } = Typography;
        return (
            <section className="jumbotron">
                <Title strong={true} level={2} style={{ textAlign: 'center' }}>React Challenge</Title>
                <div>
                <Search 
                    placeholder="input search text" 
                    onSearch={ this.search} 
                    enterButton 
                />
                </div>
            </section>
        )
    }
}
