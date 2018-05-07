import React from "react";
import ReactDOM from "react-dom";

import FoodSearch from './FoodSearch';
import { BrowserRouter } from 'react-router-dom';



const App = () => (
    <FoodSearch />
)

ReactDOM.render(
    (<BrowserRouter>
        <App />
    </BrowserRouter>),
    document.getElementById('app'));
