import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/repositories/${username}`);
    };

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={handleSubmit}>Search</button>
        </div>
    );
}

export default HomePage;
