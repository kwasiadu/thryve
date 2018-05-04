import React from 'react';
import PropTypes from 'prop-types';
import shortid from "shortid";


const CardList = ({ data }) => {
        console.log(data)
    return(
        Object.entries(data).map(food => {
            return (
                <div key={food[1].id} className='food-card'>
                    <h1>{ food[1].name }</h1>
                    <img src={food[1].image_url}/>
                    <div className='food-info'>
                        <p>{ food[1].weight }</p>
                        <p>{ food[1].measure }</p>
                    </div>
                </div>)
        })
    );
};

CardList.propTypes = {
    data: PropTypes.array.isRequired
}

export default CardList