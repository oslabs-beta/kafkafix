import React from 'react';
import { Link } from 'react-router-dom';

export const Oauth = () => {
    return (
        <div className='oauth'>
            <Link to='/oauth'>
                <button>
                    Sign in with GitHub
                </button>
            </Link>
        </div>
    )
};