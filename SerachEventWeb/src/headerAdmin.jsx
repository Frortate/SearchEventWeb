import React, { Component } from 'react';
import eventIcon from './image/performance_show_cinema_icon.svg';
import organizerIcon from './image/man_support_icon.svg';
import logOutIcon from './image/logout_icon.svg';
import { useNavigate, NavLink } from "react-router-dom"
import axios from 'axios';

const Initialize = () =>
{
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
                        <span className="fs-4 text-black">Приложение управления мероприятиями</span>
                    </a>
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            <a href="/" className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={eventIcon}  alt="" width="24" height="24" />
                                Мероприятия
                            </a>
                        </li>
                        <li>
                            <NavLink to={'/admin/organizer'} className="nav-link text-black">
                                <img className="bi d-block mx-auto mb-1" src={organizerIcon} alt="" width="24" height="24" />
                                Организаторы
                            </NavLink>
                        </li>
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

function Footer() {
    return (<div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span className="text-muted">©Frortate 2022 Селезнёв Даниил 3-41xx</span>
            </div>
        </footer>
    </div>);
}

    
    



export function InitializeAdminTheme() { return Initialize(); }
export function InitializeFooter() { return Footer(); }
