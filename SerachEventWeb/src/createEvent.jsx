/* JSX - файл для создания мероприятий (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './eventAdmin'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Form, Input, Select } from 'antd';
const { TextArea } = Input;

const uri = "http://localhost:32143/api/Event/"; //ссылка на api мероприятий

const AddEvent = ({ event, setEvent }) => { // всплывающее окно добавления мероприятия
    const [isModalVisible, setIsModalVisible] = useState(false); //видимость всплывающего окна
    const [age, setAge] = useState([]);
    const [type, setType] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => { // получение списка возрасных ограничений
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Age/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setAge(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [age]);

    useEffect(() => { // получение списка типов мероприятия
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Type/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setType(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [type]);

    useEffect(() => { // получение списка категорий мероприятия
        axios({
            "method": "GET",
            "url": "http://localhost:32143/api/Category/",
            "mode": 'no-cors',
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [category]);


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

    const addEvent = (events) => setEvent([...event, events]); //добавление созданного мероприятия

    const handleSubmit = (e) => { //отправка нового мероприятия на сервер и закрытие окна
        const title = e.title;
        const description = e.description;
        const site = e.site;
        const poster = e.poster;
        const typesId = e.typesId;
        const categorysId = e.categorysId;
        const agesId = e.agesId;
        handleOk();
        axios.post(uri, {
            title: title, description: description, site: site, poster: poster,
            typeId: typesId, categoryId: categorysId, ageId: agesId
        })
            .then((response) => {
                response.status = 201 ? addEvent(response.data) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <div align="right">
                <br />
                <Button shape="round" type="primary" size="large" onClick={showModal}> Добавить мероприятие </Button>

                <Modal title="Добавить мероприятие" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item
                            label="Название"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите название!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Описание"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите описание!',
                                },
                            ]}>
                            <TextArea />
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
                            label="Постер"
                            name="poster"
                            rules={[
                                {
                                    required: false,
                                    
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Тип"
                            name="typesId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ввыберите тип!',
                                   
                                },
                            ]}>
                            <Select>
                                {type.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Категория"
                            name="categorysId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите категорию!',
                                    
                                },
                            ]}>
                            <Select>
                                {category.map(({ id, name }) => (
                                    <Option value={id}>{name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Возратное ограничение"
                            name="agesId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ввыберите возрастное ограничение!',
                                   
                                },
                            ]}>
                            <Select>
                                {age.map(({ id, age1 }) => (
                                    <Option value={id}>{age1}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>


        </React.Fragment>
    );
};

export default AddEvent;