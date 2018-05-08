import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import FoodSearch from '../FoodSearch/FoodSearch';
import './App.css';



const App = () => (
    <FoodSearch />
)

ReactDOM.render(
    (<BrowserRouter>
        <App />
    </BrowserRouter>),
    document.getElementById('app')
);
