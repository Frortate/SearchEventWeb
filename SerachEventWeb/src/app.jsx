import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import ReactDOM from 'react-dom';
import AppAdmin from './appAdmin.jsx'; //app для админа
import AppUser from './appUser.jsx'; //app для пользователя
import { Route, Routes } from "react-router-dom"
import HeaderLog from "./headerLog" //header для страницы логина
import HeaderReg from "./headerReg" //header для страницы регистрации
import Login from "./login" //страница логина
import Register from "./registration" //страница регистрации

const App = () => { // основное окно программы
    return (<React.Fragment>
        <Routes> { /*навигация*/}
            <Route path="/admin/*" element={<AppAdmin />} />
            <Route path='/user/*' element={<AppUser />} />
            <Route path='/register' element={<div> <HeaderReg /> <Register /> </div>} />
            <Route path='/login' element={<div> <HeaderLog /> <Login /> </div>} />
            <Route path='/*' element={<div> <HeaderLog /> <Login /> </div>} />
        </Routes>
    </React.Fragment>);
}

export default App;