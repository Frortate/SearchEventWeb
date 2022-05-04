/* JSX - файл для отображения мероприятий и организаторов для пользователя */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Row, Col,} from 'antd';
import {Card } from 'antd';


const uriEvent = "http://localhost:32143/api/Event/"; //ссылка на api мероприятия
const uriOrganizer = "http://localhost:32143/api/Organizer/"; //ссылка на api орагнизатора


// получает массив мероприятий и организаторов и их метса проведения, 
//отображает все мероприятия и организаторов с их местами проведения без возможности удаления
const EventCardUser = () => {
    const [event, setEvent] = useState([]);
    const [organizer, setOrganizer] = useState([]);

    useEffect(() => { // получение списка мероприятий
        axios({
            "method": "GET",
            "url": uriEvent,
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

    useEffect(() => { // получение списка организаторов
        axios({
            "method": "GET",
            "url": uriOrganizer,
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

    return (
        <React.Fragment>
            
            <br />
            <h2 align="center">Адреса организаторов</h2>
            <br />
            <div align="center">
                <Card style={{ width: 700 }} >
                    {organizer.map(({ name, place }) => (
                        <div>
                            <Row>
                                <p><strong>{name}:&nbsp;</strong></p>
                                <p>{place.address}</p>
                            </Row>
                        </div>
                    ))}
                </Card>
            </div>
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
                    <br />
                </div>
            ))}
        </React.Fragment>
    );
};

export default EventCardUser;