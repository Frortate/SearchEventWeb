import React, { Component } from 'react';
import eventIcon from './image/performance_show_cinema_icon.svg';
import { useNavigate, NavLink } from "react-router-dom"
import logOutIcon from './image/logout_icon.svg';
import axios from 'axios';

const HeaderUser = () => {

    let navigate = useNavigate();

    const Exit = () => {
        axios.post('http://localhost:32143/api/Account/' + 'LogOff', {}, { withCredentials: true })
            .then((response) => {
                if (response.status == 200) {
                    navigate("../login", { replace: true });
                }
            })
            .catch(console.error);
    }

    return (
        <div className="px-3 py-2 bg-success text-black">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <img className="bi me-2" src={eventIcon} alt="Bootstrap" width="50" height="50" />
                        <span className="fs-4 text-black">Поиск мероприятий</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={logOutIcon} alt="" width="24" height="24" onClick={Exit} />
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>);
}

export default HeaderUser;