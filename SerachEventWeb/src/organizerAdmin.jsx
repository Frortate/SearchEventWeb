import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import OrganizerTableAdmin from './organizerTableAdmin'
import 'antd/dist/antd.css';
import AddPlace from './createPlace'
import DelPlace from './deletePlace'
import { Row, Space, } from 'antd';
import AddOrganizer from './createOrganizer'
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Organizer/";

export function InitializeOrganizer() { return Organizer(); }

const Organizer = () => {

    let navigate = useNavigate();

    const [organizer, setOrganizer] = useState([]); // список организаторов
    const [place, setPlace] = useState([]); // список мест проведения
    const [city, setCity] = useState([]); // список городов

    axios.post('http://localhost:32143/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);




    return (
        <div className="container">
            
            <Row>
                <Space>
                    <DelPlace
                        place={place}
                        setPlace={setPlace}
                    />

                    <AddPlace
                        place={place}
                        setPlace={setPlace}
                        city={city}
                        setCity={setCity}
                    />
                    <AddOrganizer
                        organizer={organizer}
                        setOrganizer={setOrganizer}
                        place={place}
                        setPlace={setPlace}
                    />
                </Space>
            </Row>
           
            <OrganizerTableAdmin
                organizer={organizer}
                setOrganizer={setOrganizer}
                
            />
            
        </div>
    );
}


