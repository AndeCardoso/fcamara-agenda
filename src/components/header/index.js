import { memo, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { useLogged } from '../../context/auth';
import api from '../../services/api';

import './style.css';

const Header = () => {
    const [userName, setUserName] = useState();
    
    const { logged, setLogged } = useLogged();
    const token = Cookies.get('token');

    useEffect( async () => {
        if (logged) {
            api.defaults.headers.token =  token ;
            const response = await api.get('/user/me');
            setUserName(response.data.name)
        }
    }, [logged])

    return (
        <header>
            { logged ? (
                <h2>Olá {userName}!</h2>
            ) : (
                <>
                </>
            )}
        </header>
    )
}

export default memo(Header);