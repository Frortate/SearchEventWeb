import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import EventCardUser from './eventCardUser'
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Event/";

export function InitializeEventUser() { return Event(); }

const Event = () => { // основной компонент для работы с мероприятиями для пользователя

    let navigate = useNavigate();
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:32143/api/Account/' + 'checkRole')
        .then((response) => {
            if (response.status == 200) {
                console.log(response.data);
                if (response.data.role === "admin") {
                    navigate("../admin", { replace: true });
                }
                if (response.data.role === "user") {
                    navigate("../user", { replace: true });
                }
            }
        })
        .catch(console.error);


    const [event, setEvent] = useState([]); // список мероприятий
    const [organizer, setOrganizer] = useState([]); // список организаторов
    

    return (
        <div className="container" >
            
            <EventCardUser
                event={event}
                setEvent={setEvent}
                organizer={organizer}
                setOrganizer={setOrganizer}
            />
            
        </div>
    );
}


