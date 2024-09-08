import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/Context';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Ensure cartItem and id are defined
    if (!cartItem || !id) {
        return <div>Loading...</div>;
    }

    return (
        <div className='food_item'>
            <div className="food_item_img_container">
                <img className='food_item_img' src={url + "images/" + image} alt="" />
                {
                    !cartItem[id] ? (
                        <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                    ) : (
                        <div className='food_item_counter'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItem[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                    )
                }
            </div>
            <div className="food_item_info">
                <div className="food_item_name_rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <div className="food_item_desc">
                    {description}
                </div>
                <div className="food_item_price">
                    ${price}
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
