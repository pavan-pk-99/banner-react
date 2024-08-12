// src/components/DiscountBanner.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import '../styles.css';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false); // Start with false
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [bannerData, setBannerData] = useState({ description: '', timer: 0, link: '', is_visible: false });

    const setCookie = (name, value, duration) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + duration * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const checkCookie = () => {
        if (document.cookie.indexOf("discountClosed=true") !== -1) {
            setIsVisible(false);
        }
    };

    const closeBanner = () => {
        setIsVisible(false);
        setCookie("discountClosed", "true", 24); // Set cookie for 24 hours
    };

    // Fetch banner data from the backend
    const fetchBannerData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/banner');
            const { description, timer, link, is_visible } = response.data;

            // If the banner is visible, set it
            if (is_visible) {
                setBannerData({ description, timer, link, is_visible });
                setIsVisible(true); // Set banner visibility to true
                startCountdown(timer); // Start countdown using the timer from the banner
            } else {
                setIsVisible(false); // Hide if not visible
            }
        } catch (error) {
            console.error('Error fetching banner data:', error);
        }
    };

    const startCountdown = (totalSeconds) => {
        const endTime = Date.now() + totalSeconds * 1000; // Calculate end time based on total seconds

        const timer = setInterval(() => {
            const now = Date.now();
            const distance = endTime - now; // Calculate remaining time

            if (distance < 0) {
                clearInterval(timer);
                setIsVisible(false); // Hide the banner if time is up
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);
    };

    useEffect(() => {
        checkCookie();
        fetchBannerData(); // Fetch banner data on component mount
    }, []);

    return (
        <>
            {isVisible && (
                <div className="discount-container">
                    <div className='banner-info'>
                        <div className="countdown-timer">
                            <div className="group">
                                <div className="value days">{String(timeLeft.days).padStart(2, '0')}</div>
                                <div className="unit">Days</div>
                            </div>

                            <div className="group">
                                <div className="value hours">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="unit">Hrs</div>
                            </div>

                            <div className="group">
                                <div className="value minutes">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="unit">Min</div>
                            </div>

                            <div className="group">
                                <div className="value seconds">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                <div className="unit">Sec</div>
                            </div>
                        </div>
                        <br />
                        <div className="info">
                            <div className="discount-heading">{bannerData.description || 'Massive Sale'}</div>
                            
                        </div>

                        <a href={bannerData.link || '#'} className="discount-btn">Learn More</a>

                        <div className="close-btn" onClick={closeBanner}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            <div className='main'>
                <h1 className='mainhead'>Design and Display <br /> Custom Banners Effortlessly!</h1>
                <p>"Quickly Customize and Launch Your Perfect Banner & Set Up Your Ideal Banner in Minutes"</p>
                <button>start by clicking on opendashboard</button>
            </div>
        </>
    );
};

export default Home;
