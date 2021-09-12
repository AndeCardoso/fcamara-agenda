import { memo, useEffect, useState } from 'react';
import { useLogged } from '../../context/auth';
import Cookies from 'js-cookie';
import api from '../../services/api';
import Button from "../dumb/button";

const Header = () => {
    const [userName, setUserName] = useState();
    const { logged, setLogged } = useLogged();

    useEffect( async () => {
        if (logged) {
            const token = {params: Cookies.get('token')};
            const response = await api.get('/user/me', token);
            console.log(response);
        }
    }, [logged])

    const onClick = () => {
        Cookies.remove('token');
        setLogged(false);
    }

    return (
        <div>
            { logged ? (
                <div>
                    <h2>{userName}</h2>
                    <Button type='commom' destiny='/' onClick={onClick}>Logout</Button>
                </div>
            ) : (
            <div>
                <Button type='button' destiny='/cadastro' >Cadastrar Novo Usuario</Button>
                <Button type='button' destiny='/' >Login</Button>
            </div>
            )}
        </div>
    )
}

export default memo(Header);