/* JSX - файл для создания организатора (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './eventAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';

const uri = "http://localhost:32143/api/Organizer/"; //ссылка на api организатора

const AddOrganizer = ({ organizer, setOrganizere }) => { // всплывающее окно добавления организатора
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [place, setPlace] = useState([]);

    useEffect(() => { // получение списка мест проведения
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Place/",
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
    }, [place]);

    const [form] = Form.useForm();

    const showModal = () => { //показать всплывающее окно
        setIsModalVisible(true);
    };

    const handleOk = () => { //кнопка подтверждения всплывабщего окн
        setIsModalVisible(false);
    };

    const handleCancel = () => { //кнопка выхода всплыющего окна
        setIsModalVisible(false);
    };

    const addOrganizer = (organizers) => setOrganizere([...organizer, organizers]); //добавление созданного организатора

    const handleSubmit = (e) => { //отправка нового организатора на сервер и закрытие окна
        const name = e.name;
        const site = e.site;
        const placesId = e.placesId;
        handleOk();
        axios.post(uri, {
            name: name, site: site, placeId: placesId
        })
            .then((response) => {
                response.status = 201 ? addOrganizer(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}>Добавить организатора</Button>

                <Modal title="Добавить организатора" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Название"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите название!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Сайт"
                            name="site"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите сайт!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Место"
                            name="placesId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ввыберите место проведения!',

                                },
                            ]}>
                            <Select>
                                {place.map(({ id, address }) => (
                                    <Option value={id}>{address}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AddOrganizer;