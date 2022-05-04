import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import { InitializeAdminTheme, } from './headerAdmin.jsx'; //из header для админа испортируется header
import { InitializeEventAdmin } from './eventAdmin.jsx'; //страница мероприятия для админа
import { InitializeOrganizer } from './organizerAdmin.jsx'; //страница организаторов для аддмина
import { Route, Routes } from "react-router-dom"

const AppAdmin = () => { // навигация для админа
    return (<React.Fragment>
        <InitializeAdminTheme />
        <Routes>
            <Route path="/event" element={<InitializeEventAdmin />} />
            <Route path='/organizer' element={<InitializeOrganizer />} />
            <Route path='/*' element={<InitializeEventAdmin />} />
        </Routes>
    </React.Fragment>);
}

export default AppAdmin;