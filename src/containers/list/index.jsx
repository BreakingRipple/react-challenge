import React from 'react';
import { Table } from 'antd';
import { Input, Typography } from 'antd';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import 'antd/dist/antd.min.css'

export default function List(props) {
    const { Search } = Input;
    const { Title } = Typography;
    const [filteredPhotos, setFilterPhotos] = React.useState(props.allPhotos)
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

    function search(value){
        const {allPhotos} = props
        if (!value.trim()) {
            return alert('输入不能为空')
        }

        let result = []
        result = allPhotos.filter((data)=>{
            return data.title.search(value) !== -1;
        })

        setFilterPhotos(result)

    }

    return (
        <div>

            <Title strong={true} level={2} style={{ textAlign: 'center' }}>React Challenge</Title>
            <Search
                placeholder="input search text"
                onSearch={search}
                enterButton
            />
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}
