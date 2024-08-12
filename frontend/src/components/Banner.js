import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerData, setBannerData] = useState({});
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/banner')
            .then(response => {
                setBannerData(response.data);
                setTimer(response.data.timer);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(countdown);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer]);

    if (!bannerData.is_visible) return null;

    return (
        <div className="banner">
            <h1>{bannerData.description}</h1>
            <p>Time remaining: {timer} seconds</p>
            {bannerData.link && <a href={bannerData.link}>Learn More</a>}
        </div>
    );
};

export default Banner;
