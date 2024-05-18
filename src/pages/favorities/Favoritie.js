import React, { useEffect, useState } from 'react';
import { getRestaurant } from '../../utils/restaurant/getRestaurant';
import HomeGrid from '../homePage/HomeGrid';

export default function Favoritie() {
    const [restaurants, setRestaurants] = useState([]);
    const [favoritedRestaurants, setFavoritedRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getRestaurant();
                if (response.status === 200) {
                    const result = await response.json();
                    setRestaurants(result.restaurants);
                } else {
                    // Handle fetch error
                }
            } catch (error) {
                // Handle error
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        const storedFavorities = JSON.parse(localStorage.getItem("favorities"));
        if (storedFavorities && restaurants.length > 0) {
            const newList = restaurants.filter(e => e && e._id && storedFavorities.includes(e._id));
            setFavoritedRestaurants(newList);
        }
    }, [restaurants]);

    return (
        <div className='px-32 pt-12'>
            <h3 className='text-4xl font-semibold pb-4'>Favorities</h3>
            <HomeGrid list={favoritedRestaurants}></HomeGrid>
        </div>
    );
}
