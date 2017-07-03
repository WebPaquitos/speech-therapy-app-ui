import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2 id="cenas">HOME!</h2>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;
