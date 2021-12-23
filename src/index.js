import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/style.default.scss';
import App from './App';
import { AppProvider } from './context/app_context';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <Router>
                <App />
            </Router>
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
