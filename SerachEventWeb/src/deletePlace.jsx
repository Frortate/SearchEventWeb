/* JSX - файл для удаления места проведения (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './organizerAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';

const uri = "http://localhost:32143/api/Place/"; //ссылка на api места проведения

const DelPlace = ({ place, setPlace }) => { // всплывающее окно удаления места проведения
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна

    const removePlace = (removeId) => setPlace(place.filter(item => item.id !== removeId));  //удаление места проведения

    useEffect(() => { // получение списка мест проведения
        axios({
            "method": "GET",
            "url": uri,
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setPlace(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setPlace]);

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    
    const deletePlace = (Id) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + Id)
            .then((response) => {
                response.status = 204 ? removePlace(Id) : null;
            })
    };


    const columns = [ //столбцы для таблицы мест проведения

        {
            title: 'Адресс',
            dataIndex: 'address',
            key: 'address',

        },
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Button shape="round" danger onClick={(e) => deletePlace(record.id)}> Удалить </Button>
            ),
        },



    ];


    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Удаление мест провидения</Button>

                <Modal title="Удаление мест провидения" visible={isModalVisible} onCancel={handleCancel}>
                    <p class="text-danger">*При удалении места проведения относящееся к конкретному организатору, организатор так-же удалится!</p>
                    <br/>
                        <Table dataSource={place} columns={columns} />
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default DelPlace;