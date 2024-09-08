import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/Context';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    if (!food_list) {
        return <div>Loading...</div>; // Add a fallback UI
    }

    return (
        <div className='food_display' id='food_display'>
            <h2>Top Dishes Near You</h2>
            <div className="food_display_list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category)
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image} 
                            />
                        )
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
