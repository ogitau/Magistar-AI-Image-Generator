import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../assets/a1 (3).jpg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_KEY} `,
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    "prompt": `${inputRef.current.value}`,
                    "n": 3,
                    "size": "1024x1024",
                }),
            },
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    };

    
        const handleShareClick = () => {
            const discordLink = 'https://discord.gg/r6TMf97Z';
            window.open(discordLink, '_blank');
        };
    return (
        <div className='Magistar-AI-Image-Generator'>
            <div className="header">Magistar AI <span> Image Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? default_image : image_url} alt="" />
                </div>
            </div>
            <div className="loading">
                <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                <div className={loading ? "loading-text" : "display-none"}>Please wait.....</div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
            <div className="share-btn" onClick={handleShareClick}>Share to Community</div>
        </div>
    );
};

export default ImageGenerator;
