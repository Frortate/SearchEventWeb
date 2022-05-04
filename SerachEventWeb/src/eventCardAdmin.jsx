/* JSX - файл для отображения мероприятий (доступно только админу) */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import {Card } from 'antd';
import { Button, Input } from 'antd';
const { TextArea } = Input;

const uri = "http://localhost:32143/api/Event/"; //ссылка на api мероприятия


// получает массив мероприятий, отображает все мероприятия возможностью удаления

const EventCardAdmin = () => {
    const [event, setEvent] = useState([]);
    const removeEvent = (removeId) => setEvent(event.filter(({ id }) => id !== removeId));  //удаление мероприятия

     
    useEffect(() => { // получение списка мероприятий
        axios({
            "method": "GET",
            "url": uri,
            "headers": {
                "content-type": "application/json",
            }
        })
            .then((response) => {
                setEvent(response.data);
                
            })
            .catch((error) => {
                console.log(error);
                
            });
    }, [setEvent]);

    

    const deleteEvent = ({ id }) => { // отправка delete запроса, получает id элемента для удаления
        axios.delete(uri + id)
            .then((response) => {
                response.status = 204 ? removeEvent(id) : null;
            })
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <br />
            <h2 align="center">Мероприятия</h2>
            <br />
            {event.map(({ id, title, poster, description, age, type, category, eventsOrganizers, site }) => (
                <div className="Event" key={id} id={id} >
                    <Card hoverable style={{ width: 1290 }} >
                        <Row>
                            <Col span={5}>
                                <img alt="NO DATA" height="380" width="250" src={`data:image/image/png;base64,${poster}`} />
                                <p>&nbsp;</p>
                                <Row>
                                    <Button shape="round" danger onClick={(e) => deleteEvent({ id })}> Удалить </Button>
                                </Row>
                            </Col>
                            <p>&nbsp;&nbsp;&nbsp;</p>
                            <Col span={18}>
                                <Row>
                                    <h5><strong> {title} </strong> {age.age1}+</h5>
                                </Row>
                                <Row>
                                    <h6> {type.name} / {category.name} </h6>
                                </Row>
                                <div>
                                    <h6><strong>Описание:</strong></h6>
                                    <p>{description}</p>
                                    {eventsOrganizers.map(({ organizer, sessions }) => (
                                        <div>
                                            <Row>
                                                <Col span={12}>
                                                    <Row>
                                                        <h6>
                                                            <strong>Место проведения:&nbsp;&nbsp;</strong></h6>
                                                        <p>{organizer.name}</p>
                                                    </Row>
                                                    <Row>
                                                        <h6><strong>Сайт организатора:&nbsp;&nbsp;</strong></h6>
                                                        <a href={organizer.site}>{organizer.site}</a><p>&nbsp;</p>
                                                    </Row>
                                                    <Row>
                                                        <h6><strong>Сайт мероприятия:&nbsp;&nbsp;</strong></h6>
                                                        <a href={site}>{site}</a> <p>&nbsp;</p>
                                                    </Row>
                                                </Col>
                                                <Col span={5}>
                                                    <h6><strong>Сеансы:</strong></h6>
                                                    {sessions.map(({ date }) => (
                                                        <p>- {date}</p>
                                                    ))}
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <br/>
                </div>
            ))}
        </React.Fragment>
    );
};

export default EventCardAdmin;