import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    
    const url = "http://localhost:4000/";

    useEffect(() => {
        async function loadData() {
            fetchFood();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []); // Add dependency array to avoid infinite loop

    const getTotalCartAmount = () => {
        let amount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let food_info = food_list.find((product) => product._id === item);
                if (food_info) {
                    amount += food_info.price * cartItem[item];
                }
            }
        }
        return amount;
    }

    const fetchFood = async () => {
        const response = await axios.get(url + "app/food/list");
        setFoodList(response.data.data);
    }

    const addToCart = async (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            await axios.post(url + "app/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
        }));

        if (token) {
            await axios.post(url + "app/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const loadCartData = async (storedToken) => {
        const response = await axios.post(url + "app/cart/get", {}, { headers: { token: storedToken } });

        setCartItem(response.data.cartData);
    }

    const ContextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
