import React from 'react';
import './Header.css';


class Header extends React.Component{

    render() {
        return (
            <header className="Header">
                <h2 className="title">Thryve Food Search</h2>
                <p>Get a list of foods that meet your nutrient requirements.</p>
            </header>
        )
    }
}

export default Header;