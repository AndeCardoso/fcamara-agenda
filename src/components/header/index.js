import { memo, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { useLogged } from '../../context/auth';
import { dbValidationUserInfo } from '../../services/dbValidations';
import api from '../../services/api';

import './style.css';
import Alert from '../dumb/alert';

const Header = () => {
    const [userName, setUserName] = useState();
    const [alerta, setAlerta] = useState();
    
    const { logged, setLogged } = useLogged();
    const token = Cookies.get('token');

    useEffect( async () => {
        if (logged) {
            api.defaults.headers.token =  token ;
            await api.get('/user/me')
            .then( response => {
                setUserName(response.data.name)
           
            }).catch(errors => {
                const errorMsg = dbValidationUserInfo(errors);
                setAlerta({
                    type: errorMsg.type,
                    msg: errorMsg.msg
                });
                setLogged(false);
            });
        }
    }, [logged])

    return (
        <header>
            { logged ? (
                <div className="user">
                    <h2>Olá {userName}!</h2>
                    <Alert type={alert.type}>{alert.msg}</Alert>
                </div>
            ) : (
                <>
                </>
            )}
        </header>
    )
}

export default memo(Header);