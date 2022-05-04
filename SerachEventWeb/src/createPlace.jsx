/* JSX - файл для создания места проведения (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './eventAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Place/"; //ссылка на api места проведения

const AddPlace = ({ place, setPlace }) => { // всплывающее окно добавления места проведения
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [city, setCity] = useState([]);

    useEffect(() => { // получение списка городов
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/City/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setCity(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [city]);

    const [form] = Form.useForm();

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { //кнопка подтверждения всплывабщего окна
        setIsModalVisible(false);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addPlace = (places) => setPlace([...place, places]); //добавление созданного места проведения

    const handleSubmit = (e) => { //отправка нового места проведения на сервер и закрытие окна
        const address = e.address;
        const cityesId = e.cityesId;
        handleOk();
        axios.post(uri, {
            address: address, cityId: cityesId
        })
            .then((response) => {
                response.status = 201 ? addPlace(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить место проведения</Button>

                <Modal title="Добавить место проведения" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Адрес"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите адрес!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                       
                        <Form.Item
                            label="Город"
                            name="cityesId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ввыберите город!',

                                },
                            ]}>
                            <Select>
                                {city.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default AddPlace;