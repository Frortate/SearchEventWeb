import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import EventCardAdmin from './eventCardAdmin'
import AddEvent from './createEvent'
import 'antd/dist/antd.css';
import { useNavigate, NavLink } from 'react-router-dom';


const uri = "http://localhost:32143/api/Event/";

export function InitializeEventAdmin() { return Event(); }

const Event = () => { // основной компонент для работы с мероприятиями для админа

    let navigate = useNavigate();
    axios.post('http://localhost:32143/api/Account/' + 'checkRole', {}, { withCredentials: true })
        .then((response) => {
            if (response.status == 200) {
                if (response.data.role !== "admin") {
                    navigate("../../login", { replace: true });
                }
            }
        })
        .catch(console.error);

     
    const [event, setEvent] = useState([]); // список мероприятий
    const [age, setAge] = useState([]); // список восрастных ограничений
    const [type, setType] = useState([]); // список типов мероприятия
    const [category, setCategory] = useState([]); // список категорий мероприятия

    

    return (
        <div className="container" >
            <AddEvent
                event={event}
                setEvent={setEvent}
                age={age}
                setAge={setAge}
                type={type}
                setType={setType}
                category={category}
                setCategory={setCategory}
            />
            <EventCardAdmin
                event={event}
                setEvent={setEvent}
                
            />
            
        </div>
    );
}


