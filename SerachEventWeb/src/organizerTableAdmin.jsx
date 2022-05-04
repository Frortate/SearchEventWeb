import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import { Table, Card } from 'antd';
import { Button, Space } from 'antd';

const uri = "http://localhost:32143/api/Organizer/";


// получает массив организаторов, отображает таблицу мероприятий с возможностью редактирования имени организатора
// отображает списком метса провеедния у конкретного организатора
const OrganizerTableAdmin = () => {
    const [organizer, setOrganizer] = useState([]);

    const removeOrganizer = (removeId) => setOrganizer(organizer.filter(item  => item.id !== removeId));  //удаление организатора

    useEffect(() => { // получение списка организаторов
        axios({
            "method": "GET",
            "url": uri,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setOrganizer(response.data);
                
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, [setOrganizer]);

    const deleteOrganizer = (Id) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removeOrganizer(Id) : null;
            })
    };

    const columns = [ // столбцы таблицы
        
        {
            title: 'Организатор',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) =>
                <form id={record.id} onSubmit={handleSubmit}>
                    <input size="35" name="name" form={record.id} defaultValue={name} />
                </form>
            
        },
        {
            title: 'Сайт',
            dataIndex: 'site',
            key: 'site',
            render: (site, record) =>
                <form id={record.id}>
                    <a name="site" form={record.id} href={site}>{site}</a>
                </form>
        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deleteOrganizer(record.id)}> Удалить </Button> 
            ),
        },
        

        
    ];

    

    const updateOrganizer = (organizers) => { // обновление организатора, изменяется имя организатора, 
                                                //получает организатора с примененными изменениями
        let bufOrganizer = Object.assign([], organizer);
        bufOrganizer.filter(item => item.id === organizers.id)[0].name = organizers.name;
        setOrganizer(bufOrganizer);
    };

    const handleSubmit = (e) => { // обновление строки
        e.preventDefault();
        const name = e.target.elements.name.value;
        const id = e.target.id;
        const organizers = { id: Number(id), name: name }; // обновляемый элемент
        axios.put(uri + id, organizers) // отправка запроса
            .then((response) => {
                response.status = 201 ? updateOrganizer(organizers) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div>
                <br />
                <h2 align="center">Организаторы</h2>
                <br />
                <Card style={{ width: 1290 }} >
                    <Row>
                        <Col span={12}>
                            <h5 align="center"><strong>Таблица организаторов</strong></h5>
                            <br/>
                            <Table dataSource={organizer} columns={columns} />
                        </Col>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <Col span={11}>
                            <h5 align="center"><strong>Адреса организаторов</strong></h5>
                            <br />
                            {organizer.map(({ name, place }) => (
                                <div>
                                    <Row>
                                        <p><strong>{name}:&nbsp;</strong></p>
                                        <p>{place.address}</p>
                                    </Row>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default OrganizerTableAdmin;