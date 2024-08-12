import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Switch from 'react-switch'; // Import the switch component

const Dashboard = ({ closeSidebar }) => {
    const [bannerData, setBannerData] = useState({
        description: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        link: '',
        is_visible: false
    });

    useEffect(() => {
        axios.get('http://localhost:5000/banner')
            .then(response => {
                const { description, timer, link, is_visible } = response.data;
                // Assuming timer is in seconds and converting it into days, hours, minutes, and seconds
                const days = Math.floor(timer / (24 * 60 * 60));
                const hours = Math.floor((timer % (24 * 60 * 60)) / (60 * 60));
                const minutes = Math.floor((timer % (60 * 60)) / 60);
                const seconds = timer % 60;

                setBannerData({
                    description,
                    days,
                    hours,
                    minutes,
                    seconds,
                    link,
                    is_visible
                });
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData({
            ...bannerData,
            [name]: parseInt(value, 10) || 0 // Handle NaN case
        });
    };

    const handleSwitchChange = (checked) => {
        setBannerData({ ...bannerData, is_visible: checked });
    };

    const handleSubmit = () => {
        // Convert days, hours, minutes, and seconds back to total seconds
        const totalSeconds = 
            (bannerData.days * 24 * 60 * 60) + 
            (bannerData.hours * 60 * 60) + 
            (bannerData.minutes * 60) + 
            bannerData.seconds;

        const updatedData = {
            ...bannerData,
            timer: totalSeconds
        };

        axios.put('http://localhost:5000/banner', updatedData)
            .then(() => {
                alert('Banner updated successfully');
                closeSidebar(); // Close the sidebar after successful update
            })
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div className="dashboard">
            <h2>Banner Controls</h2>
            
            <label>
                <span>Banner Text:</span>
                <input
                    type="text"
                    name="description"
                    value={bannerData.description}
                    placeholder="Enter banner text"
                    onChange={(e) => setBannerData({ ...bannerData, description: e.target.value })}
                />
            </label>
            <span>Set Timer:</span>
            <div className='time-inputs'>
                <label>
                    <span>DD:</span>
                    <input
                        type="number"
                        name="days"
                        value={bannerData.days}
                        placeholder="Days"
                        onChange={handleChange}
                    />
                </label>
                
                <label>
                    <span>HH:</span>
                    <input
                        type="number"
                        name="hours"
                        value={bannerData.hours}
                        placeholder="Hours"
                        onChange={handleChange}
                    />
                </label>

                <label>
                    <span>MM:</span>
                    <input
                        type="number"
                        name="minutes"
                        value={bannerData.minutes}
                        placeholder="Minutes"
                        onChange={handleChange}
                    />
                </label>

                <label>
                    <span>SS:</span>
                    <input
                        type="number"
                        name="seconds"
                        value={bannerData.seconds}
                        placeholder="Seconds"
                        onChange={handleChange}
                    />
                </label>
            </div>

            <label>
                <span>Banner Link:</span>
                <input
                    type="text"
                    name="link"
                    value={bannerData.link}
                    placeholder="Enter banner link"
                    onChange={(e) => setBannerData({ ...bannerData, link: e.target.value })}
                />
            </label>

            <label>
                <span>Banner Visible:</span>
                <Switch
                    onChange={handleSwitchChange}
                    checked={bannerData.is_visible}
                    offColor="#888"
                    onColor="#0a8"
                />
            </label>
            
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
};

export default Dashboard;
