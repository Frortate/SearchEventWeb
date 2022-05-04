import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { InitializeFooter } from './headerAdmin.jsx';
import { BrowserRouter } from "react-router-dom";
import App from './app.jsx'

const appRoot = ReactDOMClient.createRoot(document.getElementById('app')); // начальная страница

{
    appRoot.render(<BrowserRouter><App /><InitializeFooter /></BrowserRouter>); {/*навигация*/ }
}