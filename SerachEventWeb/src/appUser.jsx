import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import HeaderUser from './headerUser' //header для пользователя
import { Route, Routes } from "react-router-dom"
import { InitializeEventUser } from './eventUser.jsx'; //страница мероприятий и организаторов для пользователя

const AppUser = () => { // навигация для пользователя
    return (<React.Fragment>
        < HeaderUser />
        <Routes>
            <Route path="/eventUser" element={<InitializeEventUser />} />
            <Route path='/*' element={<InitializeEventUser />} />
        </Routes>
    </React.Fragment>);
}

export default AppUser;