import { memo, useEffect, useState } from 'react';
import { useLogged } from '../../context/auth';
import Cookies from 'js-cookie';
import api from '../../services/api';
import Button from "../dumb/button";

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

    const onClick = () => {
        Cookies.remove('token');
        setLogged(false);
    }

    return (
        <div>
            { logged ? (
                <div>
                    <h2>Seja bem vindo {userName}!</h2>
                    <Button type='commom' destiny='/cadastro'>Editar Cadastro</Button>
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