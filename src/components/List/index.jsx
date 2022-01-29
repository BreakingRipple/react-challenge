import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Table } from 'antd';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import 'antd/dist/antd.min.css'

export default class List extends Component {

    state = {
        filteredPhotos: [], //搜索图片信息
        isFirst: true, //是否初始展示
        errorMsg: '',//存储错误信息
    }

    componentDidMount() {
        //订阅消息
        this.msgid = PubSub.subscribe('updateListState', (_, data) => {
            this.setState(data)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.msgid)
    }

    render() {
        const { filteredPhotos } = this.state
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Thumbnail',
                dataIndex: 'thumbnail',
                key: 'thumbnail',
                render: (text, record) => {
                    return (
                        <div>
                            <Zoom>
                                <img
                                    alt="null"
                                    src={record.thumbnail}
                                    width="90"
                                />
                            </Zoom>
                        </div>

                    );
                },
            }
        ]

        const data = []
        let id = 0
        filteredPhotos.map((photoObj) => {
            const newPhoto = {}
            id++
            newPhoto.id = id
            newPhoto.title = photoObj.title
            newPhoto.thumbnail = photoObj.url
            newPhoto.key = photoObj.id
            data.push(newPhoto)
            return null
        })

        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        )
    }
}
