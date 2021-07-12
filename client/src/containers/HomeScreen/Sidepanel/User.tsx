// import { Provider } from 'react-redux';

import React from 'react';
import { Link } from 'react-router-dom';

export const User = () => {
    return (
        <div className='user'>
            <Link to='/login'>
                <button>
                    Log In
                </button>
            </Link>
            <Link to='/signup'>
                <button>
                    Sign up
                </button>
            </Link>
            <Link to="/logout">
                <button>
                    Log Out
                </button>
            </Link>
        </div>
    )
};